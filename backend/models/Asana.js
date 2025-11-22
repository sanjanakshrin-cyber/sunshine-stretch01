import mongoose from 'mongoose';

const asanaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  sanskritName: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['standing', 'seated', 'balance', 'relaxation', 'backbend', 'forward-fold', 'twist', 'inversion']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  benefits: {
    type: [String],
    default: []
  },
  instructions: {
    type: [String],
    required: true
  },
  duration: {
    type: Number,
    default: 30 // seconds
  },
  tags: {
    type: [String],
    default: []
  },
  benefitsTags: {
    flexibility: { type: Boolean, default: false },
    stressRelief: { type: Boolean, default: false },
    strength: { type: Boolean, default: false },
    balance: { type: Boolean, default: false },
    relaxation: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

export default mongoose.model('Asana', asanaSchema);

