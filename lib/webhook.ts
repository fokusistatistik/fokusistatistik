// Webhook utility functions for n8n integration

interface WebhookData {
  event: string;
  userId?: string;
  data: Record<string, any>;
  timestamp: string;
}

export async function sendWebhook(data: Omit<WebhookData, 'timestamp'>) {
  try {
    const webhookData: WebhookData = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch('/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (!response.ok) {
      throw new Error('Webhook request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
}

// Example webhook events
export const WebhookEvents = {
  USER_REGISTERED: 'user.registered',
  USER_LOGIN: 'user.login',
  ASSISTANT_USED: 'assistant.used',
  SUBSCRIPTION_CREATED: 'subscription.created',
  SUBSCRIPTION_UPDATED: 'subscription.updated',
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
};
