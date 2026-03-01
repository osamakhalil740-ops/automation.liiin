# 🧪 TESTING GUIDE - Step by Step

## Testing Order

### ✅ FIRST: Test Dashboard (No Worker Needed)
### ✅ SECOND: Test Worker (After Dashboard Works)

---

## PART 1: TEST DASHBOARD

### Step 1: Wait for Vercel
- Go to Vercel dashboard
- Check deployment status
- Wait until it says "Ready" (2-3 minutes)

### Step 2: Open Site
- Open **NEW incognito/private window**
- Go to: **https://automation-liiin-nfum.vercel.app/**

### Step 3: Create Account
- Click "Sign Up" or "Create Account"
- Enter email and password
- Click submit

### Step 4: Check If It Worked
**✅ Success:**
- Account created
- You see the dashboard
- No 401 error

**❌ Failed:**
- Still see 401 error
- Can't create account
- Tell me and I'll help fix

### Step 5: Explore Dashboard
You can now:
- ✅ Go to Settings
- ✅ Go to Keywords
- ✅ Go to Comments  
- ✅ Go to Logs
- ✅ Add and save data

**Note:** Automation won't run yet (that needs the worker)

---

## PART 2: TEST WORKER

**ONLY do this after dashboard works!**

### Step 1: Configure in Dashboard
1. Login to dashboard
2. Go to **Settings**
3. Add LinkedIn cookie (li_at)
4. Set delays (30-60 min)
5. Set daily limit (2-3)
6. Toggle "System Active" ON
7. Save

### Step 2: Add Data
1. Go to **Keywords** → Add keyword (e.g., "AI automation")
2. Go to **Comments** → Add 3-5 comment templates
3. Save

### Step 3: Run Worker
Open PowerShell:
```powershell
cd C:\Users\lenovo\Downloads\clonelink
npm run worker
```

### Step 4: Watch Console
You'll see:
- "Launching browser..."
- "Found 1 active user"
- "Searching for keyword..."
- "PREPARING TO COMMENT"
- "COMMENT POSTED!"

### Step 5: Check Dashboard
- Go to Logs page
- Refresh
- See new entries
- Click LinkedIn URLs to verify

---

## ❓ Quick Answers

**Q: Do I need to run worker to test the site?**
A: NO! Test dashboard first (no worker). Run worker later.

**Q: When do I run the worker?**
A: After dashboard works and you've added settings/keywords/comments.

**Q: Where does the worker run?**
A: On YOUR computer (PowerShell). Dashboard is online (Vercel).

**Q: Can client see it working?**
A: Yes! When you run worker, they see logs in their dashboard in real-time.

---

## 🎯 Start Here:

1. ✅ Add JWT_SECRET to Vercel (if not done)
2. ✅ Wait for redeploy
3. ✅ Test dashboard (incognito browser)
4. ✅ Create account
5. ✅ Tell me if it works!

Then we'll test the worker.
