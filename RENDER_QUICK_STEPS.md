# Quick Steps: Deploy with render.yaml ⚡

## The Fastest Way (10 minutes total)

### 1. Setup MongoDB Atlas (3 min)
- Sign up: https://www.mongodb.com/cloud/atlas
- Create FREE cluster
- Create database user (save password!)
- Allow access from anywhere
- Get connection string (replace `<password>` with real password)

### 2. Push to GitHub (1 min)
```bash
git add .
git commit -m "Ready for Render"
git push
```

### 3. Deploy on Render (5 min)

**Go to:** https://dashboard.render.com/new/blueprint

1. **Connect GitHub** → Select your repo
2. **Render detects render.yaml automatically** ✅
3. **Click "Apply"**
4. **Set Environment Variables:**
   - Backend → Environment tab
   - Add `MONGODB_URI` = your MongoDB connection string
   - Add `JWT_SECRET` = random string (use https://randomkeygen.com/)
5. **Wait 5-10 minutes** for deployment
6. **Get your URLs:**
   - Frontend: `https://sunshine-stretch-frontend.onrender.com`
   - Backend: `https://sunshine-stretch-backend.onrender.com`

### 4. Update Frontend API (1 min)

1. Edit `frontend/js/api.js`
2. Change line 9 to your backend URL:
   ```javascript
   const PRODUCTION_API_URL = 'https://YOUR-BACKEND-URL.onrender.com/api';
   ```
3. Commit and push:
   ```bash
   git add frontend/js/api.js
   git commit -m "Update API URL"
   git push
   ```

### 5. Done! 🎉

Your app is live at: `https://sunshine-stretch-frontend.onrender.com`

Share this URL with anyone, anywhere!

---

## What render.yaml Does

✅ Automatically creates backend service  
✅ Automatically creates frontend service  
✅ Configures build commands  
✅ Sets up environment variables structure  
✅ One-click deployment!

---

## Need Help?

See `RENDER_DEPLOY.md` for detailed instructions with troubleshooting.

