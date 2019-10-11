const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function generateToken(user) {
  const payload = {
    subject: user.google_id,
  };

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, process.env.TOKENSECRET, options);
};
