"use strict";
const express = require("express");
const router = express.Router();
const { validationRegister } = require("../validate/auth/register.validate");
const { validationLogin } = require("../validate/auth/login.validate");
const { checkValidate } = require("../middleware/checkValidate");
const AuthController = require("../controllers/auth.controller");
const { asyncHandler } = require("../middleware/handleError");
const { authetication } = require("../auth/authUtil");

router.post(
  "/register",
  validationRegister(),
  checkValidate,
  asyncHandler(AuthController.register)
);

router.post(
  "/login",
  validationLogin(),
  checkValidate,
  asyncHandler(AuthController.login)
);

// authentication
router.use(authetication);
router.post("/logout", asyncHandler(AuthController.logout));

module.exports = router;
