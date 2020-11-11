const express = require("express");
const router = express.Router();
const portfolioRoute = require('./portfolio');
const userRoute = require("./user");

router.get("/", (req, res, next) => {
  res.send("welcome to stock portfolio api");
});

// app.use("/", indexRoute);
router.use("/user", userRoute);
// app.use("/api/dashboard", dashboardRoute);
router.use("/portfolio", portfolioRoute);
// app.use("/api/stocks",stockRoute);




module.exports = router;
