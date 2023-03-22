"use strict";
const authModel = require("../models/auth.model");
const HandleObject = require("../utils/HandleObject");
const { CREATED, OK } = require("../core/success.response");
class AuthController {
  register = async (req, res, next) => {
    const newUser = await authModel.register(req.body);
    const metadata = HandleObject.getField(newUser, ["name", "email"]);
    new CREATED({
      message: "Register Successfully",
      metadata: metadata,
      option: { limit: 10 },
    }).send(res);
  };
}

module.exports = new AuthController();
