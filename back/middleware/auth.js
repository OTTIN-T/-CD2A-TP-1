const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    try {
      if (!payload) {
        res.status(401).json({ message: "Token altere" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
