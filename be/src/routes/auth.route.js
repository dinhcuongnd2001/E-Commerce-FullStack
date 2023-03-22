"use strict";
const express = require("express");
const router = express.Router();
const authValidate = require("../validate/auth/register.validate");
const checkValidate = require("../middleware/checkValidate");
const authModel = require("../models/auth.model");
const HandleObject = require("../utils/HandleObject");
router.post(
  "/register",
  authValidate.validationRegister(),
  checkValidate.checkValidate,
  async (req, res, next) => {
    const newUser = await authModel.register(req.body);
    res.status(200).json({
      message: "ok",
      data: HandleObject.getField(newUser, ["name", "email"]),
    });
  }
);

module.exports = router;
