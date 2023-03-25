"use strict";

const keyTokenSchema = require("../schemas/keyToken.schema");
class KeyTokenModel {
  static createKeyToken = async ({
    userId,
    keyToAccess,
    keyToRefresh,
    refreshToken,
  }) => {
    const key = await keyTokenSchema.findOneAndUpdate(
      { userId: userId },
      {
        keyToAccess,
        keyToRefresh,
        refreshTokensUsed: [],
        refreshToken,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return key ? key : null;
  };

  static findByUserId = async (userId) => {
    return await keyTokenSchema.findOne({ userId }).lean();
  };

  static removeKeyById = async (id) => {
    return await keyTokenSchema.deleteOne(id);
  };
}

module.exports = KeyTokenModel;
