# Sunshine Stretch 🌞🧘

A full-stack web application for learning and practicing yoga asanas (poses) with personalized recommendations, progress tracking, and an interactive, calming interface.

## Features

- 🧘 **Comprehensive Asana Library**: Browse yoga poses by category (standing, seated, balance, relaxation, etc.)
- 📊 **Progress Tracking**: Track completed asanas and monitor your yoga journey
- ✨ **AI-Powered Recommendations**: Get personalized asana suggestions based on your goals
- 🎯 **Goal-Oriented Practice**: Set goals for flexibility, strength, stress relief, balance, or relaxation
- 🔐 **User Authentication**: Secure login and registration system
- 📱 **Responsive Design**: Beautiful, calming interface with yellow and purple theme
- 🖼️ **Rich Content**: Detailed instructions, images, and benefits for each asana

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- RESTful API

### Frontend
- Vanilla HTML, CSS, and JavaScript
- ES6 Modules for code organization
- Fetch API for HTTP requests
- CSS3 with custom properties

## Project Structure

```
sunshine-stretch/
├── backend/
│   ├── models/          # MongoDB models (User, Asana)
│   ├── routes/          # API routes (auth, asanas, users, recommendations)
│   ├── middleware/      # Authentication middleware
│   ├── scripts/         # Database seeding script
│   └── server.js        # Express server
├── frontend/
│   ├── css/             # Stylesheet files
│   ├── js/              # JavaScript modules
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page rendering functions
│   │   ├── api.js       # API client
│   │   ├── auth.js      # Authentication utilities
│   │   ├── router.js    # Client-side routing
│   │   └── app.js       # Application entry point
│   └── index.html       # Main HTML file
└── package.json         # Root package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd sunshine-stretch
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sunshine-stretch
   JWT_SECRET=your-secret-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in `.env`.

5. **Seed the database (optional)**
   
   Populate the database with sample asanas:
   ```bash
   cd backend
   node scripts/seedAsanas.js
   ```

6. **Start the development servers**
   
   From the root directory:
   ```bash
   npm run dev
   ```
   
   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend static server on `http://localhost:3000`

   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend
   
   # Terminal 2 - Frontend (using http-server)
   npm run serve:frontend
   
   # Or use any static file server:
   # cd frontend && python -m http.server 3000
   # cd frontend && npx serve -p 3000
   ```

## Usage

1. **Register/Login**: Create an account or sign in to access personalized features
2. **Browse Asanas**: Explore yoga poses by category, difficulty, or search
3. **View Details**: Click on any asana to see detailed instructions, benefits, and images
4. **Track Progress**: Mark asanas as completed and track your practice duration
5. **Get Recommendations**: Set your goals and receive AI-powered asana recommendations
6. **Dashboard**: View your progress, completed asanas, and statistics

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Asanas
- `GET /api/asanas` - Get all asanas (with optional filters)
- `GET /api/asanas/:id` - Get single asana
- `GET /api/asanas/category/:category` - Get asanas by category

### User
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/goals` - Update user goals (requires auth)
- `POST /api/users/complete-asana` - Mark asana as completed (requires auth)
- `GET /api/users/progress` - Get user progress (requires auth)

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations (requires auth)

## Features in Detail

### AI Recommendations
The recommendation system analyzes:
- User's selected goals (flexibility, strength, stress relief, etc.)
- Completed asanas (to avoid duplicates)
- Difficulty preferences
- Category diversity

### Progress Tracking
- Total completed asanas
- Practice duration
- Progress by category
- Recently completed asanas

## Customization

### Adding New Asanas
You can add asanas through the database or by modifying `backend/scripts/seedAsanas.js` and running the seed script.

### Styling
The color scheme uses CSS custom properties defined in `frontend/css/styles.css`. Modify the `:root` variables to change the theme colors.

## Production Deployment

1. Set production environment variables in `backend/.env`
2. Use a process manager like PM2 for the backend
3. Serve the frontend directory with a web server (nginx, Apache, etc.)
4. Configure CORS in backend if frontend is on a different domain
5. For Apache, the `.htaccess` file in frontend/ enables HTML5 routing

## License

This project is open source and available for personal and educational use.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---

**Namaste! 🙏** Enjoy your yoga journey with Sunshine Stretch!

