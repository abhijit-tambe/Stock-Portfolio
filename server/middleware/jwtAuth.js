const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token: ", token);
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Auth Failed",
    });
  }
};

module.exports = checkAuth;
