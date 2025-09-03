const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // make sure you're using this in app.js

module.exports = function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "SECRETKEY"); // Replace with process.env.JWT_SECRET in production
    req.user = decoded; // e.g., { id: ..., iat: ..., exp: ... }
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token.");
  }
};
