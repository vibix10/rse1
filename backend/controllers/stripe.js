const asyncHandler = require("../middleware/async");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/money/deposit
exports.processPayment = asyncHandler(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",

    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send stripe API Key   =>   /api/money/stripeapi
exports.sendStripApi = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});


