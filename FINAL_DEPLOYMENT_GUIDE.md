# Final Deployment & GitHub Guide

**Complete, step-by-step instructions to deploy your Tom's Talented Tutoring app to GitHub and production.**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Setup (5 minutes)](#github-setup-5-minutes)
3. [Deploy to Vercel (Free)](#deploy-to-vercel-free)
4. [Deploy to Heroku (Free Tier)](#deploy-to-heroku-free-tier)
5. [GitHub Actions Setup](#github-actions-setup)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)
8. [Post-Deployment](#post-deployment)

---

## Prerequisites

Before you start, you need:

1. **GitHub Account** - https://github.com/signup
2. **Git Installed** - https://git-scm.com/download
3. **Node.js Installed** - https://nodejs.org (v18+)
4. **Stripe Account** (Optional) - https://stripe.com
5. **PayPal Account** (Optional) - https://paypal.com

---

## GitHub Setup (5 minutes)

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `toms-talented-tutoring-app`
3. Add description: "A music creation and tutoring app with AI tools"
4. Choose **Public** (so others can see it)
5. Check **"Add a .gitignore"** and select **Node**
6. Check **"Choose a license"** and select **MIT License**
7. Click **"Create repository"**

### Step 2: Get Your Repository URL

After creating, you'll see a page with your repository URL. It looks like:
```
https://github.com/YOUR-USERNAME/toms-talented-tutoring-app.git
```

Copy this URL — you'll need it in the next step.

### Step 3: Push Your Code to GitHub

Open Command Prompt (Windows) or Terminal (Mac/Linux) and run:

```bash
cd /home/ubuntu/toms-talented-tutoring-app

git init
git add .
git commit -m "Initial commit: Tom's Talented Tutoring app"
git remote add origin https://github.com/YOUR-USERNAME/toms-talented-tutoring-app.git
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

When prompted for authentication:
- **Option A**: Use your GitHub password (if enabled)
- **Option B**: Use a Personal Access Token (recommended)
  - Go to https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Check "repo" permission
  - Copy the token and paste it when prompted

### Step 4: Verify

Visit your repository: `https://github.com/YOUR-USERNAME/toms-talented-tutoring-app`

You should see all your code files. ✅

---

## Deploy to Vercel (Free)

Vercel is the easiest and fastest way to deploy. **Completely free.**

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### Step 2: Import Your Repository

1. Click **"New Project"**
2. Find your `toms-talented-tutoring-app` repository
3. Click **"Import"**

### Step 3: Configure Environment Variables

1. Scroll down to **"Environment Variables"**
2. Add each variable from your `.env` file:

| Variable | Value |
|----------|-------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Your Stripe public key |
| `PAYPAL_CLIENT_ID` | Your PayPal client ID |
| `PAYPAL_SECRET` | Your PayPal secret |
| `DATABASE_URL` | Your database URL |

3. Click **"Deploy"**

### Step 4: Wait for Deployment

Vercel will automatically:
- Build your app
- Run tests
- Deploy to production

You'll get a unique URL like: `https://toms-talented-tutoring-app.vercel.app`

### Step 5: Connect Your Domain (Optional)

To use your own domain:

1. Go to your Vercel project settings
2. Click **"Domains"**
3. Enter your domain name
4. Follow the DNS configuration instructions

---

## Deploy to Heroku (Free Tier)

Heroku offers a free tier with limited resources.

### Step 1: Create Heroku Account

1. Go to https://www.heroku.com
2. Click **"Sign up"**
3. Fill in your information
4. Verify your email

### Step 2: Install Heroku CLI

**Windows:**
1. Download from https://devcenter.heroku.com/articles/heroku-cli
2. Run the installer
3. Open Command Prompt and type: `heroku --version`

**Mac:**
```bash
brew tap heroku/brew && brew install heroku
```

**Linux:**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 3: Login to Heroku

```bash
heroku login
```

This will open a browser window. Click **"Log in"**.

### Step 4: Create Heroku App

```bash
cd /home/ubuntu/toms-talented-tutoring-app
heroku create toms-talented-tutoring-app
```

### Step 5: Set Environment Variables

```bash
heroku config:set STRIPE_SECRET_KEY=sk_test_...
heroku config:set STRIPE_PUBLISHABLE_KEY=pk_test_...
heroku config:set PAYPAL_CLIENT_ID=...
heroku config:set PAYPAL_SECRET=...
heroku config:set DATABASE_URL=postgresql://...
```

### Step 6: Deploy

```bash
git push heroku main
```

### Step 7: View Your App

```bash
heroku open
```

Your app will open in your browser at: `https://toms-talented-tutoring-app.herokuapp.com`

---

## GitHub Actions Setup

GitHub Actions automatically tests and deploys your code.

### Step 1: Workflows Are Already Configured

Your project includes two workflows:
- `.github/workflows/test.yml` - Runs tests
- `.github/workflows/deploy.yml` - Deploys to production

### Step 2: Add GitHub Secrets

1. Go to your repository settings: `https://github.com/YOUR-USERNAME/toms-talented-tutoring-app/settings`
2. Click **"Secrets and variables"** → **"Actions"**
3. Click **"New repository secret"**
4. Add each secret:

| Secret Name | Value |
|------------|-------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Your Stripe public key |
| `PAYPAL_CLIENT_ID` | Your PayPal client ID |
| `PAYPAL_SECRET` | Your PayPal secret |

### Step 3: View Workflow Runs

1. Go to your repository
2. Click the **"Actions"** tab
3. You'll see your workflows running automatically

### Step 4: Fix Any Failures

If a workflow fails:
1. Click on the failed workflow
2. Scroll down to see the error
3. Fix the error in your code
4. Push to GitHub
5. The workflow will run again automatically

---

## Environment Variables

### What Are Environment Variables?

Environment variables are secret values that your app needs but shouldn't be in your code.

### Where to Add Them

| Platform | Location |
|----------|----------|
| Local Development | `.env` file |
| Vercel | Project Settings → Environment Variables |
| Heroku | `heroku config:set` command |
| GitHub Actions | Settings → Secrets and variables → Actions |

### Required Variables

```env
# Stripe (get from https://stripe.com/dashboard)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# PayPal (get from https://developer.paypal.com)
PAYPAL_CLIENT_ID=...
PAYPAL_SECRET=...

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Jitsi Meet (optional, uses public instance by default)
JITSI_SERVER_URL=https://meet.jitsi
```

### Getting Your API Keys

**Stripe:**
1. Go to https://stripe.com/dashboard
2. Click **"Developers"** → **"API Keys"**
3. Copy your **Secret Key** and **Publishable Key**

**PayPal:**
1. Go to https://developer.paypal.com
2. Click **"Apps & Credentials"**
3. Copy your **Client ID** and **Secret**

---

## Troubleshooting

### Issue: "Git is not recognized"

**Solution:** Git isn't installed. Download from https://git-scm.com/download

### Issue: "Permission denied (publickey)"

**Solution:** You need to authenticate with GitHub. Use a Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Generate a new token
3. Use it as your password when Git asks

### Issue: "Deployment failed"

**Solution:** Check the logs:
- **Vercel:** Click "Deployments" tab and view logs
- **Heroku:** Run `heroku logs --tail`
- **GitHub Actions:** Click "Actions" tab and view workflow logs

### Issue: "Environment variables not working"

**Solution:** Make sure you:
1. Added variables to the correct platform
2. Used the exact variable names
3. Redeployed after adding variables
4. Restarted your app

### Issue: "Database connection failed"

**Solution:** Verify your `DATABASE_URL`:
```bash
# Test the connection
psql $DATABASE_URL
```

---

## Post-Deployment

### Step 1: Test Your App

1. Visit your deployed URL
2. Test all major features:
   - Create a project
   - Upload content
   - Make a payment
   - Join a video session

### Step 2: Set Up Monitoring

**Vercel:**
- Go to project settings
- Enable "Analytics"
- Monitor performance

**Heroku:**
```bash
heroku logs --tail
```

### Step 3: Set Up Backups

**Database Backups:**
```bash
# Heroku PostgreSQL
heroku pg:backups:schedule --at "02:00 UTC"

# Or manual backup
heroku pg:backups:capture
```

### Step 4: Configure Custom Domain

1. Buy a domain (GoDaddy, Namecheap, etc.)
2. Add it to your hosting platform
3. Update DNS records
4. Test that it works

### Step 5: Set Up Email Notifications

Configure alerts for:
- Deployment failures
- High error rates
- Performance issues

---

## Continuous Deployment

Every time you push to GitHub, your app automatically deploys!

### Workflow

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```
3. GitHub Actions runs tests
4. If tests pass, Vercel/Heroku automatically deploys
5. Your changes are live!

### Disable Auto-Deploy (Optional)

If you want to deploy manually:

**Vercel:**
1. Project Settings → Git
2. Disable "Automatic Deployments"

**Heroku:**
1. Remove GitHub integration
2. Deploy manually: `git push heroku main`

---

## Security Checklist

Before going live, verify:

- [ ] No API keys in code (use environment variables)
- [ ] `.env` file is in `.gitignore`
- [ ] HTTPS is enabled
- [ ] Database backups are configured
- [ ] Error logging is enabled
- [ ] Rate limiting is configured
- [ ] CORS is properly configured
- [ ] Authentication is secure

---

## Performance Optimization

### Reduce Bundle Size

```bash
npm run build
```

Check the output for large files.

### Enable Caching

```bash
# Vercel automatically caches static files
# Heroku: Configure in Procfile
```

### Use CDN

- **Vercel:** Automatically uses Vercel's CDN
- **Heroku:** Add CloudFlare for CDN

### Monitor Performance

```bash
# Test from different locations
curl -I https://your-app.com
```

---

## Scaling Your App

As your app grows:

1. **Upgrade Database:** Move to managed PostgreSQL
2. **Add Caching:** Implement Redis
3. **Use CDN:** Distribute content globally
4. **Load Balancing:** Handle more traffic
5. **Microservices:** Split into separate services

---

## Support & Resources

| Resource | Link |
|----------|------|
| GitHub Docs | https://docs.github.com |
| Vercel Docs | https://vercel.com/docs |
| Heroku Docs | https://devcenter.heroku.com |
| Node.js Docs | https://nodejs.org/docs |
| Stripe Docs | https://stripe.com/docs |
| PayPal Docs | https://developer.paypal.com/docs |

---

## Summary

You've successfully:
- ✅ Created a GitHub repository
- ✅ Pushed your code to GitHub
- ✅ Deployed to Vercel or Heroku
- ✅ Set up automated testing and deployment
- ✅ Configured environment variables
- ✅ Launched your app to the world

**Congratulations! Your Tom's Talented Tutoring app is now live! 🎉**

---

**Questions?** Check the [README](./README_COMPLETE.md) or [Quick Start Guide](./QUICK_START.md)
