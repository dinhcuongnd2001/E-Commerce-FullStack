"use strict";
const { body, validationResult } = require("express-validator");
const UserSchema = require("../../schemas/user.schema");
module.exports = {
  validationLogin: () => [
    body("email").isEmail().withMessage("Email must be an Email"),
    body("password")
      .matches("^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9]).{8,}$")
      .withMessage(
        "Password minimum eight characters, at least one letter, one number and one special character"
      ),
  ],
};
