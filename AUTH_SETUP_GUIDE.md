# 🔐 Gmail OAuth Authentication Setup Guide

## ✅ What's Been Implemented

Your authentication system has been completely redesigned with **secure Gmail-only OAuth authentication** plus session persistence.

---

## 🎯 Features Implemented

### 1. **Gmail-Only Authentication** ✅
- Users can only register/login with **Gmail accounts**
- Secure OAuth 2.0 flow via Google
- No more insecure password-based registration
- Automatic email verification through Google

### 2. **Session Persistence (Remember Me)** ✅
- 30-day session duration
- Users stay logged in automatically
- Secure database-backed sessions
- Automatic redirect if already authenticated

### 3. **Redesigned Login Page** ✅
- Professional Google Sign-In button with official Google colors
- Clean "Sign in with Google" / "Sign up with Google" flow
- Legacy email/password support for existing users
- Matches dashboard branding perfectly

### 4. **Backward Compatibility** ✅
- Existing email/password accounts still work
- Dual authentication system (NextAuth + Legacy JWT)
- Smooth migration path for existing users

---

## 🚀 Setup Instructions

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google+ API**
4. Go to **APIs & Services > Credentials**
5. Click **Create Credentials > OAuth 2.0 Client ID**
6. Configure OAuth consent screen:
   - User Type: External
   - App name: Nexora LinkedIn Automation
   - Support email: Your email
   - Authorized domains: Your domain (e.g., yourdomain.com)
7. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: Nexora Web Client
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)
8. Copy **Client ID** and **Client Secret**

---

### Step 2: Update Environment Variables

Add these to your `.env` file:

```bash
# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"  # Change to production URL when deploying
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

### Step 3: Run Database Migration

The schema has been updated to support NextAuth. Generate Prisma client:

```bash
npx prisma generate
npx prisma db push
```

---

### Step 4: Test Authentication

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/login`

3. Click **"Sign in with Google"**

4. Select your Gmail account

5. You'll be redirected to the dashboard

6. **Session persists** - close browser and reopen, you'll still be logged in!

---

## 🎨 UI/UX Improvements

### Login Page Features:

#### **Primary Method: Google Sign-In**
- Large, prominent Google button with official branding
- "Secure Gmail-only authentication" badge
- Clear messaging about security

#### **Visual Design:**
- Google logo with official colors (#4285F4, #34A853, #FBBC05, #EA4335)
- Professional hover effects
- Loading states
- Matches dashboard theme perfectly

#### **Divider:**
- "Or continue with email" separator
- Legacy email/password form below for existing users

---

## 🔒 Security Features

### 1. **Gmail-Only Restriction**
```typescript
async signIn({ user, account, profile }) {
  // Only allow Gmail accounts
  if (user.email && !user.email.endsWith('@gmail.com')) {
    return false; // Reject non-Gmail accounts
  }
  return true;
}
```

### 2. **30-Day Session Persistence**
```typescript
session: {
  strategy: 'database',
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

### 3. **Auto-Settings Creation**
New users automatically get default settings created on first login.

### 4. **Backward Compatibility**
The `getUserFromToken()` function checks both:
- NextAuth sessions (preferred)
- Legacy JWT tokens (fallback)

---

## 📊 Database Schema Changes

### New Tables Added:

#### **Account** (OAuth connections)
- Stores Google OAuth tokens
- Refresh tokens for automatic renewal
- Provider information

#### **Session** (Database-backed sessions)
- Secure session tokens
- 30-day expiry
- User association

#### **VerificationToken** (Email verification)
- For future email verification flows

### **User Model Updated:**
- `password` is now optional (OAuth users don't need passwords)
- `name` and `image` fields added for Google profile info
- `emailVerified` for verification tracking

---

## 🔄 Authentication Flow

### New User (Gmail):
1. Click "Sign in with Google"
2. Authenticate with Google
3. Only Gmail accounts accepted
4. User created in database
5. Default settings auto-created
6. Session created (30 days)
7. Redirected to dashboard

### Returning User (Gmail):
1. Session persists automatically
2. Auto-redirect to dashboard if logged in
3. No need to re-authenticate

### Legacy User (Email/Password):
1. Can still use email/password form
2. Sessions work the same way
3. Can link Google account later

---

## 🧪 Testing Checklist

- [ ] Google Sign-In button appears on login page
- [ ] Clicking Google button opens OAuth popup
- [ ] Non-Gmail accounts are rejected with error
- [ ] Gmail accounts can successfully authenticate
- [ ] User is redirected to dashboard after login
- [ ] Session persists after closing browser
- [ ] Auto-redirect to dashboard if already logged in
- [ ] Legacy email/password login still works
- [ ] Default settings created for new users

---

## 🚀 Deployment Notes

### Environment Variables for Production:

```bash
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
DATABASE_URL="your-production-database-url"
```

### Google OAuth Redirect URI:
Make sure to add production redirect URI:
```
https://yourdomain.com/api/auth/callback/google
```

---

## 📝 Files Modified/Created

### Created:
- `app/api/auth/[...nextauth]/route.ts` - NextAuth configuration
- `app/providers.tsx` - Session provider wrapper
- `AUTH_SETUP_GUIDE.md` - This guide

### Modified:
- `app/login/page.tsx` - Added Google Sign-In button
- `app/layout.tsx` - Added SessionProvider
- `lib/auth.ts` - Dual auth support (NextAuth + JWT)
- `prisma/schema.prisma` - Added NextAuth models
- `.env.example` - Added Google OAuth variables

---

## 🎯 Benefits

✅ **More Secure** - OAuth 2.0 instead of passwords  
✅ **Better UX** - One-click Google Sign-In  
✅ **Session Persistence** - Users stay logged in (30 days)  
✅ **Gmail-Only** - Only verified Gmail accounts allowed  
✅ **Professional** - Matches dashboard design  
✅ **Backward Compatible** - Existing users still work  

---

## 🆘 Troubleshooting

### "Sign in failed" error
- Check Google OAuth credentials are correct
- Verify redirect URI is added in Google Console
- Make sure email ends with @gmail.com

### Session not persisting
- Check DATABASE_URL is correct
- Verify NEXTAUTH_SECRET is set
- Clear browser cookies and try again

### Database errors
- Run `npx prisma generate`
- Run `npx prisma db push`
- Check database connection

---

## ✨ Next Steps

1. ✅ Get Google OAuth credentials
2. ✅ Update .env with credentials
3. ✅ Run database migration
4. ✅ Test authentication flow
5. ✅ Deploy to production

**Your authentication system is now secure, professional, and user-friendly!** 🎉
