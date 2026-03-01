# 🚀 Vercel Environment Variables Setup

## 📍 Finding Your Vercel URL

### Method 1: Vercel Dashboard
1. Go to: **https://vercel.com/dashboard**
2. Click on your project name
3. Your URL is displayed at the top of the page
4. Example formats:
   - `your-project.vercel.app`
   - `your-project-username.vercel.app`
   - Or a custom domain if you added one

### Method 2: Deployments Tab
1. In your project dashboard
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Copy the URL from the top

### Method 3: Domains Tab
1. In your project dashboard
2. Click **"Settings"** → **"Domains"**
3. You'll see all domains associated with your project
4. Use the `.vercel.app` domain

---

## 🔧 Adding Environment Variables to Vercel

### Step-by-Step:

1. **Navigate to Settings:**
   - Go to https://vercel.com/dashboard
   - Click your project
   - Click **"Settings"** tab
   - Click **"Environment Variables"** in left sidebar

2. **Add Each Variable:**

   Click **"+ Add New"** and add these one by one:

   #### Variable 1: GOOGLE_CLIENT_ID
   ```
   Name: GOOGLE_CLIENT_ID
   Value: [Paste your Client ID from Google Console]
   Environment: Production, Preview, Development (check all 3)
   ```

   #### Variable 2: GOOGLE_CLIENT_SECRET
   ```
   Name: GOOGLE_CLIENT_SECRET
   Value: [Paste your Client Secret from Google Console]
   Environment: Production, Preview, Development (check all 3)
   ```

   #### Variable 3: NEXTAUTH_SECRET
   ```
   Name: NEXTAUTH_SECRET
   Value: [Generate with: openssl rand -base64 32]
   Environment: Production, Preview, Development (check all 3)
   ```

   #### Variable 4: NEXTAUTH_URL
   ```
   Name: NEXTAUTH_URL
   Value: https://your-app.vercel.app
   Environment: Production (check only Production)
   ```

   #### Variable 5: DATABASE_URL
   ```
   Name: DATABASE_URL
   Value: [Your Neon/Postgres connection string]
   Environment: Production, Preview, Development (check all 3)
   ```

   #### Variable 6: JWT_SECRET
   ```
   Name: JWT_SECRET
   Value: [Your JWT secret - can be any long random string]
   Environment: Production, Preview, Development (check all 3)
   ```

3. **Save Each Variable:**
   - Click **"Save"** after adding each one
   - Vercel will confirm it's saved

---

## 🔄 Redeploy Your Application

**IMPORTANT:** After adding environment variables, you MUST redeploy!

### Option 1: Redeploy Latest Deployment
1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again
6. Wait 1-2 minutes for deployment to complete

### Option 2: Push New Commit
1. Make any small change to your code (or just push)
2. Vercel will auto-deploy
3. New deployment will use the environment variables

### Option 3: Trigger from CLI
```bash
vercel --prod
```

---

## ✅ Verify Environment Variables Are Set

1. Go to **"Settings"** → **"Environment Variables"**
2. You should see all 6 variables listed
3. Each should show which environments they're in (Production/Preview/Development)

---

## 🧪 Test Your Deployment

1. **Wait for deployment to complete:**
   - Green checkmark in Deployments tab
   - Status: "Ready"

2. **Visit your Vercel URL:**
   - Go to: `https://your-app.vercel.app/login`

3. **Test Google Sign-In:**
   - Click **"Sign in with Google"**
   - Select your Gmail account
   - Should redirect to dashboard

4. **Check for errors:**
   - If sign-in fails, check browser console (F12)
   - Common issues:
     - Environment variables not set
     - Wrong NEXTAUTH_URL
     - Redirect URI mismatch in Google Console

---

## 🔍 Troubleshooting

### "redirect_uri_mismatch" Error

**Problem:** Google redirect URI doesn't match

**Solution:**
1. Check your Vercel URL is correct (no typos)
2. In Google Console, make sure you added:
   ```
   https://your-exact-vercel-url.vercel.app/api/auth/callback/google
   ```
3. NO trailing slash at the end!
4. Wait 5 minutes for Google to update

---

### "Configuration error" or "Server error"

**Problem:** Environment variables not set or incorrect

**Solution:**
1. Check all 6 environment variables are added in Vercel
2. Make sure they're set for "Production" environment
3. Verify NEXTAUTH_URL matches your Vercel URL exactly
4. Redeploy the application
5. Wait for deployment to complete

---

### Database Connection Error

**Problem:** DATABASE_URL not set or incorrect

**Solution:**
1. Get your database URL from Neon/Supabase
2. Make sure it includes `?sslmode=require` at the end
3. Example format:
   ```
   postgresql://user:pass@host.region.neon.tech/dbname?sslmode=require
   ```
4. Add to Vercel environment variables
5. Redeploy

---

### "This app's request is invalid"

**Problem:** OAuth consent screen not configured

**Solution:**
1. Go to Google Console → OAuth consent screen
2. Add your email as a test user
3. Make sure app domain includes `vercel.app`
4. Wait 5 minutes
5. Try again

---

## 📋 Quick Checklist

**Before deploying:**
- [ ] Know your Vercel URL
- [ ] Have Google Client ID and Secret ready
- [ ] Generated NEXTAUTH_SECRET (using openssl)
- [ ] Have DATABASE_URL ready

**In Vercel:**
- [ ] Added all 6 environment variables
- [ ] Selected correct environments for each
- [ ] Saved each variable
- [ ] Triggered a redeploy
- [ ] Deployment completed successfully

**In Google Console:**
- [ ] Added Vercel redirect URI
- [ ] Added vercel.app as authorized domain
- [ ] Added test users
- [ ] Waited 5 minutes for changes to propagate

**Testing:**
- [ ] Visited Vercel URL/login
- [ ] Clicked "Sign in with Google"
- [ ] Successfully authenticated
- [ ] Redirected to dashboard
- [ ] Session persists after page reload

---

## 🎯 Environment Variables Summary

| Variable | Value | Environment |
|----------|-------|-------------|
| `GOOGLE_CLIENT_ID` | From Google Console | All |
| `GOOGLE_CLIENT_SECRET` | From Google Console | All |
| `NEXTAUTH_SECRET` | Generated random string | All |
| `NEXTAUTH_URL` | Your Vercel URL | Production only |
| `DATABASE_URL` | Your database connection | All |
| `JWT_SECRET` | Random string | All |

---

## 💡 Pro Tips

1. **Use all 3 environments** (Production, Preview, Development) for most variables
2. **Only use Production** for NEXTAUTH_URL (different URLs for preview branches)
3. **Never commit** environment variables to Git
4. **Generate strong secrets** using `openssl rand -base64 32`
5. **Wait 5 minutes** after changing Google Console settings
6. **Always redeploy** after adding/changing environment variables

---

## ✅ You're Ready!

Once all environment variables are set and redeployed:
- Google Sign-In will work on production
- Users can authenticate securely
- Sessions persist for 30 days
- Everything is encrypted and secure

**Next:** Test your deployment and enjoy secure Gmail authentication! 🎉
