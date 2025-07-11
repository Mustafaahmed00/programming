# Deployment Guide

## 🚀 Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

### 3. Environment Variables Setup

**IMPORTANT**: You need to set these environment variables in Vercel:

1. Go to your project dashboard in Vercel
2. Click "Settings" → "Environment Variables"
3. Add these variables:

#### Required Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXTAUTH_SECRET` | `your-secret-key-here` | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your Vercel deployment URL |

#### How to Generate NEXTAUTH_SECRET:

```bash
# In your terminal:
openssl rand -base64 32
```

### 4. Update NEXTAUTH_URL

After deployment, update the `NEXTAUTH_URL` to your actual Vercel URL:
- Format: `https://your-app-name.vercel.app`
- Example: `https://competitive-programming-hub.vercel.app`

### 5. Redeploy

After setting environment variables:
1. Go to "Deployments" tab
2. Click "Redeploy" on your latest deployment

## 🔒 Security Notes

### What's NOT pushed to GitHub:
- ✅ `.env.local` (contains your secret keys)
- ✅ `/data/` directory (user data)
- ✅ `.next/` (build cache)
- ✅ `node_modules/` (dependencies)

### What IS pushed to GitHub:
- ✅ Source code
- ✅ Configuration files
- ✅ Package.json
- ✅ README files

## 🐛 Troubleshooting

### Authentication Issues:
1. **Check environment variables** in Vercel dashboard
2. **Verify NEXTAUTH_URL** matches your deployment URL
3. **Regenerate NEXTAUTH_SECRET** if needed

### Build Errors:
1. **Clear cache**: Delete `.next` folder locally
2. **Check dependencies**: Ensure all packages are in `package.json`
3. **Environment variables**: Verify all required vars are set

### File System Issues:
- **Note**: Vercel uses read-only file system in production
- **User data**: Will be reset on each deployment (demo only)
- **For production**: Use a database instead of file storage

## 📝 Local Development

To run locally:

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update .env.local with your values
NEXTAUTH_SECRET=your-local-secret
NEXTAUTH_URL=http://localhost:3000

# Run development server
npm run dev
```

## 🔄 Database Migration (Future)

For production use, consider:
- **PostgreSQL** with Vercel Postgres
- **MongoDB** with MongoDB Atlas
- **Supabase** for full-stack solution

Current implementation uses file storage (demo only). 