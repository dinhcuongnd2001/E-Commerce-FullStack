"use strict";

const UserSchema = require("../schemas/user.schema");

module.exports = {
  register: async (user) => {
    const newUser = await UserSchema(user).save();
    return newUser;
  },
};
