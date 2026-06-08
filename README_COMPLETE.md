# Tom's Talented Tutoring - Complete Mobile App

A comprehensive AI-powered music creation and remastering platform built with React Native, Expo, and modern web technologies. Create songs, generate music videos, design album covers, and remaster audio with AI assistance.

## 🎵 Features

### Core Music Creation Tools
- **Lyric Studio**: Write and compose song lyrics with AI-powered suggestions
- **Song Designer**: Create melodies and arrange instruments with a virtual piano roll
- **AI Music Video Generator**: Generate stunning music videos from your compositions
- **Album Cover Creator**: Design beautiful album artwork with AI assistance
- **Remastering Suite**: Enhance audio quality with professional tools
- **Community Hub**: Discover and share creations with other musicians

### Monetization
- **Stripe Integration**: Secure payment processing for subscriptions
- **PayPal Integration**: Alternative payment method for global users
- **Flexible Subscription Plans**: Free, Pro ($9.99/mo), and Studio ($19.99/mo) tiers
- **One-Time Purchases**: Support for individual feature purchases
- **Referral System**: Earn rewards by inviting friends

### User Experience
- **Modern UI**: Google-inspired multicolored design system
- **Dark Mode**: Full dark mode support with system preferences
- **Responsive Design**: Works seamlessly on mobile, tablet, and web
- **Offline Support**: Basic functionality works without internet connection
- **Real-Time Collaboration**: Share projects and collaborate with other users

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**: [Download](https://nodejs.org/)
- **Git**: [Download](https://git-scm.com/)
- **Expo CLI**: `npm install -g expo-cli`
- **pnpm** (recommended): `npm install -g pnpm`

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/toms-talented-tutoring-app.git
   cd toms-talented-tutoring-app
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Access the App**
   - **Web**: http://localhost:8081
   - **Mobile**: Scan QR code with Expo Go app

---

## 📱 Project Structure

```
toms-talented-tutoring-app/
├── app/                              # Expo Router app directory
│   ├── (tabs)/                       # Tab-based navigation
│   │   ├── _layout.tsx              # Tab configuration
│   │   ├── index.tsx                # Home screen
│   │   ├── create.tsx               # Create tools
│   │   ├── projects.tsx             # Project library
│   │   ├── community.tsx            # Community hub
│   │   └── profile.tsx              # User profile
│   ├── _layout.tsx                  # Root layout with providers
│   └── oauth/                       # OAuth callbacks
│
├── components/                       # Reusable components
│   ├── screen-container.tsx         # SafeArea wrapper
│   ├── themed-view.tsx              # Theme-aware view
│   ├── haptic-tab.tsx               # Tab with haptic feedback
│   └── ui/                          # UI components
│
├── lib/                              # Utility functions and services
│   ├── monetization.ts              # Subscription logic
│   ├── stripe-service.ts            # Stripe integration
│   ├── paypal-service.ts            # PayPal integration
│   ├── trpc.ts                      # tRPC client
│   ├── utils.ts                     # Helper functions
│   ├── theme-provider.tsx           # Theme context
│   └── _core/                       # Core utilities
│
├── hooks/                            # Custom React hooks
│   ├── use-auth.ts                  # Authentication hook
│   ├── use-colors.ts                # Theme colors hook
│   └── use-color-scheme.ts          # Dark mode detection
│
├── server/                           # Backend API
│   ├── _core/                       # Core server logic
│   │   ├── index.ts                 # Server entry point
│   │   ├── trpc.ts                  # tRPC router
│   │   ├── auth.ts                  # Authentication
│   │   ├── llm.ts                   # AI/LLM integration
│   │   ├── imageGeneration.ts       # Image generation
│   │   └── ...
│   ├── routers.ts                   # API route definitions
│   ├── db.ts                        # Database setup
│   └── README.md                    # Backend documentation
│
├── assets/                           # Images, icons, fonts
│   ├── images/
│   │   ├── icon.png                 # App icon
│   │   ├── splash-icon.png          # Splash screen
│   │   └── favicon.png              # Web favicon
│
├── constants/                        # App constants
│   ├── theme.ts                     # Theme configuration
│   ├── oauth.ts                     # OAuth settings
│   └── const.ts                     # General constants
│
├── shared/                           # Shared types and utilities
│   ├── types.ts                     # TypeScript types
│   └── const.ts                     # Shared constants
│
├── tests/                            # Test files
│   └── auth.logout.test.ts          # Example tests
│
├── drizzle/                          # Database migrations
│   ├── schema.ts                    # Database schema
│   └── migrations/                  # Migration files
│
├── .github/                          # GitHub configuration
│   └── workflows/                   # CI/CD workflows
│
├── app.config.ts                    # Expo configuration
├── tailwind.config.js               # Tailwind CSS config
├── theme.config.js                  # Theme color palette
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── .env.example                     # Environment variables template
├── GITHUB_DEPLOYMENT_GUIDE.md       # GitHub deployment instructions
└── README.md                        # This file
```

---

## 🎨 Design System

### Color Palette (Google-Inspired)
- **Primary Blue**: #4285F4
- **Secondary Red**: #EA4335
- **Accent Yellow**: #FBBC04
- **Success Green**: #34A853
- **Dark Background**: #1F1F1F
- **Light Background**: #FFFFFF

### Typography
- **Display Font**: Inter / Poppins (modern, clean)
- **Body Font**: Inter (readable, professional)
- **Heading Sizes**: 32px (H1), 24px (H2), 20px (H3), 16px (H4)

---

## 💳 Monetization

### Subscription Plans

| Plan | Price | Billing | Features |
|------|-------|---------|----------|
| Free | $0 | Monthly | Basic tools, limited AI, community access |
| Pro | $9.99 | Monthly | All tools, AI features, unlimited exports |
| Studio | $19.99 | Monthly | Pro + collaboration, commercial license, API |
| Pro Yearly | $99.99 | Yearly | Save 17% vs monthly |
| Studio Yearly | $199.99 | Yearly | Save 17% vs monthly |

### Payment Methods
- **Stripe**: Credit/debit cards, Apple Pay, Google Pay
- **PayPal**: PayPal account, PayPal Credit
- **In-App Purchases**: iOS and Android native purchases

---

## 🔐 Authentication

The app supports multiple authentication methods:

1. **Email/Password**: Traditional email and password login
2. **OAuth**: Sign in with Google, Apple, or GitHub
3. **Biometric**: Face ID / Touch ID on supported devices
4. **Session Management**: Secure token-based sessions

---

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server with Metro bundler
pnpm dev:server       # Start backend server only
pnpm dev:metro        # Start Metro bundler only

# Building
pnpm build            # Build for production
pnpm check            # Type check with TypeScript
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier

# Testing
pnpm test             # Run tests with Vitest

# Database
pnpm db:push          # Push schema changes to database

# Mobile
pnpm ios              # Run on iOS simulator
pnpm android          # Run on Android emulator
pnpm qr               # Generate QR code for Expo Go

# Production
pnpm start            # Start production server
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/toms_tutoring

# Authentication
JWT_SECRET=your_jwt_secret_here

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# PayPal
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_SECRET=your_secret
PAYPAL_MODE=sandbox

# Expo
EXPO_TOKEN=your_expo_token
```

---

## 🧪 Testing

### Run Tests

```bash
pnpm test
```

### Test Structure

Tests are located in the `tests/` directory and use Vitest:

```typescript
// Example test
import { describe, it, expect } from 'vitest';

describe('Authentication', () => {
  it('should logout user', async () => {
    // Test implementation
  });
});
```

---

## 📦 Building for Production

### Web Build

```bash
pnpm build
pnpm start
```

### Mobile Build (Expo)

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for all platforms
eas build
```

### Docker Build

```bash
docker build -t toms-tutoring .
docker run -p 3000:3000 toms-tutoring
```

---

## 🚀 Deployment

### Deploy to Vercel (Web)

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import your repository
4. Set environment variables
5. Deploy

### Deploy to Cloud Run (Google Cloud)

```bash
gcloud run deploy toms-talented-tutoring --source . --platform managed
```

### Deploy to AWS Lambda

```bash
sam build
sam deploy --guided
```

See [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 📚 Documentation

- **[GitHub Deployment Guide](./GITHUB_DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[Backend README](./server/README.md)** - Backend API documentation
- **[Expo Documentation](https://docs.expo.dev)** - Expo framework docs
- **[React Native Docs](https://reactnative.dev)** - React Native reference

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Write tests for new features

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Metro bundler not starting
```bash
# Solution: Clear cache and restart
rm -rf node_modules .expo
pnpm install
pnpm dev
```

**Issue**: Database connection failed
```bash
# Solution: Check DATABASE_URL and verify database is running
psql $DATABASE_URL -c "SELECT 1"
```

**Issue**: Stripe/PayPal keys not working
```bash
# Solution: Verify keys in .env and GitHub Secrets
echo $STRIPE_SECRET_KEY
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) file for details.

---

## 👥 Support

- **GitHub Issues**: [Report bugs](https://github.com/yourusername/toms-talented-tutoring-app/issues)
- **Discussions**: [Ask questions](https://github.com/yourusername/toms-talented-tutoring-app/discussions)
- **Email**: support@tomstutoring.com

---

## 🙏 Acknowledgments

- **Expo**: For the incredible React Native framework
- **Stripe & PayPal**: For payment processing
- **React**: For the UI library
- **Tailwind CSS**: For utility-first styling
- **TypeScript**: For type safety

---

## 📊 Project Status

- ✅ Core UI and navigation
- ✅ Authentication system
- ✅ Monetization integration (Stripe & PayPal)
- ✅ Theme system (light/dark mode)
- 🚧 Music creation tools (in progress)
- 🚧 AI integration (in progress)
- 🚧 Community features (in progress)
- 📋 Mobile app store submission (planned)

---

**Last Updated**: June 2026  
**Version**: 1.0.0  
**Maintainer**: Tom's Talented Tutoring Team
