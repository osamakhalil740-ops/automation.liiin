# Deployment Helper Commands

## Quick Reference

### Generate NEXTAUTH_SECRET
# Run one of these commands to generate a secure secret:

# Option 1: OpenSSL (recommended)
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

### Test Database Connection
npx prisma db push

### Test Local Build
npm run build

### Deploy to Railway
railway login
railway init
railway variables set DATABASE_URL="your-postgresql-url-here"
railway up

### Check Deployment Status

# Vercel
vercel --prod

# Railway
railway status

### View Logs

# Railway
railway logs

# Or visit dashboards:
# Vercel: https://vercel.com/dashboard
# Railway: https://railway.app/dashboard
# Neon: https://console.neon.tech
