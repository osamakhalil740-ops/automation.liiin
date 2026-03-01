# 🔐 Google OAuth Setup - Step-by-Step Tutorial

## ⚠️ Important Notes

1. **The redirect URI is NOT a page you visit directly** - It's an internal endpoint that Google uses to send authentication data back to your app
2. **You need OAuth credentials for BOTH local development AND Vercel production**
3. **This tutorial will walk you through everything step-by-step**

---

## 📋 What You'll Get

- Google Client ID
- Google Client Secret
- Properly configured redirect URIs for both:
  - Local development (`http://localhost:3000`)
  - Vercel production (your Vercel URL)

---

## 🚀 Step-by-Step Instructions

### **Step 1: Go to Google Cloud Console**

1. Open your browser and go to: **https://console.cloud.google.com/**
2. Sign in with your Gmail account (any Gmail account works)

---

### **Step 2: Create a New Project**

1. Click the **project dropdown** at the top (next to "Google Cloud")
2. Click **"New Project"** in the top-right of the popup
3. Enter project details:
   - **Project Name:** `Nexora LinkedIn Automation` (or any name you like)
   - **Organization:** Leave as "No organization"
4. Click **"Create"**
5. Wait ~30 seconds for the project to be created
6. Click **"Select Project"** when it appears

---

### **Step 3: Enable Required APIs**

1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. In the search box, type: **"Google+ API"**
3. Click on **"Google+ API"** from results
4. Click the blue **"Enable"** button
5. Wait for it to enable (~10 seconds)

---

### **Step 4: Configure OAuth Consent Screen**

1. In the left sidebar, click **"OAuth consent screen"**
2. Select **"External"** (this allows any Gmail user to sign in)
3. Click **"Create"**

4. **Fill out the OAuth consent screen:**

   **App Information:**
   - **App name:** `Nexora LinkedIn Automation`
   - **User support email:** (Select your Gmail from dropdown)
   - **App logo:** (Optional - skip for now)

   **App domain (all optional - skip for now):**
   - Leave blank

   **Authorized domains:**
   - Click **"+ Add Domain"**
   - If your Vercel URL is `https://your-app.vercel.app`, enter: `vercel.app`
   - Click outside the field to save

   **Developer contact information:**
   - **Email addresses:** Enter your Gmail address

5. Click **"Save and Continue"**

6. **Scopes page:**
   - Click **"Save and Continue"** (no scopes needed for basic login)

7. **Test users page:**
   - Click **"+ Add Users"**
   - Add your Gmail address (and any other test emails)
   - Click **"Add"**
   - Click **"Save and Continue"**

8. **Summary page:**
   - Click **"Back to Dashboard"**

---

### **Step 5: Create OAuth 2.0 Credentials**

1. In the left sidebar, click **"Credentials"**
2. Click **"+ Create Credentials"** at the top
3. Select **"OAuth client ID"**

4. **Configure the OAuth client:**
   
   **Application type:**
   - Select **"Web application"**

   **Name:**
   - Enter: `Nexora Web Client`

   **Authorized JavaScript origins:**
   - Click **"+ Add URI"**
   - Add: `http://localhost:3000`
   - Click **"+ Add URI"** again
   - Add: `https://your-app.vercel.app` (replace with YOUR actual Vercel URL)
   
   **Authorized redirect URIs:**
   - Click **"+ Add URI"**
   - Add: `http://localhost:3000/api/auth/callback/google`
   - Click **"+ Add URI"** again  
   - Add: `https://your-app.vercel.app/api/auth/callback/google` (replace with YOUR actual Vercel URL)

5. Click **"Create"**

---

### **Step 6: Copy Your Credentials**

1. A popup will appear with your credentials:
   - **Client ID:** Looks like `123456789-abcdefg.apps.googleusercontent.com`
   - **Client Secret:** Looks like `GOCSPX-abcdefghijklmnop`

2. **IMPORTANT:** Copy both of these - you'll need them next!

3. You can also view them later by:
   - Going to **"Credentials"** in the left sidebar
   - Clicking on **"Nexora Web Client"** under "OAuth 2.0 Client IDs"

---

## 🔧 Configuration

### **For Local Development (.env file):**

Create/update your `.env` file in your project root:

```bash
# Database
DATABASE_URL="your-database-url"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="paste-your-client-id-here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="paste-your-client-secret-here"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-this-with-command-below"
NEXTAUTH_URL="http://localhost:3000"

# JWT Secret (for legacy auth)
JWT_SECRET="your-jwt-secret"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Copy the output and paste it as your `NEXTAUTH_SECRET` value.

---

### **For Vercel Deployment:**

1. Go to your Vercel dashboard: **https://vercel.com/dashboard**
2. Click on your project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in the left sidebar
5. Add these variables (click "+ Add New"):

   | Name | Value |
   |------|-------|
   | `GOOGLE_CLIENT_ID` | (Your Client ID) |
   | `GOOGLE_CLIENT_SECRET` | (Your Client Secret) |
   | `NEXTAUTH_SECRET` | (Generated secret from above) |
   | `NEXTAUTH_URL` | `https://your-app.vercel.app` |
   | `DATABASE_URL` | (Your database connection string) |
   | `JWT_SECRET` | (Your JWT secret) |

6. Click **"Save"** for each variable

7. **Redeploy your app:**
   - Go to **"Deployments"** tab
   - Click **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - Wait for deployment to complete (~2 minutes)

---

## 🧪 Testing

### **Test Locally:**

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open: `http://localhost:3000/login`

3. Click **"Sign in with Google"**

4. You should see:
   - Google OAuth popup
   - Select your Gmail account
   - Grant permissions
   - Redirect back to your dashboard

5. ✅ **Success!** You're now logged in

---

### **Test on Vercel:**

1. Open your Vercel URL: `https://your-app.vercel.app/login`

2. Click **"Sign in with Google"**

3. You should see:
   - Google OAuth popup
   - Select your Gmail account
   - Grant permissions
   - Redirect back to dashboard

4. ✅ **Success!** You're now logged in on production

---

## 🔍 Finding Your Vercel URL

If you don't know your Vercel URL:

1. Go to: **https://vercel.com/dashboard**
2. Click on your project
3. You'll see your URL at the top (e.g., `your-app.vercel.app`)
4. Or go to the **"Domains"** tab to see all domains

---

## ❌ Common Errors & Solutions

### **Error: "redirect_uri_mismatch"**

**Cause:** The redirect URI in Google Console doesn't match your app

**Solution:**
1. Check your Vercel URL is correct (no trailing slash)
2. Make sure you added BOTH:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-actual-vercel-url.vercel.app/api/auth/callback/google`
3. Wait 5 minutes after adding URIs (Google needs time to update)

---

### **Error: "Access blocked: This app's request is invalid"**

**Cause:** OAuth consent screen not configured properly

**Solution:**
1. Go back to OAuth consent screen
2. Make sure you added your email as a test user
3. Make sure app status shows "Testing"

---

### **Error: "Sign in failed"**

**Cause:** Environment variables not set correctly

**Solution:**
1. Check `.env` file has all variables
2. Restart dev server: `npm run dev`
3. For Vercel: Check environment variables are set in Vercel dashboard
4. Redeploy on Vercel

---

### **Error: "This account uses Google Sign-In"**

**Cause:** You're trying to login with email/password for an OAuth account

**Solution:**
- Use the "Sign in with Google" button instead

---

## 📝 Quick Checklist

- [ ] Created Google Cloud project
- [ ] Enabled Google+ API
- [ ] Configured OAuth consent screen
- [ ] Added test users
- [ ] Created OAuth 2.0 credentials
- [ ] Added both redirect URIs (localhost + Vercel)
- [ ] Copied Client ID and Client Secret
- [ ] Updated `.env` file locally
- [ ] Generated NEXTAUTH_SECRET
- [ ] Added environment variables to Vercel
- [ ] Redeployed on Vercel
- [ ] Tested login locally
- [ ] Tested login on Vercel

---

## 🎯 Summary

**What the redirect URI does:**
- It's an **internal endpoint** that Google calls after authentication
- You never visit it directly in your browser
- It's how Google sends the authentication token back to your app

**Your credentials will work for:**
- ✅ Local development: `http://localhost:3000`
- ✅ Vercel production: `https://your-app.vercel.app`

**Security:**
- Only Gmail accounts can register/login
- Sessions last 30 days
- All data encrypted and secure

---

## 🆘 Still Need Help?

If you're stuck:

1. **Check the redirect URIs** - Most common issue
2. **Wait 5 minutes** after making changes in Google Console
3. **Restart your dev server** after updating `.env`
4. **Redeploy on Vercel** after adding environment variables
5. **Check browser console** for error messages (F12)

---

## ✅ You're Done!

Once you complete these steps:
- Users can sign in with their Gmail accounts
- Sessions persist for 30 days
- Works on both local and production
- Secure and professional authentication

**Ready to test? Start with local development first, then move to Vercel!** 🚀
