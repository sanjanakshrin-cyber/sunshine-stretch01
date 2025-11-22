# Deploy to Render Using render.yaml (One-Click Deployment) 🚀

This guide shows you how to use the `render.yaml` file to deploy both backend and frontend with one click!

## What is render.yaml?

The `render.yaml` file is a "Blueprint" that tells Render exactly how to deploy your app. Instead of manually configuring each service, you can deploy everything at once!

## Prerequisites

1. ✅ GitHub account
2. ✅ MongoDB Atlas account (free) - [Sign up here](https://www.mongodb.com/cloud/atlas)
3. ✅ Your code pushed to GitHub

## Step-by-Step Guide

### Step 1: Setup MongoDB Atlas (5 minutes)

1. **Go to MongoDB Atlas:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free account

2. **Create a Free Cluster:**
   - Click "Build a Database"
   - Choose **FREE (M0)** tier
   - Select a region (choose closest to you)
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Authentication Method: "Password"
   - Username: `sunshine-user` (or any name)
   - Password: Click "Autogenerate Secure Password" (SAVE THIS!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Driver: "Node.js", Version: "5.5 or later"
   - Copy the connection string
   - It looks like: `mongodb+srv://sunshine-user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - **IMPORTANT:** Replace `<password>` with your actual password
   - Add database name: Change `?retryWrites=true` to `/sunshine-stretch?retryWrites=true`
   - Final string: `mongodb+srv://sunshine-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sunshine-stretch?retryWrites=true&w=majority`
   - **SAVE THIS STRING!** You'll need it in Step 4

### Step 2: Push Code to GitHub (2 minutes)

If you haven't already:

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Render deployment"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/sunshine-stretch.git
git branch -M main
git push -u origin main
```

**Or use GitHub Desktop/GitHub website to create repo and push.**

### Step 3: Update render.yaml (Optional)

The `render.yaml` file is already configured, but you can customize:

- **Backend name:** Change `sunshine-stretch-backend` to your preferred name
- **Frontend name:** Change `sunshine-stretch-frontend` to your preferred name
- **Port:** Already set to 10000 (Render's default)

**No changes needed** - the file is ready to use!

### Step 4: Deploy on Render Using Blueprint (5 minutes)

1. **Go to Render:**
   - Visit: https://render.com
   - Click "Get Started for Free"
   - Sign up with GitHub (recommended) or email

2. **Create New Blueprint:**
   - In Render dashboard, click "New +" button (top right)
   - Select "Blueprint"
   - Or go directly to: https://dashboard.render.com/new/blueprint

3. **Connect Repository:**
   - Click "Connect account" if not connected
   - Select your GitHub account
   - Find and select your `sunshine-stretch` repository
   - Click "Connect"

4. **Review Blueprint:**
   - Render will automatically detect `render.yaml`
   - You'll see two services:
     - ✅ `sunshine-stretch-backend` (Web Service)
     - ✅ `sunshine-stretch-frontend` (Static Site)
   - Click "Apply" at the bottom

5. **Set Environment Variables:**
   - Render will show you services that need environment variables
   - For **Backend**, you need to set:
     
     **MONGODB_URI:**
     - Click on the backend service
     - Go to "Environment" tab
     - Click "Add Environment Variable"
     - Key: `MONGODB_URI`
     - Value: Paste your MongoDB connection string from Step 1
     - Click "Save Changes"
     
     **JWT_SECRET:**
     - Still in Environment tab
     - Click "Add Environment Variable"
     - Key: `JWT_SECRET`
     - Value: Generate a random string (e.g., use: https://randomkeygen.com/)
     - Click "Save Changes"
     
     **FRONTEND_URL:**
     - Wait until frontend is deployed (Step 5)
     - Then add: `FRONTEND_URL` = `https://sunshine-stretch-frontend.onrender.com`
     - (Use your actual frontend URL)

6. **Deploy:**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Or Render will auto-deploy
   - Wait 5-10 minutes for deployment

### Step 5: Update Frontend API URL

After backend is deployed:

1. **Get Backend URL:**
   - In Render dashboard, click on `sunshine-stretch-backend`
   - Copy the URL (e.g., `https://sunshine-stretch-backend.onrender.com`)

2. **Update Frontend Code:**
   - Edit `frontend/js/api.js`
   - Find line 9: `const PRODUCTION_API_URL = 'https://sunshine-stretch-backend.onrender.com/api';`
   - Replace with your actual backend URL: `https://YOUR-BACKEND-URL.onrender.com/api`
   - Save file

3. **Commit and Push:**
   ```bash
   git add frontend/js/api.js
   git commit -m "Update API URL for production"
   git push
   ```

4. **Redeploy Frontend:**
   - Render will auto-deploy, or
   - Go to frontend service → "Manual Deploy" → "Deploy latest commit"

### Step 6: Seed Database (Optional)

To add sample asanas to your database:

1. **Option A: Use MongoDB Atlas Interface**
   - Go to MongoDB Atlas
   - Click "Browse Collections"
   - Create database: `sunshine-stretch`
   - Create collection: `asanas`
   - Import data manually

2. **Option B: Run Seed Script Locally**
   - Update `backend/scripts/seedAsanas.js` to use your Atlas connection
   - Run: `node backend/scripts/seedAsanas.js`

3. **Option C: Use MongoDB Compass**
   - Download: https://www.mongodb.com/products/compass
   - Connect using your Atlas connection string
   - Import JSON data

### Step 7: Test Your Live App! 🎉

1. **Frontend URL:** `https://sunshine-stretch-frontend.onrender.com`
2. **Backend Health Check:** `https://sunshine-stretch-backend.onrender.com/api/health`

**Test:**
- Open frontend URL in browser
- Try registering a new account
- Browse asanas
- Check dashboard

## Troubleshooting

### Backend Won't Start

**Check Logs:**
- Go to backend service in Render
- Click "Logs" tab
- Look for error messages

**Common Issues:**
- ❌ MongoDB connection failed → Check `MONGODB_URI` environment variable
- ❌ Port error → Should be `10000` (Render's default)
- ❌ Module not found → Check `package.json` has all dependencies

### Frontend Can't Connect to Backend

**Check:**
1. Backend URL is correct in `frontend/js/api.js`
2. Backend is running (check logs)
3. CORS is configured (already done in `server.js`)
4. Browser console for errors (F12 → Console)

### MongoDB Connection Issues

**Verify:**
- Connection string has correct password (no `<password>` placeholder)
- IP whitelist allows all (or includes Render's IPs)
- Database user has read/write permissions
- Connection string includes database name: `/sunshine-stretch`

### Services Keep Restarting

**Free Tier Limitation:**
- Services sleep after 15 minutes of inactivity
- First request takes ~30 seconds (wake up time)
- This is normal for free tier

**Solution:**
- Upgrade to paid plan ($7/month) for always-on
- Or use uptime monitor (UptimeRobot) to ping every 5 minutes

## What You Get

After deployment:

✅ **Frontend:** `https://sunshine-stretch-frontend.onrender.com`  
✅ **Backend API:** `https://sunshine-stretch-backend.onrender.com`  
✅ **Accessible from anywhere in the world!** 🌍

## Next Steps

1. ✅ Share your frontend URL with friends
2. ✅ Test all features
3. ✅ Monitor usage in Render dashboard
4. ✅ Set up custom domain (optional, paid feature)

## Important Notes

- **Free Tier:** Services sleep after inactivity (first request is slow)
- **HTTPS:** Automatically enabled by Render
- **Environment Variables:** Keep secrets safe, never commit to git
- **Updates:** Push to GitHub, Render auto-deploys

---

**Your app is now live and accessible from anywhere! 🎊**

Need help? Check Render's documentation: https://render.com/docs

