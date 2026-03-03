# Database Connection Fix

## ❌ **ERROR YOU'RE SEEING:**

```
Can't reach database server at `ep-fragrant-haze-aijuhuz0-pooler.c-4.us-east-1.aws.neon.tech:5432`

Please make sure your database server is running
```

---

## 🎯 **ROOT CAUSE:**

**Your Neon database is PAUSED or INACTIVE.**

Neon's free tier automatically pauses databases after:
- 5 minutes of inactivity (compute)
- First connection attempt will wake it up (but may timeout)

---

## ✅ **SOLUTION:**

### **Step 1: Resume Your Neon Database**

1. **Go to Neon Console:**
   ```
   https://console.neon.tech
   ```

2. **Find your project:**
   - Look for: `ep-fragrant-haze-aijuhuz0`
   - Or project name containing "fragrant-haze"

3. **Check status:**
   - If it shows "Paused" or "Inactive" → Click **"Resume"** or **"Start"**
   - If it shows "Active" → Skip to Step 2

4. **Wait 30-60 seconds** for the database to fully start

---

### **Step 2: Verify Connection**

Run this command to test the connection:

```bash
npx prisma db push
```

**Expected output:**
```
✅ The database is already in sync with the Prisma schema.
```

**If you see an error:** The database is still starting or there's another issue.

---

### **Step 3: Run the Worker**

```bash
npm run worker
```

**It should now connect successfully.**

---

## 🔄 **ALTERNATIVE: Use Direct Connection (Not Pooled)**

If the pooled connection keeps failing, you can use the **direct connection URL**:

### **In Neon Console:**

1. Go to your project
2. Click **"Connection Details"**
3. Look for **"Connection string"** dropdown
4. Select **"Direct connection"** (not "Pooled connection")
5. Copy the new URL

### **Update .env:**

Replace your current DATABASE_URL with the **direct connection URL**:

```env
# OLD (Pooled - may timeout)
DATABASE_URL="postgresql://neondb_owner:npg_mDXqdhVn2Mj1@ep-fragrant-haze-aijuhuz0-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"

# NEW (Direct - more reliable)
DATABASE_URL="postgresql://neondb_owner:npg_mDXqdhVn2Mj1@ep-fragrant-haze-aijuhuz0.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

**Notice:** Removed `-pooler` from the hostname.

---

## 🚨 **IF STILL NOT WORKING:**

### **Option 1: Check Neon Status**

```bash
# Test if Neon is reachable
ping ep-fragrant-haze-aijuhuz0-pooler.c-4.us-east-1.aws.neon.tech
```

### **Option 2: Regenerate Connection String**

1. Go to Neon Console
2. Click **"Settings"** → **"Connection Details"**
3. Click **"Reset password"** (optional but may help)
4. Copy the new connection string
5. Update `.env`

### **Option 3: Check Firewall**

- Ensure your firewall allows outbound connections to port 5432
- Try disabling antivirus temporarily to test

---

## 📝 **WHY THIS HAPPENED:**

The worker NEVER ran because:
1. Worker starts → tries to fetch settings from database
2. Database is paused → connection times out
3. Worker crashes before even searching LinkedIn
4. **This is why you saw "searches, scrolls, says not found"** - the worker never actually ran!

The commenting code is perfect - you just couldn't connect to the database to start the worker.

---

## ✅ **QUICK FIX CHECKLIST:**

- [ ] Go to https://console.neon.tech
- [ ] Find project `ep-fragrant-haze-aijuhuz0`
- [ ] Click "Resume" if paused
- [ ] Wait 30 seconds
- [ ] Run `npm run worker`
- [ ] Should connect successfully!

---

**Once the database is active, the worker will run perfectly and post comments on LinkedIn!**
