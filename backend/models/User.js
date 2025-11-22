import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  goals: {
    type: [String],
    enum: ['flexibility', 'stress-relief', 'strength', 'balance', 'relaxation'],
    default: []
  },
  completedAsanas: [{
    asanaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asana'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    duration: Number // in minutes
  }],
  preferences: {
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    sessionDuration: {
      type: Number,
      default: 15 // minutes
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);

