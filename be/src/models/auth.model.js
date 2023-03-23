"use strict";
const bcrpyt = require("bcrypt");
const UserSchema = require("../schemas/user.schema");
const crypto = require("crypto");
const { BadRequestError } = require("../core/error.response");
const KeyTokenModel = require("./keyToken.model");
const { createTokenPair } = require("../auth/authUtil");
const { getData } = require("../utils/HandleObject");

module.exports = {
  register: async (user) => {
    const newUser = await UserSchema(user).save();
    return newUser;
  },

  login: async ({ email, password }) => {
    const user = await UserSchema.findOne({ email }).lean();
    if (!user) throw new BadRequestError("The Email or Password is not true");
    const match = await bcrpyt.compare(password, user.password);
    if (!match) throw new BadRequestError("The Email or Password is not true");

    // create key pair to create JWT
    const keyToAccess = crypto.randomBytes(64).toString("hex");
    const keyToRefresh = crypto.randomBytes(64).toString("hex");
    // console.table([keyToAccess, keyToRefresh]);

    const keyStore = await KeyTokenModel.createKeyToken({
      userId: user._id,
      keyToAccess,
      keyToRefresh,
    });
    if (!keyStore) throw new BadRequestError("Create Key Error");

    // creat token pair
    const { accessToken, refreshToken } = await createTokenPair(
      { name: user.name, id: user._id },
      keyToAccess,
      keyToRefresh
    );
    return {
      user: getData(user, ["name", "email"]),
      accessToken,
      refreshToken,
    };
  },
};
