"use strict";

const keyTokenSchema = require("../schemas/keyToken.schema");

class KeyTokenModel {
  static createKeyToken = async ({ userId, keyToAccess, keyToRefresh }) => {
    const key = await keyTokenSchema.create({
      userId,
      keyToAccess,
      keyToRefresh,
    });

    return key ? key : null;
  };
}

module.exports = KeyTokenModel;
