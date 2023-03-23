// Luu tru Key theo id de verify token

"use strict";

const { Schema, model } = require("mongoose"); // Erase if already required
const databaseConfig = require("../configs/config.database");

// Declare the Schema of the Mongo model
var KeyTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "users",
  },
  keyToRefresh: {
    type: String,
    required: true,
  },
  keyToAccess: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: Array,
    default: [],
  },
});

//Export the model
module.exports = model(databaseConfig.colKeyToken, KeyTokenSchema);
