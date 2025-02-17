import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface PaymentRequestBody {
  phone: string;
  amount: number;
  recipientNumber: string;
}

interface PaymentResponse {
  success: boolean;
  data?: any;
  message?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PaymentResponse>
) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  const { phone, amount, recipientNumber } = req.body as PaymentRequestBody;

  try {
    // Using the correct Selcom API endpoint
    const response = await axios.post('https://checkout.selcom.net/api/v1/order/create', {
      vendor: recipientNumber,
      order_id: `ORDER-${Date.now()}`,
      amount: amount,
      currency: 'TZS',
      phone_number: phone,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`,
      payment_method: 'MOBILE_MONEY', // Add payment method
      billing: {
        first_name: 'Customer',
        last_name: 'Name',
        email: 'customer@example.com',
        phone: phone
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SELCOM_API_KEY}`,
        'Api-Key': process.env.SELCOM_API_KEY,
        'Api-Secret': process.env.SELCOM_API_SECRET,
      },
      timeout: 10000 // 10 second timeout
    });

    return res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Payment error details:', error);
    
    // Better error handling
    let errorMessage = 'Payment processing failed';
    
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message 
        || error.message 
        || 'Network error occurred';
        
      // Log detailed error for debugging
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
    }

    return res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

export default handler; 