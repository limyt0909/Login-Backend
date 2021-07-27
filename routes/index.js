const express = require("express");
const router = express.Router();
let jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Login Routing Test");
});

module.exports = router;
