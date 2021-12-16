const bcrypt = require("bcrypt");

async function verifyPassword(password) {
  try {
    if (password.length > 2) {
      return bcrypt.hash(password, 10);
    }
    return false;
  } catch (error) {
    return false;
  }
}

module.exports = { verifyPassword };
