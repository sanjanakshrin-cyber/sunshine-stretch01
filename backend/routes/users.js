import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('completedAsanas.asanaId');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user goals
router.put('/goals', authenticateToken, async (req, res) => {
  try {
    const { goals } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { goals },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark asana as completed
router.post('/complete-asana', authenticateToken, async (req, res) => {
  try {
    const { asanaId, duration } = req.body;
    const user = await User.findById(req.user.userId);

    // Check if already completed
    const existing = user.completedAsanas.find(
      ca => ca.asanaId.toString() === asanaId
    );

    if (existing) {
      // Update existing completion
      existing.completedAt = new Date();
      if (duration) existing.duration = duration;
    } else {
      // Add new completion
      user.completedAsanas.push({
        asanaId,
        duration: duration || 0
      });
    }

    await user.save();
    const updatedUser = await User.findById(req.user.userId)
      .select('-password')
      .populate('completedAsanas.asanaId');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user progress
router.get('/progress', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('completedAsanas.asanaId');

    const progress = {
      totalCompleted: user.completedAsanas.length,
      completedAsanas: user.completedAsanas,
      byCategory: {},
      totalDuration: user.completedAsanas.reduce((sum, ca) => sum + (ca.duration || 0), 0)
    };

    // Group by category
    user.completedAsanas.forEach(ca => {
      if (ca.asanaId && ca.asanaId.category) {
        progress.byCategory[ca.asanaId.category] = 
          (progress.byCategory[ca.asanaId.category] || 0) + 1;
      }
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

