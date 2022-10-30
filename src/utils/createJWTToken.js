const jwt = require("jsonwebtoken");

module.exports = function createJWTToken(details) {
  details.sessionData = _.reduce(
    details.sessionData || {},
    (memo, curVal, key) => {
      if (typeof curVal !== "function" && key !== "password") {
        memo[key] = curVal;
      }

      return memo;
    },
    {},
  );

  let token = jwt.sign(
    {
      data: details.sessionData,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: "HS256",
    },
  );

  return token;
};
