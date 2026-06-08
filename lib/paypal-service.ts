/**
 * PayPal Payment Service
 * Handles PayPal subscription and payment processing
 */

import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export interface PayPalPaymentDetails {
  approvalUrl: string;
  paymentId: string;
}

export interface PayPalSubscription {
  id: string;
  status: string;
  startDate: string;
  nextBillingDate: string;
  planId: string;
}

/**
 * Create a PayPal payment
 */
export async function createPayPalPayment(
  amount: number,
  planId: string,
  returnUrl: string,
  cancelUrl: string
): Promise<PayPalPaymentDetails> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/paypal/payment`,
      {
        amount,
        planId,
        returnUrl,
        cancelUrl,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating PayPal payment:", error);
    throw error;
  }
}

/**
 * Execute a PayPal payment
 */
export async function executePayPalPayment(
  paymentId: string,
  payerId: string
): Promise<{ success: boolean; transactionId: string }> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/paypal/payment/execute`,
      {
        paymentId,
        payerId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error executing PayPal payment:", error);
    throw error;
  }
}

/**
 * Create a PayPal subscription
 */
export async function createPayPalSubscription(
  planId: string
): Promise<PayPalPaymentDetails> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/paypal/subscription`,
      {
        planId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating PayPal subscription:", error);
    throw error;
  }
}

/**
 * Execute a PayPal subscription
 */
export async function executePayPalSubscription(
  subscriptionId: string,
  token: string
): Promise<PayPalSubscription> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/paypal/subscription/execute`,
      {
        subscriptionId,
        token,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error executing PayPal subscription:", error);
    throw error;
  }
}

/**
 * Cancel a PayPal subscription
 */
export async function cancelPayPalSubscription(
  subscriptionId: string
): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/api/paypal/subscription/cancel`, {
      subscriptionId,
    });
  } catch (error) {
    console.error("Error cancelling PayPal subscription:", error);
    throw error;
  }
}

/**
 * Get PayPal subscription details
 */
export async function getPayPalSubscriptionDetails(
  subscriptionId: string
): Promise<PayPalSubscription> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/paypal/subscription/${subscriptionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting PayPal subscription details:", error);
    throw error;
  }
}

/**
 * Get PayPal client ID
 */
export async function getPayPalClientId(): Promise<string> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/paypal/client-id`);
    return response.data.clientId;
  } catch (error) {
    console.error("Error getting PayPal client ID:", error);
    throw error;
  }
}
