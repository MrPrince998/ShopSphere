const jwt = require("jsonwebtoken");

// Generate tokens
function generateTokens(userId) {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

module.exports = { generateTokens };
