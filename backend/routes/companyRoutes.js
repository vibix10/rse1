const express = require("express");

const router = express.Router();

const {
  getCompanies,
  home,
  postCompany,
  getCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");
const { isInvestorAuth, authorizeRoles } = require("../middleware/auth");

router.get("/", home);
router.route("/companies").get(getCompanies);
router.get("/:id", getCompany);
router.put("/update/:id", updateCompany);
router.delete("/delete/:id", deleteCompany);
router
  .route("/registration")
  .post(isInvestorAuth, authorizeRoles("admin"), postCompany);

module.exports = router;
