# 🚀 Deployment Guide - LinkedIn Automation Platform

## Overview

This application has **two components** that need different deployment strategies:

1. **Dashboard (Next.js)** - Can deploy to Vercel
2. **Worker (Playwright automation)** - Needs a VPS or specialized platform

---

## 📋 Pre-Deployment Checklist

Before deploying anywhere:

- [ ] ✅ .gitignore updated (database files, screenshots excluded)
- [ ] ✅ Environment variables configured
- [ ] ✅ README.md with disclaimers created
- [ ] ✅ Safety features implemented (random delays, hover, scroll)
- [ ] ✅ Production database selected (PostgreSQL)
- [ ] ✅ All sensitive data removed from code
- [ ] ✅ .env.example created (without actual values)

---

## 🗄️ Step 1: Set Up Production Database

### Option A: Neon (Recommended - Free Tier)

1. **Sign up at [neon.tech](https://neon.tech)**

2. **Create a new project:**
   - Click "New Project"
   - Choose a region close to your users
   - Free tier includes 0.5GB storage

3. **Get connection string:**
   - Copy the connection string from dashboard
   - Format: \postgresql://user:pass@host/dbname?sslmode=require\

4. **Update local .env:**
   \\\env
   DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require"
   \\\

5. **Run migration:**
   \\\ash
   npx prisma migrate deploy
   \\\

### Option B: Supabase (Also Free Tier)

1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Get PostgreSQL connection string from Settings → Database
4. Follow same steps as Neon above

### Option C: Railway PostgreSQL

1. Sign up at [railway.app](https://railway.app)
2. New Project → Add PostgreSQL
3. Copy DATABASE_URL from Variables tab
4. Follow same steps as above

---

## 🌐 Step 2: Deploy Dashboard to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier)
- Code pushed to GitHub repository

### Steps:

1. **Create .env.example** (if not already exists):
   \\\ash
   cd C:\Users\lenovo\Downloads\clonelink
   copy .env .env.example
   \\\
   
   Then edit .env.example and replace actual values with placeholders:
   \\\env
   DATABASE_URL="your_postgresql_connection_string_here"
   NEXTAUTH_SECRET="generate_random_string_here"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   \\\

2. **Push to GitHub:**
   \\\ash
   git init
   git add .
   git commit -m "Initial commit - LinkedIn automation platform"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   \\\

3. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Import"

4. **Configure Environment Variables in Vercel:**
   - In project settings, go to "Environment Variables"
   - Add these variables:
     \\\
     DATABASE_URL = <your Neon/Supabase connection string>
     NEXTAUTH_SECRET = <generate random string>
     NEXTAUTH_URL = <your vercel URL, e.g., https://your-app.vercel.app>
     \\\
   
   To generate NEXTAUTH_SECRET:
   \\\ash
   openssl rand -base64 32
   \\\

5. **Deploy:**
   - Vercel will automatically deploy
   - Wait for build to complete
   - Visit your URL!

6. **Run database migrations** (first time only):
   - In Vercel dashboard, go to your project
   - Click on the deployment
   - Open the "Functions" tab and find a function
   - Or run locally with production DATABASE_URL:
     \\\ash
     DATABASE_URL="<production-url>" npx prisma migrate deploy
     \\\

---

## 🤖 Step 3: Deploy Worker (Automation)

**IMPORTANT:** The worker.ts **cannot** run on Vercel because it requires Playwright and browser automation.

### Option A: Railway.app (Recommended - Easy)

1. **Install Railway CLI:**
   \\\ash
   npm i -g @railway/cli
   \\\

2. **Login:**
   \\\ash
   railway login
   \\\

3. **Create new project:**
   \\\ash
   railway init
   \\\

4. **Add environment variable:**
   \\\ash
   railway variables set DATABASE_URL="<your postgres connection string>"
   \\\

5. **Create Procfile** in project root:
   \\\
   worker: npm run worker
   \\\

6. **Deploy:**
   \\\ash
   railway up
   \\\

7. **Ensure it stays running:**
   - Railway dashboard → Your service
   - Settings → Change "Service Type" to "Worker"
   - This keeps it running continuously

### Option B: Render.com

1. **Go to [render.com](https://render.com)**

2. **Create new Background Worker:**
   - Dashboard → New → Background Worker
   - Connect your GitHub repository

3. **Configure:**
   - **Build Command:** \
pm install && npx playwright install chromium\
   - **Start Command:** \
pm run worker\
   - **Environment:** Node

4. **Add Environment Variables:**
   - DATABASE_URL: <your postgres connection string>

5. **Deploy:**
   - Click "Create Background Worker"
   - Wait for deployment

### Option C: VPS (DigitalOcean, AWS, etc.)

For full control, deploy to a VPS:

1. **Create Ubuntu server** (minimum 1GB RAM)

2. **SSH into server:**
   \\\ash
   ssh root@your-server-ip
   \\\

3. **Install Node.js:**
   \\\ash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   \\\

4. **Install dependencies for Playwright:**
   \\\ash
   sudo apt-get install -y \
       libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 \
       libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
       libxdamage1 libxfixes3 libxrandr2 libgbm1 \
       libpango-1.0-0 libcairo2 libasound2
   \\\

5. **Clone repository:**
   \\\ash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   \\\

6. **Install dependencies:**
   \\\ash
   npm install
   npx playwright install chromium
   \\\

7. **Create .env file:**
   \\\ash
   nano .env
   # Add your DATABASE_URL
   \\\

8. **Run with PM2** (keeps it running):
   \\\ash
   npm install -g pm2
   pm2 start npm --name "linkedin-worker" -- run worker
   pm2 save
   pm2 startup
   \\\

---

## 🔄 Update Process

### Updating Dashboard (Vercel)

Just push to GitHub:
\\\ash
git add .
git commit -m "Update dashboard"
git push
\\\
Vercel automatically redeploys.

### Updating Worker (Railway)

\\\ash
railway up
\\\

### Updating Worker (Render)

Push to GitHub - Render auto-deploys from main branch.

### Updating Worker (VPS)

\\\ash
ssh root@your-server-ip
cd your-repo
git pull
npm install
pm2 restart linkedin-worker
\\\

---

## 📊 Architecture Overview

\\\
┌─────────────────────┐
│   Vercel (Dashboard)│ ← Users access dashboard here
│   Next.js UI        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  PostgreSQL (Neon)  │ ← Shared database
│  Stores: users,     │
│  keywords, comments,│
│  logs, settings     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Railway/Render/VPS │ ← Worker runs automation
│  worker.ts          │
│  (Playwright)       │
└─────────────────────┘
\\\

Both components connect to the same PostgreSQL database.

---

## 🔐 Security Checklist

Before going live:

- [ ] ✅ All .env files excluded in .gitignore
- [ ] ✅ No hardcoded credentials in code
- [ ] ✅ Database files (*.db) excluded from git
- [ ] ✅ NEXTAUTH_SECRET is strong and random
- [ ] ✅ PostgreSQL connection uses SSL (?sslmode=require)
- [ ] ✅ Environment variables set in deployment platforms
- [ ] ✅ .env.example created with placeholder values only

---

## 🧪 Testing Deployment

### Test Dashboard:

1. Visit your Vercel URL
2. Create an account
3. Log in
4. Check all pages load correctly
5. Add a keyword
6. Add a comment
7. Update settings

### Test Worker:

1. Check logs in Railway/Render dashboard
2. Should see "Launching headless browser for user..."
3. Monitor for errors
4. Check database logs table for new entries

---

## 💰 Cost Estimate

### Free Tier Setup:
- **Vercel:** Free (hobby plan)
- **Neon PostgreSQL:** Free (0.5GB, 3 projects)
- **Railway:** \/month credit (worker might exceed)
- **Total:** ~\-5/month

### Paid Setup:
- **Vercel:** \/month (Pro)
- **Neon:** \/month (Pro with more storage)
- **Railway:** ~\-20/month (based on usage)
- **Total:** ~\-60/month

---

## 🐛 Troubleshooting

### Dashboard not loading:

- Check Vercel deployment logs
- Verify DATABASE_URL is correct
- Ensure migrations ran successfully

### Worker not running:

- Check Railway/Render logs
- Verify Playwright installed: \
px playwright install chromium\
- Check DATABASE_URL connection
- Ensure enough RAM (minimum 1GB)

### Database connection errors:

- Verify connection string format
- Check if IP is whitelisted (Neon/Supabase)
- Ensure \?sslmode=require\ is in connection string
- Test connection: \
px prisma db push\

### Worker crashes:

- Check memory usage (Playwright needs 512MB-1GB)
- Review logs for specific errors
- Ensure all dependencies installed
- Try restarting the service

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs
- **Neon Docs:** https://neon.tech/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Playwright Docs:** https://playwright.dev

---

## ✅ Post-Deployment

After successful deployment:

1. ✅ Test full workflow (dashboard + worker)
2. ✅ Monitor for 24-48 hours
3. ✅ Check LinkedIn account for warnings
4. ✅ Set up monitoring/alerts
5. ✅ Start with LOW frequency (1-2 comments/day)
6. ✅ Gradually increase if no issues

---

**Remember: Start conservatively. Monitor closely. Use burner accounts.**
