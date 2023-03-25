"use strict";

const keyTokenSchema = require("../schemas/keyToken.schema");

class KeyTokenModel {
  static createKeyToken = async ({ userId, keyToAccess, keyToRefresh }) => {
    const key = await keyTokenSchema.findOneAndUpdate(
      { userId: userId },
      {
        keyToAccess,
        keyToRefresh,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return key ? key : null;
  };
}

module.exports = KeyTokenModel;
