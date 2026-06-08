# Tom's Talented Tutoring - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/toms-talented-tutoring-app.git
cd toms-talented-tutoring-app
```

### Step 2: Install Dependencies
```bash
npm install
# or
pnpm install
```

### Step 3: Set Up Environment Variables
```bash
cp .env.example .env
# Edit .env with your configuration (optional for local development)
```

### Step 4: Start the Development Server
```bash
npm run dev
# or
pnpm dev
```

### Step 5: Access the App
- **Web**: Open http://localhost:8081 in your browser
- **Mobile**: Scan the QR code with Expo Go app

---

## 📱 App Features

### Navigation (5 Main Tabs)
1. **Home** - Dashboard with quick-start tools and recent projects
2. **Create** - Access all music creation tools
3. **Projects** - View and manage your projects
4. **Community** - Discover and share creations
5. **Profile** - Account settings and subscription management

### Quick Start Tools
- **Lyric Studio** - Write and compose lyrics
- **Song Designer** - Create melodies
- **AI Music Video** - Generate videos
- **Album Cover** - Design artwork
- **Remastering** - Enhance audio
- **Community** - Share and discover

---

## 💳 Monetization Setup

### For Local Development
No setup required. The app works with mock data.

### For Production (Stripe)
1. Create a Stripe account: https://stripe.com
2. Get your API keys from the dashboard
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

### For Production (PayPal)
1. Create a PayPal Developer account: https://developer.paypal.com
2. Get your credentials
3. Add to `.env`:
   ```
   PAYPAL_CLIENT_ID=your_client_id
   PAYPAL_SECRET=your_secret
   ```

---

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev:server       # Start backend only
npm run dev:metro        # Start Metro bundler only

# Building
npm run build            # Build for production
npm run check            # Type check
npm run lint             # Run linter
npm run format           # Format code

# Testing
npm run test             # Run tests
npm run test --watch     # Watch mode

# Mobile
npm run ios              # Run on iOS simulator
npm run android          # Run on Android emulator
npm run qr               # Generate QR code

# Production
npm start                # Start production server
```

---

## 📚 Documentation

- **[Complete README](./README_COMPLETE.md)** - Full documentation
- **[GitHub Deployment Guide](./GITHUB_DEPLOYMENT_GUIDE.md)** - Deployment instructions
- **[Backend README](./server/README.md)** - Backend API docs
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute

---

## 🎨 Customization

### Change App Name
Edit `app.config.ts`:
```typescript
const env = {
  appName: "Your App Name",
  appSlug: "your-app-slug",
  logoUrl: "your-logo-url",
};
```

### Change Theme Colors
Edit `theme.config.js`:
```javascript
const themeColors = {
  primary: { light: '#4285F4', dark: '#4285F4' },
  secondary: { light: '#EA4335', dark: '#EA4335' },
  // ... more colors
};
```

### Add New Screens
1. Create a new file in `app/(tabs)/` or `app/`
2. Use `ScreenContainer` for proper layout
3. Add to tab navigation in `app/(tabs)/_layout.tsx`

---

## 🐛 Troubleshooting

### Issue: "Metro bundler not starting"
```bash
rm -rf node_modules .expo
npm install
npm run dev
```

### Issue: "Port 8081 already in use"
```bash
# Kill the process using the port
lsof -ti:8081 | xargs kill -9
npm run dev
```

### Issue: "Database connection failed"
```bash
# Check DATABASE_URL in .env
echo $DATABASE_URL
# Verify database is running
```

---

## 📦 Project Structure

```
app/                    # App screens and navigation
components/             # Reusable components
lib/                    # Utilities and services
server/                 # Backend API
assets/                 # Images and icons
tests/                  # Test files
.github/workflows/      # CI/CD workflows
```

---

## 🚀 Next Steps

1. **Explore the Code**: Check out the main screens in `app/(tabs)/`
2. **Customize Branding**: Update colors and logo in `theme.config.js` and `app.config.ts`
3. **Add Features**: Create new screens and components
4. **Set Up Payments**: Configure Stripe and PayPal for production
5. **Deploy**: Follow the [GitHub Deployment Guide](./GITHUB_DEPLOYMENT_GUIDE.md)

---

## 💬 Need Help?

- Check the [Complete README](./README_COMPLETE.md)
- Read the [GitHub Deployment Guide](./GITHUB_DEPLOYMENT_GUIDE.md)
- Open an issue on GitHub
- Contact support@tomstutoring.com

---

**Happy coding! 🎵**
