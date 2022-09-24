const express = require("express");
const router = express.Router();

const { processPayment, sendStripApi } = require("../controllers/stripe");

const { isInvestorAuth, authorizeRoles } = require("../middleware/auth");

router.route("/deposit").post(isInvestorAuth, processPayment);
router.route("/stripeapi").get(isInvestorAuth, sendStripApi);

module.exports = router;
