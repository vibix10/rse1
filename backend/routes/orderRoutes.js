const express = require("express");
const router = express.Router();

const {
  createSellingOrder,
  createBuyingOrder,
  getYourOrders,
  getSingleOrder,
  getAllOrders,
  acceptOrder,
  createIpoOrder,
  getAllOutstandingCompanyOrders,
  getAllOutstandingOrders,
} = require("../controllers/orderController");
const { isInvestorAuth, authorizeRoles } = require("../middleware/auth");

router
  .route("/selling/create/:companyid")
  .post(
    isInvestorAuth,
    authorizeRoles("investor", "underwriter"),
    createSellingOrder
  );
router
  .route("/buying/create/:companyid")
  .post(
    isInvestorAuth,
    authorizeRoles("investor", "underwriter"),
    createBuyingOrder
  );
router
  .route("/ipo/create/:companyid")
  .post(isInvestorAuth, authorizeRoles("underwriter"), createIpoOrder);
router.route("/").get(getAllOutstandingOrders);
router
  .route("/outstanding/:companyid")
  .get(isInvestorAuth, getAllOutstandingCompanyOrders);
router.route("/me").get(isInvestorAuth, getYourOrders);
router.route("/report").get(getAllOrders);
router.route("/:id").get(isInvestorAuth, getSingleOrder);

router.route("/accept/:orderid").post(isInvestorAuth, acceptOrder);

module.exports = router;
