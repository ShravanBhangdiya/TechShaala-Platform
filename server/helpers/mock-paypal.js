// Mock PayPal service for testing
// This simulates PayPal payment creation without requiring actual PayPal credentials

const createMockPayment = (paymentData, callback) => {
  // Simulate PayPal payment creation
  setTimeout(() => {
    const mockPaymentInfo = {
      id: `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      links: [
        {
          href: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment-return?paymentId=${Date.now()}&PayerID=test-payer-id`,
          rel: "approval_url",
          method: "REDIRECT"
        }
      ]
    };
    
    callback(null, mockPaymentInfo);
  }, 1000);
};

const executeMockPayment = (paymentId, executeData, callback) => {
  // Simulate PayPal payment execution
  setTimeout(() => {
    const mockExecution = {
      id: paymentId,
      state: "approved",
      transactions: [
        {
          amount: {
            total: executeData.transactions[0].amount.total,
            currency: executeData.transactions[0].amount.currency
          }
        }
      ]
    };
    
    callback(null, mockExecution);
  }, 1000);
};

module.exports = {
  createMockPayment,
  executeMockPayment
}; 