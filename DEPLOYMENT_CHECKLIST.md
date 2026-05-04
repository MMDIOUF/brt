# 📋 Deployment Checklist

Follow these steps in order to deploy your SunuBRT Dashboard to the cloud.

---

## Pre-Deployment (Local Setup)

- [ ] Ensure all code is committed: `git status` shows clean working directory
- [ ] Test frontend locally: `npm run dev` in `brtintern-main/`
- [ ] Test backend locally: `uvicorn server:app --reload` in `free-claude-code-proxy/`
- [ ] Backend responds to: `http://localhost:8000/docs` (FastAPI Swagger)
- [ ] Frontend loads at: `http://localhost:5173`

---

## GitHub Setup

- [ ] Create GitHub account if needed: https://github.com/signup
- [ ] Create new repository: https://github.com/new
  - Name: `sunubrt-dashboard` (or similar)
  - Visibility: **Public** (free tier)
  - Initialize without README (you already have one)

- [ ] Push code to GitHub:
  ```powershell
  git remote add origin https://github.com/YOUR_USERNAME/sunubrt-dashboard.git
  git branch -M main
  git push -u origin main
  ```

- [ ] Verify on GitHub:
  - Visit https://github.com/YOUR_USERNAME/sunubrt-dashboard
  - See files: `brtintern-main/`, `free-claude-code-proxy/`, etc.

---

## Backend Deployment (Render)

### Create Service

- [ ] Sign up: https://render.com (use GitHub login)
- [ ] Dashboard → **New +** → **Web Service**
- [ ] Connect repository: Select `YOUR_USERNAME/sunubrt-dashboard`
- [ ] Fill deployment form:
  ```
  Name: sunubrt-backend
  Environment: Python 3.12
  Root Directory: free-claude-code-proxy
  Build Command: pip install -e .
  Start Command: uvicorn server:app --host 0.0.0.0 --port 8000
  ```

### Environment Variables

- [ ] Add to Render dashboard (**Environment** tab):
  ```
  PYTHON_VERSION=3.12.0
  PORT=8000
  ```

### Deploy & Verify

- [ ] Click **Create Web Service** → Wait 3-5 minutes
- [ ] Deployment completes (shows green checkmark)
- [ ] Copy backend URL: `https://sunubrt-backend.onrender.com`
- [ ] Test endpoint: Visit `https://sunubrt-backend.onrender.com/health`
  - Should return: `{"status": "ok"}` or similar
  - First request may take 30 seconds (free tier cold start)

---

## Frontend Deployment (Vercel)

### Create Project

- [ ] Sign up: https://vercel.com (use GitHub login)
- [ ] Dashboard → **Add New** → **Project**
- [ ] Connect repository: Select `sunubrt-dashboard`
- [ ] Vercel auto-detects Vite setup

### Configure Build Settings

- [ ] Root Directory: `brtintern-main`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Leave other fields as defaults

### Add Environment Variables

- [ ] **Environment Variables** section:
  ```
  Key: VITE_API_URL
  Value: https://sunubrt-backend.onrender.com
  ```
  - ⚠️ Replace with your actual Render backend URL
  - ✅ Must start with `VITE_` to be available in browser

- [ ] Click **Add**

### Deploy & Verify

- [ ] Click **Deploy** → Wait 2-3 minutes
- [ ] See "Congratulations" page → Click visit button
- [ ] Frontend loads at: `https://sunubrt-dashboard.vercel.app`
- [ ] Check browser console (F12) for errors
- [ ] If API calls fail, verify `VITE_API_URL` is correct

---

## Post-Deployment Integration

### Update Frontend Code

- [ ] Edit [brtintern-main/src/lib/api.ts](brtintern-main/src/lib/api.ts):
  ```typescript
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  ```

- [ ] Use API in components:
  ```typescript
  const data = await fetch(`${API_BASE}/api/your-endpoint`).then(r => r.json());
  ```

### Verify Integration

- [ ] Backend & frontend URLs are configured
- [ ] Open browser DevTools → **Network** tab
- [ ] Trigger API call from frontend
- [ ] See request to `https://sunubrt-backend.onrender.com/...`
- [ ] Response status: `200` (success) or identify error

---

## Enable Auto-Deployment

Both platforms auto-redeploy on GitHub push:

- [ ] Make a small change locally
- [ ] Commit & push: `git add . && git commit -m "test" && git push`
- [ ] Watch Vercel/Render rebuild automatically (2-3 minutes)
- [ ] Verify changes are live

---

## Monitoring & Maintenance

### Daily Checks

- [ ] Visit https://sunubrt-dashboard.vercel.app
- [ ] Check that data loads correctly
- [ ] No errors in browser console (F12 → Console tab)

### Weekly Checks

- [ ] Check Render logs for backend errors:
  - Dashboard → Service → **Logs** tab
  - Look for 5xx errors or crashes

- [ ] Check Vercel analytics:
  - Dashboard → Project → **Analytics** tab
  - Verify traffic and performance

### Monthly Maintenance

- [ ] Update dependencies:
  ```powershell
  cd brtintern-main && npm update
  cd ../free-claude-code-proxy && uv pip install --upgrade ...
  ```

- [ ] Review free tier quotas:
  - Vercel: Unlimited for static sites
  - Render: 1 free service (sleeps after 15 min inactivity)

---

## Troubleshooting

### "502 Bad Gateway" from Vercel

**Cause**: Backend service is down or unreachable.

**Fix**:
1. Check Render service status (green light on dashboard)
2. Test direct API call: `curl https://sunubrt-backend.onrender.com/health`
3. Verify CORS headers in backend (see [DEPLOYMENT.md](DEPLOYMENT.md) Part 5)

### "Backend request timeout" or "Cannot reach API"

**Cause**: Render free tier service is sleeping (happens after 15 min of no requests).

**Fix**:
1. First request will take 30 seconds
2. Refresh frontend after 30 seconds
3. (Optional) Upgrade to Render Pro ($12/month) for always-on service

### "Cannot find module" errors in Vercel logs

**Cause**: Dependencies not installed or version mismatch.

**Fix**:
```bash
cd brtintern-main
npm ci  # Clean install (respects package-lock.json)
npm run build  # Test build locally
git add . && git commit -m "fix: lock deps" && git push
```

### Frontend shows "VITE_API_URL undefined"

**Cause**: Environment variable not set in Vercel.

**Fix**:
1. Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. Add: `VITE_API_URL = https://sunubrt-backend.onrender.com`
3. Redeploy: **Deployments** → **Redeploy** button

---

## Next Steps (Optional Enhancements)

- [ ] Add monitoring (Sentry, LogRocket)
- [ ] Set up DNS custom domain
- [ ] Add CI/CD tests (GitHub Actions)
- [ ] Upgrade to Pro tiers if needed
- [ ] Add database (PostgreSQL on Render Free: 500MB)
- [ ] Set up backup strategy

---

## Success! 🎉

Your SunuBRT Dashboard is now live at:
- 🌐 **Frontend**: https://sunubrt-dashboard.vercel.app
- 🔌 **Backend**: https://sunubrt-backend.onrender.com
- 💾 **Repository**: https://github.com/YOUR_USERNAME/sunubrt-dashboard

Share the frontend URL with your team!

