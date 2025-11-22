# Deploy Sunshine Stretch Online 🌐

Make your app accessible from anywhere in the world!

## Quick Deployment Options

### Option 1: Render (Recommended - Free Tier) ⭐

**Best for:** Easy deployment, free tier, automatic HTTPS

#### Backend Deployment on Render:

1. **Create Account:**
   - Go to https://render.com
   - Sign up with GitHub (free)

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or use "Public Git repository" and paste your repo URL

3. **Configure Backend:**
   - **Name:** `sunshine-stretch-backend`
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Root Directory:** Leave empty (or set to `backend`)

4. **Add Environment Variables:**
   - Click "Environment" tab
   - Add these variables:
     ```
     PORT=10000
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your-secret-key-change-this
     NODE_ENV=production
     ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the URL: `https://sunshine-stretch-backend.onrender.com`

#### Frontend Deployment on Render:

1. **Create New Static Site:**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure:**
   - **Name:** `sunshine-stretch`
   - **Build Command:** (leave empty - no build needed)
   - **Publish Directory:** `frontend`

3. **Update API URL:**
   - Before deploying, update `frontend/js/api.js`:
   ```javascript
   const API_BASE_URL = 'https://sunshine-stretch-backend.onrender.com/api';
   ```

4. **Deploy:**
   - Click "Create Static Site"
   - Your app will be live at: `https://sunshine-stretch.onrender.com`

---

### Option 2: Vercel (Frontend) + Railway (Backend)

#### Backend on Railway:

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (same as Render)
6. Railway auto-detects Node.js and deploys
7. Get your backend URL

#### Frontend on Vercel:

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project" → Import your repo
4. **Root Directory:** `frontend`
5. **Build Settings:** Leave empty (static site)
6. Update API URL to Railway backend URL
7. Deploy!

---

### Option 3: Netlify (Frontend) + Fly.io (Backend)

#### Backend on Fly.io:

1. Install Fly CLI: `npm install -g @fly/cli`
2. Sign up: https://fly.io
3. In your project: `fly launch`
4. Follow prompts
5. Add secrets: `fly secrets set MONGODB_URI=... JWT_SECRET=...`

#### Frontend on Netlify:

1. Go to https://netlify.com
2. Sign up with GitHub
3. "Add new site" → "Import an existing project"
4. Select repo
5. **Base directory:** `frontend`
6. **Publish directory:** `frontend`
7. Update API URL to Fly.io backend
8. Deploy!

---

## Setup MongoDB Atlas (Free Cloud Database)

Since you need a database accessible from anywhere:

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up (free tier available)

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "FREE" (M0) tier
   - Select a region close to you
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `sunshine-stretch-user`
   - Password: (generate secure password)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add specific IPs for production
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `sunshine-stretch`
   - Example: `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/sunshine-stretch?retryWrites=true&w=majority`

6. **Use in Environment Variables:**
   - Add this to your deployment platform's environment variables as `MONGODB_URI`

---

## Update Code for Production

### 1. Update Backend CORS

Update `backend/server.js`:

```javascript
// Middleware
app.use(cors({
  origin: [
    'https://sunshine-stretch.onrender.com',
    'https://your-frontend-domain.com',
    'http://localhost:3000' // Keep for local development
  ],
  credentials: true
}));
```

### 2. Update Frontend API URL

Update `frontend/js/api.js`:

```javascript
// Production API URL
const API_BASE_URL = process.env.API_URL || 'https://your-backend-url.onrender.com/api';

// Or hardcode for static hosting:
const API_BASE_URL = 'https://sunshine-stretch-backend.onrender.com/api';
```

### 3. Create Production Build Script

Add to `backend/package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  }
}
```

---

## Step-by-Step: Render Deployment (Easiest)

### Step 1: Prepare Your Code

1. **Update `frontend/js/api.js`:**
   ```javascript
   const getApiBaseUrl = () => {
     // Use environment variable or default to production URL
     if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
       return 'http://localhost:5001/api';
     }
     // Production URL - update after deployment
     return 'https://sunshine-stretch-backend.onrender.com/api';
   };
   const API_BASE_URL = getApiBaseUrl();
   ```

2. **Update `backend/server.js` CORS:**
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || '*', // Allow all in dev, restrict in prod
     credentials: true
   }));
   ```

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/sunshine-stretch.git
git push -u origin main
```

### Step 3: Deploy Backend

1. Go to https://render.com
2. New Web Service → Connect GitHub
3. Select your repo
4. Configure:
   - Name: `sunshine-stretch-backend`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Add environment variables
6. Deploy!

### Step 4: Deploy Frontend

1. New Static Site → Connect GitHub
2. Configure:
   - Root Directory: `frontend`
   - Build: (empty)
   - Publish: `frontend`
3. Update `api.js` with your backend URL
4. Deploy!

---

## Free Hosting Comparison

| Service | Frontend | Backend | Database | Free Tier |
|---------|----------|---------|----------|-----------|
| Render | ✅ | ✅ | ❌ | 750 hours/month |
| Vercel | ✅ | ✅ (Serverless) | ❌ | Unlimited |
| Netlify | ✅ | ✅ (Functions) | ❌ | 100GB bandwidth |
| Railway | ❌ | ✅ | ❌ | $5 credit/month |
| Fly.io | ❌ | ✅ | ❌ | 3 shared VMs |
| MongoDB Atlas | ❌ | ❌ | ✅ | 512MB free |

**Recommended Combo:** Render (Backend + Frontend) + MongoDB Atlas (Database)

---

## After Deployment

1. **Test your live URL:**
   - Frontend: `https://your-app.onrender.com`
   - Backend: `https://your-backend.onrender.com/api/health`

2. **Share with friends:**
   - Send them the frontend URL
   - Works from anywhere in the world!

3. **Monitor:**
   - Check Render dashboard for logs
   - Monitor MongoDB Atlas for database usage

---

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist (allow all for testing)
- Verify connection string has correct password
- Check database user permissions

### CORS errors
- Update CORS origin in backend to match frontend URL
- Check browser console for specific error

### Environment variables not working
- Make sure variables are set in deployment platform
- Restart service after adding variables
- Check variable names match code (case-sensitive)

---

## Security Notes for Production

1. **Change JWT_SECRET** to a strong random string
2. **Restrict CORS** to only your frontend domain
3. **Use HTTPS** (automatic with Render/Vercel/Netlify)
4. **Restrict MongoDB IPs** to your backend IPs only
5. **Add rate limiting** to prevent abuse
6. **Use environment variables** for all secrets

---

**Your app will be live and accessible from anywhere! 🌍✨**

