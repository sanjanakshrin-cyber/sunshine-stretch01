import express from 'express';
import Asana from '../models/Asana.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get personalized recommendations
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('completedAsanas.asanaId');
    
    const userGoals = user.goals || [];
    const completedAsanaIds = user.completedAsanas.map(ca => ca.asanaId?._id?.toString()).filter(Boolean);
    const userDifficulty = user.preferences?.difficulty || 'beginner';

    // Build query based on user goals
    const query = {
      difficulty: { $in: [userDifficulty, 'beginner'] }, // Include beginner for all levels
      _id: { $nin: completedAsanaIds } // Exclude already completed
    };

    // Map goals to benefit tags
    const benefitMap = {
      'flexibility': 'benefitsTags.flexibility',
      'stress-relief': 'benefitsTags.stressRelief',
      'strength': 'benefitsTags.strength',
      'balance': 'benefitsTags.balance',
      'relaxation': 'benefitsTags.relaxation'
    };

    if (userGoals.length > 0) {
      const orConditions = userGoals.map(goal => {
        const benefitField = benefitMap[goal];
        if (benefitField) {
          return { [benefitField]: true };
        }
        return {};
      }).filter(obj => Object.keys(obj).length > 0);

      if (orConditions.length > 0) {
        query.$or = orConditions;
      }
    }

    // Get recommended asanas
    let recommendations = await Asana.find(query).limit(10);

    // If not enough recommendations, fill with other asanas
    if (recommendations.length < 5) {
      const additional = await Asana.find({
        _id: { $nin: [...completedAsanaIds, ...recommendations.map(a => a._id)] },
        difficulty: { $in: [userDifficulty, 'beginner'] }
      }).limit(5 - recommendations.length);
      recommendations = [...recommendations, ...additional];
    }

    // Score and sort recommendations
    const scoredRecommendations = recommendations.map(asana => {
      let score = 0;
      
      // Score based on goal alignment
      userGoals.forEach(goal => {
        const benefitField = benefitMap[goal];
        if (benefitField && asana.benefitsTags[goal.replace('-', '')]) {
          score += 10;
        }
      });

      // Score based on difficulty match
      if (asana.difficulty === userDifficulty) {
        score += 5;
      }

      // Score based on category diversity
      const userCategories = user.completedAsanas
        .map(ca => ca.asanaId?.category)
        .filter(Boolean);
      if (!userCategories.includes(asana.category)) {
        score += 3;
      }

      return { ...asana.toObject(), recommendationScore: score };
    });

    // Sort by score and return top recommendations
    scoredRecommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);

    res.json({
      recommendations: scoredRecommendations.slice(0, 8),
      basedOn: {
        goals: userGoals,
        difficulty: userDifficulty,
        completedCount: completedAsanaIds.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

