const jwt = require("jsonwebtoken");

async function verifyToken(token) {
  try {
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
}

module.exports = { verifyToken };
