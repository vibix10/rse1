// create, send and save token

const sendToken = (investor, statusCode, res) => {
  //create token
  const token = investor.getJwtToken();

  // cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, investor });
};
module.exports = sendToken;
