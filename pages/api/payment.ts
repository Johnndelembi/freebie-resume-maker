import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import https from 'https';

interface PaymentRequestBody {
  phone: string;
  amount: number;
  recipientNumber: string;
}

interface PaymentResponse {
  success: boolean;
  data?: any;
  message?: string;
  details?: any;
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

  const { phone, amount } = req.body as PaymentRequestBody;

  try {
    // Create custom HTTPS agent
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false // Only use this in development
    });

    const response = await axios.post('https://checkout.selcom.co.tz/api/v1/order/create', {
      vendor: process.env.SELCOM_VENDOR,
      order_id: `ORDER-${Date.now()}`,
      amount: amount.toString(),
      currency: 'TZS',
      phone_number: phone,
      payment_method: 'MOBILE_MONEY',
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`,
      billing: {
        first_name: 'Customer',
        last_name: 'Name',
        email: 'customer@example.com',
        phone: phone
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.SELCOM_API_KEY}`,
        'Api-Key': process.env.SELCOM_API_KEY,
        'Api-Secret': process.env.SELCOM_API_SECRET,
      },
      httpsAgent,
      timeout: 10000
    });

    console.log('Selcom API Response:', response.data); // Add logging

    return res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error: unknown) {
    console.error('Payment error details:', error);
    
    let errorMessage = 'Payment processing failed';
    let errorDetails: any = null;
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      console.error('Full error details:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        headers: axiosError.response?.headers,
        request: {
          url: axiosError.config?.url,
          method: axiosError.config?.method,
          headers: axiosError.config?.headers,
          data: axiosError.config?.data ? JSON.parse(axiosError.config.data as string) : null
        }
      });

      errorDetails = axiosError.response?.data;

      if (typeof axiosError.response?.data === 'string' && axiosError.response.data.includes('<!DOCTYPE HTML>')) {
        errorMessage = 'API endpoint not accessible. Please try again later.';
      } else {
        errorMessage = axiosError.response?.data?.message 
          || axiosError.message 
          || 'Network error occurred';
      }
    }

    return res.status(500).json({
      success: false,
      message: errorMessage,
      details: errorDetails
    });
  }
};

export default handler; 