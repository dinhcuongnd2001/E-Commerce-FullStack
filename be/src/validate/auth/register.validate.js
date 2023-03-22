"use strict";
const { body, validationResult } = require("express-validator");
const UserSchema = require("../../schemas/user.schema");
module.exports = {
  validationRegister: () => [
    body("name")
      .isLength({ min: 4 })
      .withMessage("The length of the name must be at least 4 characters."),
    body("email")
      .isEmail()
      .withMessage("Must be an Email")
      .custom(async (value) => {
        console.log("value::", value);
        const user = await UserSchema.findOne({ email: value }).lean();
        console.log("user::", user);
        if (user) return Promise.reject("E-mail already is used");
      }),
    body("password")
      .matches("^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9]).{8,}$")
      .withMessage(
        "Minimum eight characters, at least one letter, one number and one special character"
      ),
  ],
};
