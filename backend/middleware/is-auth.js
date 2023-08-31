const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  if (req.method == "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw err;
    }
    const decodedToken = jwt.verify(token,'Secret Key');
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not Authorized" });
  }
};
