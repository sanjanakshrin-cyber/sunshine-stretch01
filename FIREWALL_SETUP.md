# Windows Firewall Setup for Mobile Access 🔥

## Quick Fix: Allow Node.js Through Firewall

### Method 1: Automatic (Recommended)

1. **When you start the server, Windows will ask:**
   - Click "Allow access" when the firewall popup appears
   - Check both "Private" and "Public" networks

### Method 2: Manual Setup

1. **Open Windows Defender Firewall:**
   - Press `Win + R`
   - Type: `firewall.cpl`
   - Press Enter

2. **Allow Node.js:**
   - Click "Allow an app or feature through Windows Defender Firewall"
   - Click "Change settings" (admin required)
   - Click "Allow another app..."
   - Browse to: `C:\Program Files\nodejs\node.exe`
   - Or find Node.js in the list and check both boxes
   - Click OK

3. **Allow Ports Manually:**
   - Click "Advanced settings"
   - Click "Inbound Rules" → "New Rule"
   - Select "Port" → Next
   - Select "TCP" and enter port `3000` → Next
   - Select "Allow the connection" → Next
   - Check all boxes → Next
   - Name: "Sunshine Stretch Frontend" → Finish
   - Repeat for port `5001` (Backend)

### Method 3: PowerShell (Quick)

Run as Administrator:
```powershell
New-NetFirewallRule -DisplayName "Node.js Server" -Direction Inbound -Protocol TCP -LocalPort 3000,5001 -Action Allow
```

## Verify It Works

1. Start your server: `npm run dev`
2. On your phone (same Wi-Fi), try:
   - Frontend: `http://YOUR_IP:3000`
   - Backend: `http://YOUR_IP:5001/api/health`

If backend works but frontend doesn't, check firewall for port 3000.
If frontend works but API calls fail, check firewall for port 5001.

## Troubleshooting

**Still blocked?**
- Temporarily disable firewall to test (not recommended)
- Check if antivirus is blocking it
- Make sure both devices are on same network

