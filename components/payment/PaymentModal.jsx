import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Format phone number
      const formattedPhone = phoneNumber.startsWith('0') 
        ? '255' + phoneNumber.slice(1) 
        : phoneNumber;

      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formattedPhone,
          amount: 500, // Amount in TZS
          recipientNumber: '255625232734' // Your number to receive payment
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        onClose();
      } else {
        setError(data.message || 'Payment failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4">Download Resume</h2>
        <p className="mb-4 text-gray-600">
          Pay 500 TZS to download your resume in PDF format.
        </p>

        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded focus:outline-none focus:border-[rgb(42,167,69)]"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[rgb(42,167,69)] text-white py-2 px-4 rounded 
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[rgb(42,167,69)]/90'}`}
          >
            {loading ? 'Processing...' : 'Pay & Download'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal; 