"use strict";
const authModel = require("../models/auth.model");
const { getData } = require("../utils/HandleObject");
const { CREATED, OK } = require("../core/success.response");
class AuthController {
  register = async (req, res, next) => {
    const newUser = await authModel.register(req.body);
    const metadata = getData(newUser, ["name", "email"]);
    new CREATED({
      message: "Register Successfully",
      metadata: metadata,
    }).send(res);
  };

  login = async (req, res, next) => {
    const metadata = await authModel.login(req.body);
    console.log("metadata :: ", metadata);
    new OK({
      message: "Login Successfully",
      metadata,
    }).send(res);
  };
}

module.exports = new AuthController();
