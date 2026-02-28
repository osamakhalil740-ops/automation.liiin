# ✅ Pre-Deployment Checklist

Use this checklist to ensure everything is ready before deploying to production.

---

## 🔐 Security & Secrets

- [ ] ✅ All \.env*\ files are in \.gitignore\
- [ ] ✅ No hardcoded passwords or API keys in code
- [ ] ✅ Database files (\*.db\) excluded from git
- [ ] ✅ Screenshots excluded from git
- [ ] ✅ \.env.example\ created with placeholder values (no real secrets)
- [ ] ✅ Backup files (\*.backup.ts\) excluded from git
- [ ] ✅ Review all files for sensitive data before pushing

**Test:**
\\\ash
# Check what will be committed
git status
git diff --cached

# Look for any secrets
grep -r "password" . --exclude-dir=node_modules
grep -r "secret" . --exclude-dir=node_modules
\\\

---

## 🗄️ Database Setup

- [ ] ✅ PostgreSQL database created (Neon/Supabase/Railway)
- [ ] ✅ Connection string obtained
- [ ] ✅ Connection string tested locally
- [ ] ✅ Prisma schema uses \postgresql\ provider
- [ ] ✅ Local database migrated successfully

**Test:**
\\\ash
# Update .env with your PostgreSQL connection string
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Verify connection
npx prisma studio
\\\

---

## 🔑 Environment Variables

- [ ] ✅ DATABASE_URL obtained from database provider
- [ ] ✅ NEXTAUTH_SECRET generated (\openssl rand -base64 32\)
- [ ] ✅ NEXTAUTH_URL set to production URL (update after first deploy)
- [ ] ✅ All variables tested locally in \.env\
- [ ] ✅ \.env.example\ updated with all required variables (no values)

**Test:**
\\\ash
# Check .env has all variables
cat .env

# Test the app locally
npm run dev
# Visit http://localhost:3000
# Try logging in/creating account
\\\

---

## 📦 Dependencies & Build

- [ ] ✅ All dependencies installed: \
pm install\
- [ ] ✅ No critical vulnerabilities: \
pm audit\
- [ ] ✅ Build works locally: \
pm run build\
- [ ] ✅ Lint passes: \
pm run lint\ (or skip with warnings)
- [ ] ✅ Worker runs: \
pm run worker\

**Test:**
\\\ash
# Install dependencies
npm install

# Check for vulnerabilities
npm audit

# Test build
npm run build

# Test worker syntax
npm run worker
# (Ctrl+C after it starts)
\\\

---

## 📄 Documentation

- [ ] ✅ README.md has proper warnings and disclaimers
- [ ] ✅ DEPLOYMENT.md exists with deployment instructions
- [ ] ✅ ENVIRONMENT_VARIABLES.md created
- [ ] ✅ .env.example created
- [ ] ✅ All sensitive documentation removed (or in .gitignore)

---

## 🌐 Vercel Deployment (Dashboard)

### Before First Deploy:

- [ ] ✅ GitHub repository created
- [ ] ✅ Code pushed to GitHub
- [ ] ✅ Vercel account created
- [ ] ✅ Vercel connected to GitHub

### Vercel Configuration:

- [ ] ✅ \ercel.json\ exists in project root
- [ ] ✅ \.vercelignore\ exists
- [ ] ✅ worker.ts excluded from Vercel (in .vercelignore)

### Vercel Environment Variables:

Add these in Vercel Dashboard → Project Settings → Environment Variables:

- [ ] ✅ DATABASE_URL (from Neon/Supabase)
- [ ] ✅ NEXTAUTH_SECRET (generated secret)
- [ ] ✅ NEXTAUTH_URL (start with \http://localhost:3000\, update after deploy)

**Important:** Set scope to "Production, Preview, Development" for all variables.

### After First Deploy:

- [ ] ✅ Get Vercel URL (e.g., \https://your-app.vercel.app\)
- [ ] ✅ Update NEXTAUTH_URL in Vercel to your actual URL
- [ ] ✅ Redeploy (or wait for auto-deploy)
- [ ] ✅ Test login/signup works on production

---

## 🤖 Worker Deployment (Railway/Render)

### Choose Platform:

- [ ] Railway (easier, \$5/month\)
- [ ] Render (similar, free tier limited)
- [ ] VPS (more control, more setup)

### Configuration Files:

- [ ] ✅ \ailway.json\ exists (for Railway)
- [ ] ✅ \Procfile\ exists (for Railway/Render)
- [ ] ✅ \ender.yaml\ exists (for Render)

### Worker Environment Variables:

Add in Railway/Render dashboard:

- [ ] ✅ DATABASE_URL (same as Vercel)
- [ ] ✅ NODE_ENV=production (optional)

**Note:** Worker doesn't need NEXTAUTH variables

### After Deploy:

- [ ] ✅ Worker starts successfully (check logs)
- [ ] ✅ Playwright/Chromium installs (check build logs)
- [ ] ✅ Database connection works (check logs for "Found X active users")
- [ ] ✅ No errors in first 5 minutes

---

## 🧪 Testing

### Local Testing:

- [ ] ✅ Dashboard loads: \
pm run dev\
- [ ] ✅ Can create account
- [ ] ✅ Can login
- [ ] ✅ Can add keywords
- [ ] ✅ Can add comments
- [ ] ✅ Can update settings
- [ ] ✅ Worker runs: \
pm run worker\

### Production Testing (After Deploy):

- [ ] ✅ Visit Vercel URL
- [ ] ✅ Dashboard loads
- [ ] ✅ Can create account
- [ ] ✅ Can login
- [ ] ✅ All pages work
- [ ] ✅ Settings save
- [ ] ✅ Worker is running (check Railway/Render logs)
- [ ] ✅ Database is shared (add keyword in dashboard, check worker logs)

---

## 🚀 Deployment Steps

### 1. Push to GitHub

\\\ash
# Initialize git (if not already)
git init

# Add all files
git add .

# Check what's being committed
git status

# Commit
git commit -m "Production-ready LinkedIn automation with safety features"

# Add remote
git remote add origin https://github.com/yourusername/your-repo.git

# Push
git push -u origin main
\\\

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
5. Deploy
6. Get your URL
7. Update NEXTAUTH_URL to your actual URL
8. Redeploy (automatic or manual)

### 3. Deploy Worker to Railway

\\\ash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variable
railway variables set DATABASE_URL="your-postgresql-url"

# Deploy
railway up
\\\

Or use Railway dashboard:
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repository
4. Add DATABASE_URL environment variable
5. Deploy

---

## ⚠️ Post-Deployment Safety

### Critical Safety Measures:

- [ ] ✅ Use BURNER LinkedIn account (not your main account)
- [ ] ✅ Set daily comment limit to 2-3 (in dashboard settings)
- [ ] ✅ Set min delay to 60 minutes (in dashboard settings)
- [ ] ✅ Monitor LinkedIn account daily for warnings
- [ ] ✅ Check worker logs daily
- [ ] ✅ Be prepared to stop if issues appear

### Monitoring:

- [ ] ✅ Check Vercel deployment logs
- [ ] ✅ Check Railway/Render worker logs
- [ ] ✅ Check database logs (in dashboard)
- [ ] ✅ Monitor LinkedIn account health

### If You See Warnings:

- [ ] ⚠️ Stop worker immediately
- [ ] ⚠️ Pause for 7-14 days
- [ ] ⚠️ Reduce frequency before restarting
- [ ] ⚠️ Consider using different account

---

## 📊 Success Criteria

Your deployment is successful when:

- ✅ Dashboard is live and accessible
- ✅ Can login/signup
- ✅ Can configure settings
- ✅ Worker is running (check logs)
- ✅ Worker connects to database
- ✅ Worker finds posts (check logs)
- ✅ Comments are posting successfully
- ✅ Logs appear in dashboard
- ✅ No errors in last hour

---

## 🐛 Common Issues

### "Build failed on Vercel"
- Check build logs for errors
- Ensure DATABASE_URL is set
- Try: \
pm run build\ locally first

### "Worker won't start on Railway"
- Check if Playwright installed (build logs)
- Verify DATABASE_URL is set
- Check memory limit (need 512MB-1GB)

### "Database connection failed"
- Verify connection string format
- Check \?sslmode=require\ is at end
- Test with: \
px prisma db push\

### "NextAuth error"
- Ensure NEXTAUTH_URL matches actual domain
- Use \https://\ for production
- Check NEXTAUTH_SECRET is set

---

## 🎉 Final Checklist

Before going live:

- [ ] ✅ All security checks passed
- [ ] ✅ Database is production-ready (PostgreSQL)
- [ ] ✅ All environment variables set
- [ ] ✅ Dashboard deployed to Vercel
- [ ] ✅ Worker deployed to Railway/Render
- [ ] ✅ Both connect to same database
- [ ] ✅ Testing completed
- [ ] ✅ Using burner LinkedIn account
- [ ] ✅ Safety limits configured (2-3 comments/day max)
- [ ] ✅ Monitoring plan in place
- [ ] ✅ Prepared for potential bans

---

**You're ready to deploy! 🚀**

Remember:
- Start slow (1-2 comments/day)
- Monitor closely
- Use burner accounts only
- Stop immediately if warnings appear

Good luck!
