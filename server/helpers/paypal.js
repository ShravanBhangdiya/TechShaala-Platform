const paypal = require("paypal-rest-sdk");

// PayPal Sandbox Configuration
// For real PayPal integration, set these environment variables:
// PAYPAL_CLIENT_ID and PAYPAL_SECRET_ID
const paypalConfig = {
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID || "mock-client-id",
  client_secret: process.env.PAYPAL_SECRET_ID || "mock-secret-key",
};

paypal.configure(paypalConfig);

module.exports = paypal;
