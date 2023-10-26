const axios = require('axios');
const integrationID = 4304690;
// Step 1: Authentication Request
const authenticate = async () => {
  try {
    const apiKey = process.env.API_KEY; // Replace with your actual API key
    const authRequest = {
      api_key: apiKey,
    };

    const authResponse = await axios.post('https://accept.paymob.com/api/auth/tokens', authRequest, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const authToken = authResponse.data.token;
    console.log('Authentication Token:', authToken);

    return authToken;
  } catch (error) {
    console.error('Authentication Error:', error.message);
  }
};

// Step 2: Order Registration
const registerOrder = async (authToken , amount , merchant_order_id) => {
  try {
    const orderRequest = {
      auth_token: authToken,
      delivery_needed: 'false',
      amount_cents: "50",
      currency: 'EGP',
      merchant_order_id: "5", // Replace with your order ID
      items: [
        // Add your order items here
      ]
    };

    const orderResponse = await axios.post('https://accept.paymob.com/api/ecommerce/orders', orderRequest, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const orderId = orderResponse.data.id;
    console.log('Order ID:', orderId);

    return orderId;
  } catch (error) {
    console.error('Order Registration Error:', error.message);
  }
};

// Step 3: Payment Key Request
const requestPaymentKey = async (authToken, amount , orderId) => {
  try {
    const paymentKeyRequest = {
      auth_token: authToken,
      amount_cents: amount, // Replace with the amount in cents
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        // Add billing data here
      },
      currency: 'EGP',
      integration_id: integrationID, // Replace with the appropriate integration ID
      lock_order_when_paid: 'false',
    };

    const paymentKeyResponse = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', paymentKeyRequest, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const paymentToken = paymentKeyResponse.data.token;
    console.log('Payment Token:', paymentToken);

    return paymentToken;
  } catch (error) {
    console.error('Payment Key Request Error:', error.message);
  }
};

module.exports = { authenticate, registerOrder, requestPaymentKey };

