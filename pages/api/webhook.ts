import type { NextApiRequest, NextApiResponse } from 'next';

interface WebhookResponse {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebhookResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Verify webhook signature
    const signature = req.headers['x-selcom-signature'];
    const SELCOM_API_SECRET = process.env.SELCOM_API_SECRET;

    // TODO: Implement signature verification

    // Process the webhook payload
    const payload = req.body;
    console.log('Webhook payload:', payload);

    // Handle different webhook events
    switch (payload.event) {
      case 'payment.success':
        // Handle successful payment
        break;
      case 'payment.failed':
        // Handle failed payment
        break;
      default:
        console.log('Unhandled webhook event:', payload.event);
    }

    return res.status(200).json({
      success: true,
      message: 'Webhook processed successfully'
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    });
  }
} 