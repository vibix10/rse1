const { json } = require("express");
const Company = require("../models/companyModel");
const ErrorHandler = require("../utils/errorClass");
const asyncHandler = require("../middleware/async");
const ApiFeatures = require("../utils/apiFeatures");

// post company => /api/company/registration
exports.postCompany = asyncHandler(async (req, res, next) => {
  req.body.investor = req.investor.id;
  req.body.outstanding = req.body.totalShares;
  const company = await Company.create(req.body);
  res.status(201).json({
    sucess: true,
    company,
  });
});

// get company => /api/company/:id
exports.getCompany = async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    return next(new ErrorHandler("company not found", 404));
  }
  res.status(200).json({
    success: true,
    company,
  });
};

// update company => /api/company/update/:id
exports.updateCompany = async (req, res) => {
  let company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(404).json({
      success: false,
      message: "company not found",
    });
  }
  company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    company,
  });
};

// delete company => /api/company/delete/:id

exports.deleteCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(404).json({
      success: false,
      message: "company not found",
    });
  }
  company.remove();
  res.status(200).json({
    success: true,
    message: "deleted!",
  });
};

// get listed companies => /api/company/companies?keyword=ben
exports.getCompanies = asyncHandler(async (req, res, next) => {
  //return next(new ErrorHandler("company not found", 404));
  const rpp = 3;
  const apiFeatures = new ApiFeatures(Company.find(), req.query)
    .search()
    .filter()
    .pagination(rpp);

  const companies = await apiFeatures.query;
  const count = await Company.countDocuments();
  res.status(200).json({
    success: true,
    count,
    companies,
    rpp,
  });
});

// get home page
exports.home = (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "home page!",
  });
};
