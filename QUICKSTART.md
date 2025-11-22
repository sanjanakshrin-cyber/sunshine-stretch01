# Quick Start Guide 🚀

## Step 1: Install Dependencies

From the project root directory, run:

```bash
npm run install:all
```

This will install:
- Root dependencies (concurrently, http-server)
- Backend dependencies (Express, MongoDB, etc.)

## Step 2: Set Up Environment Variables

Create a file named `.env` in the `backend/` folder with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sunshine-stretch
JWT_SECRET=sunshine-stretch-secret-key-2024
NODE_ENV=development
```

**For MongoDB Atlas (cloud):**
- Replace `MONGODB_URI` with your Atlas connection string
- Example: `mongodb+srv://username:password@cluster.mongodb.net/sunshine-stretch`

## Step 3: Start MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB is installed and running
- On Windows: Check Services or run `mongod` in a terminal
- On Mac: `brew services start mongodb-community`
- On Linux: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
- No local setup needed!
- Just use your connection string in `.env`

## Step 4: Seed the Database (Optional but Recommended)

Populate the database with sample asanas:

```bash
cd backend
node scripts/seedAsanas.js
```

You should see: "Seeded 12 asanas"

## Step 5: Run the Application

**Option 1: Run Both Servers Together (Recommended)**

From the project root:

```bash
npm run dev
```

This starts:
- ✅ Backend API on `http://localhost:5000`
- ✅ Frontend on `http://localhost:3000`

**Option 2: Run Servers Separately**

Terminal 1 (Backend):
```bash
npm run dev:backend
```

Terminal 2 (Frontend):
```bash
npm run serve:frontend
```

**Option 3: Use Alternative Static Server**

If `http-server` doesn't work, try:

```bash
# Python
cd frontend
python -m http.server 3000

# Or Node.js serve
cd frontend
npx serve -p 3000

# Or PHP
cd frontend
php -S localhost:3000
```

## Step 6: Access the Application

1. Open your browser
2. Go to: **http://localhost:3000**
3. You should see the Sunshine Stretch homepage!

## Verify Everything Works

1. **Backend Health Check:**
   - Visit: http://localhost:5000/api/health
   - Should show: `{"status":"OK","message":"Sunshine Stretch API is running"}`

2. **Frontend:**
   - Visit: http://localhost:3000
   - Should show the homepage with yellow/purple theme

3. **Test Features:**
   - Click "Browse Asanas" to see the asana library
   - Click "Sign Up" to create an account
   - After login, visit Dashboard to see your progress

## Troubleshooting

### "Cannot find module" errors
```bash
# Reinstall dependencies
npm run install:all
```

### MongoDB connection error
- Check if MongoDB is running
- Verify `MONGODB_URI` in `backend/.env`
- For Atlas: Check your IP whitelist and credentials

### Port already in use
- Change `PORT=5000` to another port in `backend/.env`
- Update `API_BASE_URL` in `frontend/js/api.js` to match

### CORS errors
- Make sure backend is running on port 5000
- Check that `frontend/js/api.js` has correct `API_BASE_URL`

### Frontend not loading
- Make sure you're using a static file server (not opening HTML directly)
- Check browser console for errors
- Verify all files exist in `frontend/` directory

## Next Steps

1. ✅ Register a new account
2. ✅ Set your yoga goals (flexibility, strength, etc.)
3. ✅ Browse asanas by category
4. ✅ View detailed asana instructions
5. ✅ Mark asanas as completed
6. ✅ Check your dashboard for progress and recommendations

---

**Happy Yoga Practice! 🧘‍♀️✨**

