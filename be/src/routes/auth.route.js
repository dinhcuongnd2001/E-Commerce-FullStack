"use strict";
const express = require("express");
const router = express.Router();
const authValidate = require("../validate/auth/register.validate");
const checkValidate = require("../middleware/checkValidate");
const AuthController = require("../controllers/auth.controller");
const { asyncHandler } = require("../middleware/handleError");
router.post(
  "/register",
  authValidate.validationRegister(),
  checkValidate.checkValidate,
  asyncHandler(AuthController.register)
);

module.exports = router;
