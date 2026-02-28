# 🗄️ STEP 1: Set Up Neon PostgreSQL Database (2 minutes)

## Instructions:

### 1. Go to Neon Website
Open your browser and go to: **https://neon.tech**

### 2. Sign Up (Free Account)
- Click **"Sign Up"** in the top right
- Choose **"Sign up with GitHub"** (easiest) OR use email
- Complete the sign-up process

### 3. Create Your First Project
After signing in, you'll see the dashboard:

- Click **"Create a project"** or **"New Project"**
- Configure:
  - **Project name:** \linkedin-automation\ (or any name you prefer)
  - **Region:** Choose closest to you (e.g., US East, EU West, Asia)
  - **PostgreSQL version:** 16 (latest - default selection)
- Click **"Create Project"**

### 4. Get Your Connection String

After creating the project, you'll see the dashboard with connection details.

**Look for the "Connection Details" section**

You'll see something like:

\\\
Connection string:
postgresql://username:password@ep-cool-name-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
\\\

**IMPORTANT:** 
- This contains your database password
- Copy the ENTIRE string (starts with \postgresql://\)
- Keep it secure

### 5. Copy Your Connection String

Click the **"Copy"** button next to the connection string.

It should look like this:
\\\
postgresql://user:pass@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
\\\

---

## ✅ When You're Done:

Come back here and paste your connection string (I'll help you add it to the project).

**DO NOT share it publicly** - it contains your database password!

---

## Need Help?

If you get stuck, here are common issues:

**Q: Can't find the connection string?**
A: Look for "Connection Details" or "Connection String" on the project dashboard

**Q: Which connection string do I use?**
A: Use the one labeled "Connection string" or "URI" (starts with \postgresql://\)

**Q: Do I need a credit card?**
A: No! Neon free tier doesn't require a credit card

**Q: What if I already have a Neon account?**
A: Just create a new project, same process

---

Take your time! When you have your connection string, paste it here and I'll continue with the next steps.
