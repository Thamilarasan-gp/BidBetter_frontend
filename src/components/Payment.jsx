import React, { useState } from 'react';
import axios from 'axios';
import './Payment.css';

const Payment = ({ amount, itemId, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await initializeRazorpay();
      if (!res) {
        setError('Razorpay SDK failed to load');
        return;
      }

      // Create order on server
      const orderResponse = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: amount * 100, // Razorpay expects amount in paise
        itemId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "Bidding Me",
        description: "Payment for auction item",
        order_id: orderResponse.data.id,
        handler: async (response) => {
          try {
            // Verify payment on server
            const verifyResponse = await axios.post('http://localhost:5000/api/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              itemId
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });

            if (verifyResponse.data.success) {
              onSuccess(verifyResponse.data);
            } else {
              setError('Payment verification failed');
              onFailure('Payment verification failed');
            }
          } catch (error) {
            setError(error.response?.data?.message || 'Payment verification failed');
            onFailure(error.response?.data?.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: localStorage.getItem('userName'),
          email: localStorage.getItem('userEmail'),
        },
        theme: {
          color: "#28a745"
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to initialize payment');
      onFailure(error.response?.data?.message || 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <button
        className="payment-button"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <p className="payment-error">{error}</p>}
    </div>
  );
};

export default Payment;
