# Quick Setup Guide

## Prerequisites
- Node.js (v18+)
- MongoDB (local installation or MongoDB Atlas account)

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Configure Backend Environment

Create a file `backend/.env` with the following content:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/sunshine-stretch
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

**For MongoDB Atlas:**
- Replace `MONGODB_URI` with your Atlas connection string
- Example: `mongodb+srv://username:password@cluster.mongodb.net/sunshine-stretch`

### 3. Start MongoDB

**Local MongoDB:**
- Make sure MongoDB service is running
- On Windows: Check Services or run `mongod`
- On Mac/Linux: `brew services start mongodb-community` or `sudo systemctl start mongod`

**MongoDB Atlas:**
- No local setup needed, just use your connection string

### 4. Seed the Database (Optional but Recommended)

```bash
cd backend
node scripts/seedAsanas.js
```

This will populate your database with 12 sample asanas.

### 5. Start the Application

**Option 1: Run both servers together**
```bash
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend (using http-server)
npm run serve:frontend

# Or use any static file server:
# cd frontend && python -m http.server 3000
# cd frontend && npx serve -p 3000
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- API Health Check: http://localhost:5000/api/health

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB is running: `mongosh` or check services
- Check connection string in `.env`
- Ensure firewall allows MongoDB connections

### Port Already in Use
- Change `PORT` in `backend/.env` for backend
- Use a different port for frontend server (e.g., `npx http-server -p 3001`)

### Module Not Found Errors
- Run `npm install` in the `backend/` directory
- Frontend uses vanilla JS, no npm dependencies needed

### CORS Errors
- Ensure backend is running on port 5000
- Check that API_BASE_URL in `frontend/js/api.js` matches your backend URL
- Backend CORS is configured to allow all origins in development

## Next Steps

1. Register a new account
2. Set your yoga goals
3. Browse asanas
4. Mark asanas as completed
5. View your dashboard for progress and recommendations

Enjoy your yoga journey! 🧘‍♀️✨

