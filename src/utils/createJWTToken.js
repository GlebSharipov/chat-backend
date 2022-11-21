const jwt = require("jsonwebtoken");

module.exports = function createJWTToken(email) {
  let token = jwt.sign(
    {
      data: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: "HS256",
    },
  );

  return token;
};
