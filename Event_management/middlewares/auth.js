const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token,"SECRETKEY");
    req.user = decoded; // ✅ This makes req.user.id available
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
