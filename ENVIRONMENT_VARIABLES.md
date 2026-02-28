# 🔐 Environment Variables Guide

This document explains all environment variables needed for deployment.

---

## Required Environment Variables

### 1. DATABASE_URL

**What it is:** PostgreSQL connection string

**Where to get it:**
- **Neon:** Dashboard → Connection Details → Copy connection string
- **Supabase:** Settings → Database → Connection string → URI
- **Railway:** PostgreSQL service → Variables tab → DATABASE_URL

**Format:**
\\\
postgresql://username:password@host.region.provider.com/dbname?sslmode=require
\\\

**Example:**
\\\
postgresql://user:pass123@ep-cool-cloud-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
\\\

**⚠️ IMPORTANT:** Keep this secret! It contains your database password.

**Where to add:**
- ✅ Local: \.env\ file
- ✅ Vercel: Project Settings → Environment Variables
- ✅ Railway: Service → Variables tab
- ✅ Render: Environment tab

---

### 2. NEXTAUTH_SECRET

**What it is:** Secret key for encrypting session tokens

**How to generate:**

**Option A: Using OpenSSL (recommended)**
\\\ash
openssl rand -base64 32
\\\

**Option B: Using Node.js**
\\\ash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
\\\

**Option C: Online generator**
- Visit: https://generate-secret.vercel.app/32

**Example output:**
\\\
Xk7pQ9vR2sT8uV1wY3zB5cD6eF7gH8iJ
\\\

**⚠️ IMPORTANT:** 
- Must be at least 32 characters
- Use different secrets for dev and production
- Never commit this to git

**Where to add:**
- ✅ Local: \.env\ file
- ✅ Vercel: Project Settings → Environment Variables
- ❌ Worker (Railway/Render): Not needed (worker doesn't use auth)

---

### 3. NEXTAUTH_URL

**What it is:** The URL where your app is deployed

**Local development:**
\\\
NEXTAUTH_URL="http://localhost:3000"
\\\

**Production (Vercel):**
\\\
NEXTAUTH_URL="https://your-app.vercel.app"
\\\

**⚠️ IMPORTANT:** 
- Use \https://\ for production (not \http://\)
- Update this after your first Vercel deployment
- Must match your actual domain

**Where to add:**
- ✅ Local: \.env\ file
- ✅ Vercel: Project Settings → Environment Variables
- ❌ Worker (Railway/Render): Not needed

---

## Optional Environment Variables

### 4. NODE_ENV

**What it is:** Tells Node.js if you're in development or production

**Values:**
- \development\ - for local development
- \production\ - for deployed environments

**Usually automatic but can be set:**
\\\
NODE_ENV="production"
\\\

---

## Environment Variables by Platform

### Local Development (.env file)

\\\env
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
NEXTAUTH_SECRET="your-32-char-secret-here"
NEXTAUTH_URL="http://localhost:3000"
\\\

### Vercel (Dashboard only)

Go to: Project Settings → Environment Variables → Add

\\\
DATABASE_URL = postgresql://user:pass@host/db?sslmode=require
NEXTAUTH_SECRET = your-production-secret-32-chars
NEXTAUTH_URL = https://your-app.vercel.app
\\\

**Scope:** Production, Preview, Development (check all three)

### Railway (Worker only)

Go to: Service → Variables tab → New Variable

\\\
DATABASE_URL = postgresql://user:pass@host/db?sslmode=require
\\\

**Note:** Worker doesn't need NEXTAUTH variables

### Render (Worker only)

Go to: Service → Environment tab → Add Environment Variable

\\\
DATABASE_URL = postgresql://user:pass@host/db?sslmode=require
NODE_ENV = production
\\\

---

## Security Best Practices

### ✅ DO:
- Use different secrets for dev and production
- Generate strong random secrets (32+ characters)
- Add all \.env*\ files to \.gitignore\
- Use environment variables, not hardcoded values
- Rotate secrets if exposed

### ❌ DON'T:
- Commit \.env\ to git
- Share secrets in Slack/email/Discord
- Use simple passwords like "password123"
- Reuse secrets across projects
- Include secrets in screenshots

---

## Troubleshooting

### "Invalid DATABASE_URL"
- ✅ Check format: \postgresql://...\
- ✅ Ensure \?sslmode=require\ is at the end
- ✅ No spaces in the URL
- ✅ Password is URL-encoded if it has special characters

### "NEXTAUTH_SECRET must be at least 32 characters"
- ✅ Generate a new secret with \openssl rand -base64 32\
- ✅ Copy the entire output (should be ~44 characters)

### "Database connection failed"
- ✅ Check if database is running (Neon doesn't sleep on free tier)
- ✅ Verify IP is whitelisted (usually not needed for Neon)
- ✅ Test connection with: \
px prisma db push\

### "NextAuth configuration error"
- ✅ Ensure NEXTAUTH_URL matches your actual domain
- ✅ Use \https://\ for production (not \http://\)
- ✅ No trailing slash in NEXTAUTH_URL

---

## Quick Setup Checklist

- [ ] Get PostgreSQL connection string from Neon/Supabase
- [ ] Generate NEXTAUTH_SECRET with \openssl rand -base64 32\
- [ ] Create local \.env\ file with all variables
- [ ] Test locally: \
pm run dev\
- [ ] Add variables to Vercel dashboard
- [ ] Add DATABASE_URL to Railway/Render
- [ ] Deploy and test
- [ ] Update NEXTAUTH_URL after first deployment
- [ ] Redeploy Vercel to pick up new URL

---

## Example: Complete Setup Flow

1. **Set up database:**
   \\\
   Go to neon.tech → Create project → Copy connection string
   \\\

2. **Generate secret:**
   \\\ash
   openssl rand -base64 32
   # Output: Xk7pQ9vR2sT8uV1wY3zB5cD6eF7gH8iJ
   \\\

3. **Create .env:**
   \\\env
   DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
   NEXTAUTH_SECRET="Xk7pQ9vR2sT8uV1wY3zB5cD6eF7gH8iJ"
   NEXTAUTH_URL="http://localhost:3000"
   \\\

4. **Test locally:**
   \\\ash
   npx prisma generate
   npx prisma db push
   npm run dev
   \\\

5. **Deploy to Vercel:**
   - Add all 3 variables in Vercel dashboard
   - Deploy
   - Get URL: \https://my-app.vercel.app\

6. **Update NEXTAUTH_URL:**
   - Change in Vercel to: \https://my-app.vercel.app\
   - Redeploy

7. **Deploy worker to Railway:**
   - Add DATABASE_URL only
   - Deploy

Done! 🎉

---

**Need help? Check DEPLOYMENT.md for detailed deployment instructions.**
