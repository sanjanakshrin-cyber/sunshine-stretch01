import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Asana from '../models/Asana.js';

dotenv.config();

const asanas = [
  {
    name: "Mountain Pose",
    sanskritName: "Tadasana",
    category: "standing",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "The foundation of all standing poses, Mountain Pose improves posture and balance.",
    benefits: ["Improves posture", "Strengthens legs", "Increases awareness"],
    instructions: [
      "Stand with feet together, big toes touching",
      "Distribute weight evenly across both feet",
      "Engage thigh muscles and lift kneecaps",
      "Lengthen tailbone toward floor",
      "Lift chest and broaden collarbones",
      "Relax shoulders away from ears",
      "Hold for 5-10 breaths"
    ],
    duration: 60,
    tags: ["standing", "foundation", "posture"],
    benefitsTags: {
      flexibility: false,
      stressRelief: true,
      strength: true,
      balance: true,
      relaxation: true
    }
  },
  {
    name: "Tree Pose",
    sanskritName: "Vrikshasana",
    category: "balance",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    description: "A balancing pose that improves focus, concentration, and stability.",
    benefits: ["Improves balance", "Strengthens legs", "Enhances focus", "Opens hips"],
    instructions: [
      "Start in Mountain Pose",
      "Shift weight to left foot",
      "Place right foot on left inner thigh or calf (avoid knee)",
      "Press foot into leg and leg into foot",
      "Bring hands to heart center or overhead",
      "Fix gaze on a point in front",
      "Hold for 5-8 breaths, then switch sides"
    ],
    duration: 60,
    tags: ["balance", "standing", "focus"],
    benefitsTags: {
      flexibility: true,
      stressRelief: true,
      strength: true,
      balance: true,
      relaxation: false
    }
  },
  {
    name: "Warrior I",
    sanskritName: "Virabhadrasana I",
    category: "standing",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "A powerful standing pose that builds strength and stamina.",
    benefits: ["Strengthens legs", "Opens hips", "Improves balance", "Builds stamina"],
    instructions: [
      "Start in Mountain Pose",
      "Step left foot back 3-4 feet",
      "Turn left foot out 45 degrees",
      "Bend right knee to 90 degrees",
      "Square hips forward",
      "Raise arms overhead, palms facing each other",
      "Hold for 5-8 breaths, then switch sides"
    ],
    duration: 60,
    tags: ["standing", "strength", "warrior"],
    benefitsTags: {
      flexibility: true,
      stressRelief: false,
      strength: true,
      balance: true,
      relaxation: false
    }
  },
  {
    name: "Child's Pose",
    sanskritName: "Balasana",
    category: "relaxation",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "A restorative pose that calms the mind and gently stretches the back.",
    benefits: ["Relieves stress", "Stretches back", "Calms mind", "Releases tension"],
    instructions: [
      "Kneel on floor with big toes touching",
      "Sit back on heels",
      "Separate knees hip-width apart",
      "Fold forward, resting forehead on floor",
      "Extend arms forward or rest alongside body",
      "Relax completely",
      "Hold for 1-3 minutes"
    ],
    duration: 180,
    tags: ["relaxation", "restorative", "stretch"],
    benefitsTags: {
      flexibility: true,
      stressRelief: true,
      strength: false,
      balance: false,
      relaxation: true
    }
  },
  {
    name: "Downward-Facing Dog",
    sanskritName: "Adho Mukha Svanasana",
    category: "standing",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "An energizing pose that stretches the entire body and builds strength.",
    benefits: ["Strengthens arms", "Stretches hamstrings", "Energizes body", "Improves circulation"],
    instructions: [
      "Start on hands and knees",
      "Tuck toes under",
      "Lift hips up and back",
      "Form an inverted V shape",
      "Press hands into mat, fingers spread",
      "Keep knees slightly bent if needed",
      "Hold for 5-10 breaths"
    ],
    duration: 60,
    tags: ["standing", "strength", "stretch"],
    benefitsTags: {
      flexibility: true,
      stressRelief: true,
      strength: true,
      balance: false,
      relaxation: false
    }
  },
  {
    name: "Seated Forward Fold",
    sanskritName: "Paschimottanasana",
    category: "seated",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "A calming forward fold that stretches the entire back body.",
    benefits: ["Stretches hamstrings", "Calms mind", "Relieves stress", "Improves flexibility"],
    instructions: [
      "Sit with legs extended forward",
      "Flex feet, pressing heels into floor",
      "Inhale and lengthen spine",
      "Exhale and fold forward from hips",
      "Reach for feet, shins, or thighs",
      "Keep spine long, avoid rounding",
      "Hold for 1-2 minutes"
    ],
    duration: 120,
    tags: ["seated", "forward-fold", "stretch"],
    benefitsTags: {
      flexibility: true,
      stressRelief: true,
      strength: false,
      balance: false,
      relaxation: true
    }
  },
  {
    name: "Cobra Pose",
    sanskritName: "Bhujangasana",
    category: "backbend",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "A gentle backbend that strengthens the spine and opens the chest.",
    benefits: ["Strengthens spine", "Opens chest", "Improves posture", "Relieves back pain"],
    instructions: [
      "Lie face down on mat",
      "Place hands under shoulders",
      "Press tops of feet into floor",
      "Inhale and lift chest",
      "Keep elbows slightly bent",
      "Gaze forward or slightly up",
      "Hold for 5-8 breaths"
    ],
    duration: 60,
    tags: ["backbend", "strength", "chest-opener"],
    benefitsTags: {
      flexibility: true,
      stressRelief: false,
      strength: true,
      balance: false,
      relaxation: false
    }
  },
  {
    name: "Bridge Pose",
    sanskritName: "Setu Bandhasana",
    category: "backbend",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "A gentle backbend that strengthens the back and opens the front body.",
    benefits: ["Strengthens back", "Opens chest", "Stretches hip flexors", "Calms mind"],
    instructions: [
      "Lie on back with knees bent",
      "Feet hip-width apart, close to glutes",
      "Arms alongside body, palms down",
      "Press feet into floor",
      "Lift hips up",
      "Clasp hands under body if comfortable",
      "Hold for 5-10 breaths"
    ],
    duration: 60,
    tags: ["backbend", "strength", "hip-opener"],
    benefitsTags: {
      flexibility: true,
      stressRelief: true,
      strength: true,
      balance: false,
      relaxation: true
    }
  },
  {
    name: "Triangle Pose",
    sanskritName: "Trikonasana",
    category: "standing",
    difficulty: "intermediate",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "A standing pose that stretches the sides of the body and improves balance.",
    benefits: ["Stretches sides", "Strengthens legs", "Improves balance", "Opens hips"],
    instructions: [
      "Stand with feet wide apart",
      "Turn right foot out 90 degrees",
      "Turn left foot in slightly",
      "Extend arms parallel to floor",
      "Reach right hand to right shin or floor",
      "Extend left arm up",
      "Gaze at left hand",
      "Hold for 5-8 breaths, then switch sides"
    ],
    duration: 60,
    tags: ["standing", "stretch", "balance"],
    benefitsTags: {
      flexibility: true,
      stressRelief: false,
      strength: true,
      balance: true,
      relaxation: false
    }
  },
  {
    name: "Corpse Pose",
    sanskritName: "Savasana",
    category: "relaxation",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "The ultimate relaxation pose, typically practiced at the end of a yoga session.",
    benefits: ["Deep relaxation", "Reduces stress", "Calms nervous system", "Restores energy"],
    instructions: [
      "Lie flat on back",
      "Let feet fall open naturally",
      "Arms alongside body, palms up",
      "Close eyes",
      "Relax entire body",
      "Focus on natural breath",
      "Hold for 5-10 minutes"
    ],
    duration: 600,
    tags: ["relaxation", "restorative", "meditation"],
    benefitsTags: {
      flexibility: false,
      stressRelief: true,
      strength: false,
      balance: false,
      relaxation: true
    }
  },
  {
    name: "Warrior II",
    sanskritName: "Virabhadrasana II",
    category: "standing",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "A powerful standing pose that builds strength and endurance.",
    benefits: ["Strengthens legs", "Opens hips", "Improves stamina", "Builds focus"],
    instructions: [
      "Stand with feet wide apart",
      "Turn right foot out 90 degrees",
      "Turn left foot in slightly",
      "Bend right knee to 90 degrees",
      "Extend arms parallel to floor",
      "Gaze over right fingertips",
      "Hold for 5-8 breaths, then switch sides"
    ],
    duration: 60,
    tags: ["standing", "strength", "warrior"],
    benefitsTags: {
      flexibility: true,
      stressRelief: false,
      strength: true,
      balance: true,
      relaxation: false
    }
  },
  {
    name: "Cat-Cow Pose",
    sanskritName: "Marjaryasana-Bitilasana",
    category: "seated",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    description: "A gentle flowing movement that warms up the spine.",
    benefits: ["Mobilizes spine", "Relieves back tension", "Improves flexibility", "Calms mind"],
    instructions: [
      "Start on hands and knees",
      "Inhale: drop belly, lift head and tail (Cow)",
      "Exhale: round spine, tuck chin (Cat)",
      "Move slowly with breath",
      "Repeat 10-15 times"
    ],
    duration: 120,
    tags: ["seated", "warm-up", "spine"],
    benefitsTags: {
      flexibility: true,
      stressRelief: true,
      strength: false,
      balance: false,
      relaxation: true
    }
  }
];

async function seedAsanas() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sunshine-stretch');
    console.log('Connected to MongoDB');

    // Clear existing asanas
    await Asana.deleteMany({});
    console.log('Cleared existing asanas');

    // Insert new asanas
    await Asana.insertMany(asanas);
    console.log(`Seeded ${asanas.length} asanas`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding asanas:', error);
    process.exit(1);
  }
}

seedAsanas();

