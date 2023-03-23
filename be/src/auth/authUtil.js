"use strict";
const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, keyToAccess, keyToRefresh) => {
  const accessToken = await JWT.sign(payload, keyToAccess, {
    expiresIn: "30m",
  });

  const refreshToken = await JWT.sign(payload, keyToRefresh, {
    expiresIn: "2 days",
  });

  return { accessToken, refreshToken };
};

module.exports = {
  createTokenPair,
};
