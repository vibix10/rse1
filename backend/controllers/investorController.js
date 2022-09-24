const Investor = require("../models/investorModel");
const ErrorHandler = require("../utils/errorClass");
const handlePromise = require("../middleware/async");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
//const async = require("../middleware/async");

// post investor => /api/investor/register
exports.postInvestor = handlePromise(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "pics",
    width: 150,
    crop: "scale",
  });

  const { name, username, email, password, phone, role } = req.body;
  const investor = await Investor.create({
    name,
    username,
    email,
    password,
    phone,
    role,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    shares: [],
  });

  if (!investor) {
    return next(new ErrorHandler("check fields", 404));
  }

  sendToken(investor, 200, res);
});

// investor login => /api/investor/login
exports.investorLogin = handlePromise(async (req, res, next) => {
  const { username, password } = req.body;
  // get username and password
  if (!username || !password) {
    return next(new ErrorHandler("enter username and password", 400));
  }

  // find investor
  const investor = await Investor.findOne({ username }).select("+password");
  if (!investor) {
    return next(new ErrorHandler("Invalid credetials", 401));
  }

  // compare passwords
  const isPasswordMatch = await investor.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid password", 401));
  }

  sendToken(investor, 200, res);
});

// investor logout => /api/investor/logout
exports.investorLogout = handlePromise(async (req, res, next) => {
  res.cookie("token", "", { expire: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "Logged out" });
});

// forgot password => /api/investor/password/forgot

exports.resetPasswordToken = handlePromise(async (req, res, next) => {
  const investor = await Investor.findOne({ username: req.body.email });
  if (!investor) {
    return next(new ErrorHandler("Enter valid username", 404));
  }
  //get reset token
  const resetToken = investor.getPasswordResetToken();
  await investor.save({ validateBeforeSave: false });

  // reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/investor/password/reset/${resetToken}`;
  //const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `password reset token is: \n\n ${resetUrl}\n\nIf you have not requested a reset, please ignore this message.`;
  try {
    await sendEmail({
      email: investor.email,
      subject: "RSE password reset",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: `Email sent to ${investor.email}` });
  } catch (error) {
    investor.resetPasswordToken = undefined;
    investor.resetPasswordExpire = undefined;
    await investor.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password => /api/investor/password/reset/:token

exports.resetPassword = handlePromise(async (req, res, next) => {
  // hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const investor = await Investor.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!investor) {
    return next(new ErrorHandler("password reset failed!", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("passwords don't match", 400));
  }

  investor.password = req.body.password;
  investor.resetPasswordToken = undefined;
  investor.resetPasswordExpire = undefined;
  await investor.save();
  sendToken(investor, 200, res);
});

// investor details => /api/investor/me
exports.getInvestorDetails = handlePromise(async (req, res, next) => {
  const investor = await Investor.findById(req.investor.id);
  res.status(200).json({
    success: true,
    investor,
  });
});

// investor change password => /api/investor/password/update
exports.changePassword = handlePromise(async (req, res, next) => {
  const investor = await Investor.findById(req.investor.id).select("+password");

  const isMatched = await investor.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("old password is incorrect!", 400));
  }
  investor.password = req.body.password;
  await investor.save();
  sendToken(investor, 200, res);
});

// investor change profile => /api/investor/me/update
exports.changeProfile = handlePromise(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    cashBalance: req.body.amount,
  };
  const investor = await Investor.findByIdAndUpdate(
    req.investor.id,
    newUserData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    }
  );

  res.status(200).json({ success: true });
});

// get all investors => /api/investor/investors
exports.getInvestors = handlePromise(async (req, res, next) => {
  const investors = await Investor.find();

  res.status(200).json({ success: true, count: investors.length, investors });
});

// get specific investor => /api/investor/:id
exports.getInvestor = handlePromise(async (req, res, next) => {
  const investor = await Investor.findById(req.params.id);
  if (!investor) {
    return next(new ErrorHandler("investor doesn't exist", 404));
  }

  res.status(200).json({ success: true, investor });
});

// admin update investor => /api/investor/update/:id
exports.adminChangeProfile = handlePromise(async (req, res, next) => {
  const investor = await Investor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({ success: true, investor });
});

// admin delete investor => /api/investor/delete/:id
exports.adminDeleteInvestor = handlePromise(async (req, res, next) => {
  const investor = await Investor.findById(req.params.id);
  if (!investor) {
    return next(new ErrorHandler("investor doesn't exist", 404));
  }
  await investor.remove();
  res.status(200).json({
    success: true,
  });
});

// delete investor => /api/investor/me/delete
exports.cancelInvestor = handlePromise(async (req, res, next) => {
  const investor = await Investor.findById(req.investor.id);
  if (!investor) {
    return next(new ErrorHandler("investor doesn't exist", 404));
  }
  await investor.remove();
  res.status(200).json({
    success: true,
  });
});
