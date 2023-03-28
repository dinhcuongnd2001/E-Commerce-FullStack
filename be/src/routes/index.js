"use strict";
const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));

// middleware Check permission
router.use("/product", require("./product.route"));

module.exports = router;
