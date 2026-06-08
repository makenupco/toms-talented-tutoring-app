# Tom's Talented Tutoring - GitHub Deployment Guide

## Complete Step-by-Step Instructions for Deployment

This guide provides detailed instructions for deploying the Tom's Talented Tutoring mobile app to GitHub and preparing it for production deployment.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating a GitHub Repository](#creating-a-github-repository)
3. [Pushing Code to GitHub](#pushing-code-to-github)
4. [Setting Up Environment Variables](#setting-up-environment-variables)
5. [Configuring GitHub Actions](#configuring-github-actions)
6. [Deploying to Production](#deploying-to-production)
7. [Monetization Setup](#monetization-setup)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Git**: [Download Git](https://git-scm.com/downloads)
- **GitHub Account**: [Create a free GitHub account](https://github.com/join)
- **Node.js 18+**: [Download Node.js](https://nodejs.org/)
- **npm or pnpm**: Included with Node.js (pnpm recommended)

### Verify Installation

```bash
git --version
node --version
npm --version
```

---

## Creating a GitHub Repository

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub.com](https://github.com)
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Fill in the details:
   - **Repository name**: `toms-talented-tutoring-app`
   - **Description**: "AI-powered music creation and remastering platform"
   - **Visibility**: Public (or Private if preferred)
   - **Initialize repository**: Leave unchecked (we'll push existing code)
5. Click **Create repository**

### Step 2: Copy the Repository URL

After creating the repository, you'll see a page with your repository URL. Copy the HTTPS URL (e.g., `https://github.com/yourusername/toms-talented-tutoring-app.git`)

---

## Pushing Code to GitHub

### Step 1: Initialize Git in Your Project

Navigate to your project directory and initialize Git:

```bash
cd /home/ubuntu/toms-talented-tutoring-app
git init
```

### Step 2: Add Remote Repository

Replace `YOUR_REPO_URL` with the URL you copied:

```bash
git remote add origin https://github.com/yourusername/toms-talented-tutoring-app.git
```

### Step 3: Create .gitignore

A `.gitignore` file is already included. Verify it contains:

```
node_modules/
.env
.env.local
.env.*.local
dist/
build/
.expo/
.manus-logs/
*.log
.DS_Store
```

### Step 4: Add and Commit Files

```bash
git add .
git commit -m "Initial commit: Tom's Talented Tutoring mobile app"
```

### Step 5: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

After a moment, your code will be available on GitHub!

---

## Setting Up Environment Variables

### Step 1: Create .env.example

The `.env.example` file documents all required environment variables. It's already created in the project root.

### Step 2: Set Up Secrets in GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Value | Description |
|---|---|---|
| `STRIPE_SECRET_KEY` | Your Stripe secret key | From Stripe Dashboard |
| `STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key | From Stripe Dashboard |
| `PAYPAL_CLIENT_ID` | Your PayPal client ID | From PayPal Developer |
| `PAYPAL_SECRET` | Your PayPal secret | From PayPal Developer |
| `DATABASE_URL` | Your database connection string | PostgreSQL or MySQL |
| `JWT_SECRET` | A random secret string | For session tokens |
| `EXPO_TOKEN` | Your Expo authentication token | From `eas login` |

### Step 3: Obtain API Keys

#### Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up or log in
3. Navigate to **Developers** → **API keys**
4. Copy your **Secret Key** and **Publishable Key**
5. Add them to GitHub Secrets

#### PayPal Setup

1. Go to [PayPal Developer](https://developer.paypal.com)
2. Sign up or log in
3. Create a new app in **Sandbox** mode
4. Copy your **Client ID** and **Secret**
5. Add them to GitHub Secrets

#### Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and add it to GitHub Secrets as `JWT_SECRET`

---

## Configuring GitHub Actions

### Step 1: Create Workflow File

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build application
        run: npm run build
        env:
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
          PAYPAL_CLIENT_ID: ${{ secrets.PAYPAL_CLIENT_ID }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Cloud Run
        uses: google-github-actions/deploy-cloudrun@v0
        with:
          service: toms-talented-tutoring
          region: us-central1
          credentials: ${{ secrets.GCP_SA_KEY }}
          env_vars: |
            STRIPE_SECRET_KEY=${{ secrets.STRIPE_SECRET_KEY }}
            PAYPAL_CLIENT_ID=${{ secrets.PAYPAL_CLIENT_ID }}
            DATABASE_URL=${{ secrets.DATABASE_URL }}
            JWT_SECRET=${{ secrets.JWT_SECRET }}
```

### Step 2: Create Testing Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm install
      - run: npm run test
```

---

## Deploying to Production

### Option 1: Deploy to Vercel (Recommended for Web)

1. Go to [Vercel.com](https://vercel.com)
2. Click **Import Project**
3. Select your GitHub repository
4. Configure environment variables
5. Click **Deploy**

### Option 2: Deploy to Cloud Run (Google Cloud)

1. Install Google Cloud CLI: [Download](https://cloud.google.com/sdk/docs/install)
2. Authenticate:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```
3. Deploy:
   ```bash
   gcloud run deploy toms-talented-tutoring --source . --platform managed
   ```

### Option 3: Deploy to AWS (Lambda + RDS)

1. Install AWS CLI: [Download](https://aws.amazon.com/cli/)
2. Configure credentials:
   ```bash
   aws configure
   ```
3. Deploy using SAM:
   ```bash
   sam build
   sam deploy --guided
   ```

---

## Monetization Setup

### Stripe Integration

1. **Create Products in Stripe Dashboard**:
   - Pro Plan ($9.99/month)
   - Studio Plan ($19.99/month)
   - Pro Yearly ($99.99/year)
   - Studio Yearly ($199.99/year)

2. **Get Price IDs**:
   - Copy the Price ID for each product
   - Update `lib/monetization.ts` with the Price IDs

3. **Set Webhook Endpoint**:
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events: `customer.subscription.updated`, `customer.subscription.deleted`

### PayPal Integration

1. **Create Plans in PayPal Dashboard**:
   - Go to PayPal Developer → Subscriptions
   - Create billing plans for each tier

2. **Get Plan IDs**:
   - Copy the Plan ID for each subscription
   - Update `lib/monetization.ts` with the Plan IDs

3. **Set Webhook Endpoint**:
   - Go to PayPal Developer → Webhooks
   - Add endpoint: `https://yourdomain.com/api/paypal/webhook`

---

## Project Structure

```
toms-talented-tutoring-app/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx             # Home screen
│   │   ├── create.tsx            # Create tools
│   │   ├── projects.tsx          # Project library
│   │   ├── community.tsx         # Community hub
│   │   └── profile.tsx           # User profile
│   ├── _layout.tsx               # Root layout
│   └── oauth/                    # OAuth callbacks
├── components/                   # Reusable components
├── lib/                          # Utility functions
│   ├── monetization.ts           # Subscription logic
│   ├── stripe-service.ts         # Stripe integration
│   ├── paypal-service.ts         # PayPal integration
│   └── utils.ts                  # Helper functions
├── server/                       # Backend API
│   ├── _core/                    # Core server logic
│   ├── routers.ts                # API routes
│   └── README.md                 # Backend documentation
├── assets/                       # Images and icons
├── package.json                  # Dependencies
├── app.config.ts                 # Expo configuration
├── .env.example                  # Environment variables template
└── README.md                     # Project documentation
```

---

## Environment Variables Reference

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/toms_tutoring

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_SECRET=your_secret
PAYPAL_MODE=sandbox

# Expo
EXPO_TOKEN=your_expo_token

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# AI Services (Optional)
OPENAI_API_KEY=sk_...
REPLICATE_API_TOKEN=...
```

---

## Running Locally

### Development Mode

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at:
# - Web: http://localhost:8081
# - Mobile: Scan QR code in terminal with Expo Go app
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## Troubleshooting

### Issue: "Module not found"

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules pnpm-lock.yaml
npm install
```

### Issue: "Database connection failed"

**Solution**: Verify DATABASE_URL in .env
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Issue: "Stripe key not found"

**Solution**: Add secrets to GitHub Actions
1. Go to Settings → Secrets and variables → Actions
2. Add `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`

### Issue: "Build fails on GitHub Actions"

**Solution**: Check logs
1. Go to Actions tab in GitHub
2. Click the failed workflow
3. Expand the failed step to see error details

---

## Next Steps

1. **Test Locally**: Run `npm run dev` and test all features
2. **Push to GitHub**: Follow the "Pushing Code to GitHub" section
3. **Set Up Secrets**: Add all required environment variables
4. **Deploy**: Choose a deployment platform and follow its setup
5. **Monitor**: Use platform-specific monitoring tools

---

## Support & Resources

- **Expo Documentation**: https://docs.expo.dev
- **Stripe Documentation**: https://stripe.com/docs
- **PayPal Documentation**: https://developer.paypal.com/docs
- **React Native Docs**: https://reactnative.dev

---

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Contact

For questions or support, please open an issue on GitHub or contact the development team.
