const Investor = require("../models/investorModel");
const ErrorHandler = require("../utils/errorClass");
const asyncHandler = require("./async");
const jwt = require("jsonwebtoken");

exports.isInvestorAuth = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.investor = await Investor.findById(decoded.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.investor.role)) {
      return next(
        new ErrorHandler(`${req.investor.role} has no permission`, 403)
      );
    }
    next();
  };
};
