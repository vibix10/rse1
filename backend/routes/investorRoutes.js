const express = require("express");
const router = express.Router();
const {
  postInvestor,
  investorLogin,
  investorLogout,
  resetPasswordToken,
  resetPassword,
  getInvestorDetails,
  changePassword,
  changeProfile,
  getInvestors,
  getInvestor,
  cancelInvestor,
  adminChangeProfile,
  adminDeleteInvestor,
} = require("../controllers/investorController");

const { isInvestorAuth, authorizeRoles } = require("../middleware/auth");
const { route } = require("./companyRoutes");

router.post("/register", postInvestor);
router.post("/login", investorLogin);
router.get("/logout", investorLogout);
router.post("/password/forgot", resetPasswordToken);
router.put("/password/reset/:token", resetPassword);
router.route("/me").get(isInvestorAuth, getInvestorDetails);
router.route("/password/update").put(isInvestorAuth, changePassword);
router.route("/me/update").put(isInvestorAuth, changeProfile);
router.route("/me/delete").delete(isInvestorAuth, cancelInvestor);
router.route("/investors").get(getInvestors);
router.route("/:id").get(isInvestorAuth, authorizeRoles("admin"), getInvestor);
router
  .route("/update/:id")
  .put(isInvestorAuth, authorizeRoles("admin"), adminChangeProfile);
router
  .route("/delete/:id")
  .delete(isInvestorAuth, authorizeRoles("admin"), adminDeleteInvestor);

module.exports = router;
