/**
 * Monetization Service
 * Handles Stripe and PayPal subscription management
 */

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: "monthly" | "yearly";
  features: string[];
  stripePriceId?: string;
  paypalPlanId?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: "active" | "cancelled" | "expired" | "pending";
  startDate: Date;
  endDate: Date;
  paymentMethod: "stripe" | "paypal";
  stripeSubscriptionId?: string;
  paypalSubscriptionId?: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "USD",
    billingPeriod: "monthly",
    features: [
      "Basic lyric writing",
      "Limited AI suggestions",
      "Export to MP3 (low quality)",
      "Community access",
      "1 project at a time",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    currency: "USD",
    billingPeriod: "monthly",
    features: [
      "Unlimited lyric writing",
      "Advanced AI suggestions",
      "Export to MP3 (high quality)",
      "AI Music Video generation",
      "Album cover creation",
      "Unlimited projects",
      "Priority support",
      "Remove watermarks",
    ],
    stripePriceId: "price_pro_monthly",
    paypalPlanId: "plan_pro_monthly",
  },
  {
    id: "studio",
    name: "Studio",
    price: 19.99,
    currency: "USD",
    billingPeriod: "monthly",
    features: [
      "All Pro features",
      "Unlimited AI Music Videos",
      "Advanced remastering tools",
      "Collaboration features",
      "Commercial license",
      "API access",
      "24/7 premium support",
      "Custom branding",
    ],
    stripePriceId: "price_studio_monthly",
    paypalPlanId: "plan_studio_monthly",
  },
  {
    id: "pro-yearly",
    name: "Pro (Yearly)",
    price: 99.99,
    currency: "USD",
    billingPeriod: "yearly",
    features: [
      "All Pro features",
      "Save 17% vs monthly",
      "Yearly billing",
    ],
    stripePriceId: "price_pro_yearly",
    paypalPlanId: "plan_pro_yearly",
  },
  {
    id: "studio-yearly",
    name: "Studio (Yearly)",
    price: 199.99,
    currency: "USD",
    billingPeriod: "yearly",
    features: [
      "All Studio features",
      "Save 17% vs monthly",
      "Yearly billing",
    ],
    stripePriceId: "price_studio_yearly",
    paypalPlanId: "plan_studio_yearly",
  },
];

/**
 * Get subscription plan by ID
 */
export function getSubscriptionPlan(planId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find((plan) => plan.id === planId);
}

/**
 * Check if user has access to a feature based on subscription
 */
export function hasFeatureAccess(
  subscription: Subscription | null,
  feature: string
): boolean {
  if (!subscription || subscription.status !== "active") {
    return feature === "free";
  }

  const plan = getSubscriptionPlan(subscription.planId);
  if (!plan) return false;

  return plan.features.some((f) =>
    f.toLowerCase().includes(feature.toLowerCase())
  );
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

/**
 * Calculate savings for yearly plans
 */
export function calculateYearlySavings(monthlyPrice: number): number {
  const yearlyPrice = monthlyPrice * 12;
  return yearlyPrice * 0.17; // 17% savings
}
