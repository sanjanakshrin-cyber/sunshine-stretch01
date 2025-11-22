import express from 'express';
import Asana from '../models/Asana.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all asanas
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sanskritName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const asanas = await Asana.find(query).sort({ name: 1 });
    res.json(asanas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single asana
router.get('/:id', async (req, res) => {
  try {
    const asana = await Asana.findById(req.params.id);
    if (!asana) {
      return res.status(404).json({ error: 'Asana not found' });
    }
    res.json(asana);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get asanas by category
router.get('/category/:category', async (req, res) => {
  try {
    const asanas = await Asana.find({ category: req.params.category }).sort({ name: 1 });
    res.json(asanas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

