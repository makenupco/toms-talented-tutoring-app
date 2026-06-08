/**
 * Stripe Payment Service
 * Handles Stripe subscription and payment processing
 */

import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export interface StripePaymentIntent {
  clientSecret: string;
  publishableKey: string;
}

export interface StripeSubscription {
  id: string;
  status: string;
  currentPeriodEnd: number;
  priceId: string;
}

/**
 * Create a payment intent for one-time purchases
 */
export async function createPaymentIntent(
  amount: number,
  planId: string
): Promise<StripePaymentIntent> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/stripe/payment-intent`,
      {
        amount,
        planId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}

/**
 * Create a subscription with Stripe
 */
export async function createStripeSubscription(
  priceId: string,
  paymentMethodId: string
): Promise<StripeSubscription> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/stripe/subscription`,
      {
        priceId,
        paymentMethodId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}

/**
 * Cancel a Stripe subscription
 */
export async function cancelStripeSubscription(
  subscriptionId: string
): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/api/stripe/subscription/cancel`, {
      subscriptionId,
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    throw error;
  }
}

/**
 * Get Stripe publishable key
 */
export async function getStripePublishableKey(): Promise<string> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/stripe/publishable-key`
    );
    return response.data.publishableKey;
  } catch (error) {
    console.error("Error getting publishable key:", error);
    throw error;
  }
}

/**
 * Update payment method for subscription
 */
export async function updatePaymentMethod(
  subscriptionId: string,
  paymentMethodId: string
): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/api/stripe/update-payment-method`, {
      subscriptionId,
      paymentMethodId,
    });
  } catch (error) {
    console.error("Error updating payment method:", error);
    throw error;
  }
}

/**
 * Get subscription details
 */
export async function getSubscriptionDetails(
  subscriptionId: string
): Promise<StripeSubscription> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/stripe/subscription/${subscriptionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting subscription details:", error);
    throw error;
  }
}
