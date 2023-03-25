"use strict";
const JWT = require("jsonwebtoken");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { asyncHandler } = require("../middleware/handleError");
const { findByUserId } = require("../models/keyToken.model");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, keyToAccess, keyToRefresh) => {
  const accessToken = await JWT.sign(payload, keyToAccess, {
    expiresIn: "30m",
  });

  const refreshToken = await JWT.sign(payload, keyToRefresh, {
    expiresIn: "2 days",
  });

  return { accessToken, refreshToken };
};

const authetication = asyncHandler(async (req, res, next) => {
  /*
      1.Check userId missing.
      2. get AccessToken
      3. verifyToken
      4. check user in dbs?
      5. check keyStore with this userId.
      6. Ok all => return next()
    */
  // 1
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request");
  // 2

  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found keystore");
  // 3
  console.log("req.header", req.headers);
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid AccessToken");
  const token = accessToken.split(" ")[1];
  // console.log("token:: ", token);
  try {
    const decodeUser = JWT.verify(token, keyStore.keyToAccess);
    if (userId !== decodeUser.id) throw new AuthFailureError("Invalid UserId");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createTokenPair,
  authetication,
};
