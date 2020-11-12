const express = require("express");
const router = express.Router();
const portfolioRoute = require('./portfolio');
const userRoute = require("./user");

router.get("/", (req, res, next) => {
  res.send("welcome to stock portfolio api");
});


router.use("/user", userRoute);
router.use("/portfolio", portfolioRoute);





module.exports = router;
