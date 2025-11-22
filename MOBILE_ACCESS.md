# Accessing from Mobile Phone 📱

## Quick Setup

### Step 1: Make Sure Both Devices Are on Same Network
- Your computer and your friend's phone must be on the **same Wi-Fi network**

### Step 2: Find Your Computer's IP Address

**Windows:**
```powershell
ipconfig | findstr /i "IPv4"
```

**Mac/Linux:**
```bash
ifconfig | grep "inet "
# or
ip addr show
```

You'll see something like: `192.168.1.3` or `192.168.0.5`

### Step 3: Update Configuration

1. **Update `frontend/js/api.js`:**
   - Find the line: `return 'http://192.168.1.3:5001/api';`
   - Replace `192.168.1.3` with **YOUR** computer's IP address

2. **Restart the servers:**
   ```bash
   npm run dev
   ```

### Step 4: Access from Phone

On your friend's phone browser, go to:
```
http://YOUR_IP_ADDRESS:3000
```

Example: `http://192.168.1.3:3000`

## Troubleshooting

### Phone Can't Connect

1. **Check Firewall:**
   - Windows: Allow Node.js through Windows Firewall
   - Go to: Windows Defender Firewall → Allow an app
   - Make sure Node.js is allowed for Private networks

2. **Verify Same Network:**
   - Both devices must be on the same Wi-Fi
   - Check phone's Wi-Fi settings

3. **Check IP Address:**
   - Make sure you're using the correct IP
   - IP might change if you reconnect to Wi-Fi

4. **Test Backend First:**
   - On phone, try: `http://YOUR_IP:5001/api/health`
   - Should show: `{"status":"OK",...}`
   - If this doesn't work, the backend isn't accessible

### Still Not Working?

**Option 1: Use ngrok (Internet Access)**
```bash
# Install ngrok
npm install -g ngrok

# In one terminal - start your app
npm run dev

# In another terminal - create tunnel
ngrok http 3000
```

This gives you a public URL like: `https://abc123.ngrok.io`

**Option 2: Check Windows Firewall**
1. Open Windows Defender Firewall
2. Click "Allow an app or feature"
3. Find Node.js or add it manually
4. Check both "Private" and "Public" boxes

**Option 3: Temporarily Disable Firewall (Testing Only)**
⚠️ **Not recommended for production!**

## Current Configuration

- **Your IP:** 192.168.1.3 (update if changed)
- **Frontend Port:** 3000
- **Backend Port:** 5001
- **Access URL:** http://192.168.1.3:3000

## Security Note

⚠️ This setup is for **development only**. For production:
- Use HTTPS
- Set up proper authentication
- Configure CORS properly
- Use environment variables for IP addresses

