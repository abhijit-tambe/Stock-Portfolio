const express = require("express");
const router = express.Router();
// const user = require("./user");

router.get("/", (req, res, next) => {
  res.send("hi form index");
});

module.exports = router;
