"use strict";
const { body, validationResult } = require("express-validator");

module.exports = {
  validationRegister: () => [
    body("name")
      .isLength({ min: 4 })
      .withMessage("The length of the name must be at least 4 characters."),
    body("email").isEmail().withMessage("Must be an Email"),
    body("password")
      .matches("^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9]).{8,}$")
      .withMessage(
        "Minimum eight characters, at least one letter, one number and one special character"
      ),
  ],
};
