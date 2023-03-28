"use strict";
const bcrpyt = require("bcrypt");
const UserSchema = require("../schemas/user.schema");
const crypto = require("crypto");
const { AuthFailureError } = require("../core/error.response");
const { createKeyToken, removeKeyById } = require("./keyToken.model");
const { createTokenPair } = require("../auth/authUtil");
const { getData } = require("../utils/HandleObject");

module.exports = {
  register: async (user) => {
    const newUser = await UserSchema(user).save();
    return newUser;
  },

  login: async ({ email, password }) => {
    const user = await UserSchema.findOne({ email }).lean();
    if (!user) throw new AuthFailureError("The Email or Password is not true");
    const match = await bcrpyt.compare(password, user.password);
    if (!match) throw new AuthFailureError("The Email or Password is not true");

    // create key pair to create JWT
    const keyToAccess = crypto.randomBytes(64).toString("hex");
    const keyToRefresh = crypto.randomBytes(64).toString("hex");
    // console.table([keyToAccess, keyToRefresh]);

    // creat token pair
    const { accessToken, refreshToken } = await createTokenPair(
      { name: user.name, id: user._id },
      keyToAccess,
      keyToRefresh
    );
    // Save to db
    const keyStore = await createKeyToken({
      userId: user._id,
      keyToAccess,
      keyToRefresh,
      refreshToken,
    });
    if (!keyStore) throw new BadRequestError("Create Key Error");

    return {
      user: getData(user, ["_id", "name", "email"]),
      accessToken,
      refreshToken,
    };
  },

  // logout:
  logout: async (keyStore) => {
    const keyDel = await removeKeyById(keyStore._id);
    return keyDel;
  },
};
