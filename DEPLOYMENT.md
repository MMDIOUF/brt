# 🚀 SunuBRT Dashboard — Deployment Guide (Free Tier)

Deploy your dashboard for free using **Vercel** (frontend) + **Render** (backend).

---

## Quick Summary

| Component | Platform | Cost | Deploy Time |
|-----------|----------|------|-------------|
| **Frontend** | Vercel | Free | ~2 min |
| **Backend API** | Render | Free | ~3 min |
| **Database** | PostgreSQL (optional) | Free (500MB) | ~1 min |

---

## Part 1: Prepare GitHub Repository

### 1.1 Push code to GitHub

```powershell
cd C:\Users\7MAKSACOD\OneDrive\Desktop\brt

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial SunuBRT Dashboard"

# Create repo on github.com, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sunubrt-dashboard.git
git push -u origin main
```

### 1.2 Repository structure requirements

Ensure your repo root has:
```
/
├── brtintern-main/          (Frontend - Vercel will detect this)
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
├── free-claude-code-proxy/  (Backend - Render will detect this)
│   ├── pyproject.toml
│   ├── server.py
│   └── api/
├── .gitignore
└── README.md
```

---

## Part 2: Deploy Backend to Render

### 2.1 Render Setup

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click **"New +"** → Select **"Web Service"**
3. Connect your repository
4. Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `sunubrt-backend` |
| **Environment** | `Python 3.12` |
| **Build Command** | `pip install -e .` |
| **Start Command** | `uvicorn server:app --host 0.0.0.0 --port 8000` |
| **Root Directory** | `free-claude-code-proxy` |

### 2.2 Configure Environment Variables

In Render dashboard, go to **Environment** tab and add:

```env
PYTHON_VERSION=3.12.0
PORT=8000
```

**Optional** (if using data APIs):
```env
ANTHROPIC_API_KEY=your_key_here
NVIDIA_NIM_API_KEY=your_key_here
```

### 2.3 Deploy

Click **Deploy** → Wait 3-5 minutes → You'll get a URL like:
```
https://sunubrt-backend.onrender.com
```

**Save this URL** — you'll need it for the frontend.

---

## Part 3: Deploy Frontend to Vercel

### 3.1 Vercel Setup

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Select your repository
4. Vercel will auto-detect it's a Vite project

### 3.2 Configure Build Settings

| Field | Value |
|-------|-------|
| **Framework Preset** | `Other` (or auto-detected) |
| **Root Directory** | `brtintern-main` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm ci` |

### 3.3 Environment Variables

Add environment variables in Vercel dashboard:

```env
VITE_API_URL=https://sunubrt-backend.onrender.com
VITE_API_TIMEOUT=30000
```

**Notes:**
- Replace `sunubrt-backend.onrender.com` with your actual Render backend URL
- Prefix with `VITE_` so they're available in the browser

### 3.4 Deploy

Click **Deploy** → Wait 2-3 minutes → You'll get a URL like:
```
https://sunubrt-dashboard.vercel.app
```

---

## Part 4: Update Frontend to Use Backend API

Edit [brtintern-main/src/lib/api.ts](brtintern-main/src/lib/api.ts) (or create it):

```typescript
// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  // Example: fetch real-time BRT data
  async fetchBusData() {
    const res = await fetch(`${API_BASE}/api/buses`);
    return res.json();
  },

  // Example: fetch station occupancy
  async fetchStationOccupancy(stationId: string) {
    const res = await fetch(`${API_BASE}/api/stations/${stationId}/occupancy`);
    return res.json();
  },
};
```

Use in React components:
```typescript
// src/routes/dashboard.tsx
import { api } from '@/lib/api';

export default function Dashboard() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    api.fetchBusData().then(setData);
  }, []);

  return <div>{/* render data */}</div>;
}
```

---

## Part 5: Backend API Routes

Ensure your [free-claude-code-proxy/api/routes.py](free-claude-code-proxy/api/routes.py) has CORS enabled:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def create_app():
    app = FastAPI()

    # Enable CORS for Vercel frontend
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Or restrict to your Vercel domain
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Your routes
    @app.get("/api/buses")
    async def get_buses():
        return {"buses": []}

    return app
```

---

## Part 6: Continuous Deployment

Both Vercel and Render automatically redeploy when you push to `main`:

```powershell
# Make changes locally
git add .
git commit -m "Update dashboard styles"
git push origin main

# Vercel & Render auto-redeploy within 1-2 minutes
```

---

## Part 7: Monitor & Debug

### Vercel Logs
- Dashboard → Your project → **Deployments** tab → Click latest → **Logs**

### Render Logs
- Dashboard → Your service → **Logs** tab (real-time streaming)

### Test API Connection
```bash
# From your local machine
curl https://sunubrt-backend.onrender.com/health

# Or from browser console
fetch('https://sunubrt-backend.onrender.com/api/buses')
  .then(r => r.json())
  .then(console.log)
```

---

## Part 8: Cost Breakdown (All FREE)

- **Vercel**: Free tier includes unlimited static sites
- **Render**: Free tier includes one Python web service (sleeps after 15 min inactivity)
- **GitHub**: Free for public repos

### Upgrade Path (if needed)
- Vercel Pro: $20/month → +50GB bandwidth, priority support
- Render Pro: $12/month → Always-on backend, 4GB RAM
- Render Postgres: $15/month → 90GB database

---

## Troubleshooting

### "Backend timeout" on Render free tier
Render free tier sleeps after 15 minutes of inactivity. First request takes 30s.

**Solution:** Upgrade to Render Pro ($12/month) or add a cron job to ping your API every 5 minutes.

### "CORS error" in browser console
Backend not sending correct CORS headers.

**Fix:** Update [server.py](free-claude-code-proxy/server.py):
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://sunubrt-dashboard.vercel.app"],
)
```

### "Build failed" on Vercel
Check that `brtintern-main/package.json` has all dependencies.

**Fix:**
```bash
cd brtintern-main
npm ci
npm run build  # Test locally first
```

### Build fails on Render
Python version mismatch.

**Fix:** Update `python-requires = ">=3.12"` in [pyproject.toml](free-claude-code-proxy/pyproject.toml)

---

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Test API integration
5. 📊 Add CI/CD workflows (GitHub Actions)
6. 🔐 Set up monitoring (Sentry, LogRocket)

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **FastAPI CORS**: https://fastapi.tiangolo.com/tutorial/cors/
- **Vite Env Variables**: https://vitejs.dev/guide/env-and-mode.html

