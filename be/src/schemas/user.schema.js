"use  strict";

const { model, Schema } = require("mongoose");
const databaseConfig = require("../configs/config.database");
const bcrypt = require("bcrypt");

// Declare the Schema of the Mongo model
var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPassToken: {
    type: String,
  },
  resetPassTokenExp: String,
});

UserSchema.pre("save", async function (next) {
  const saltRound = 10;
  const newPassword = await bcrypt.hash(this.password, saltRound);
  this.password = newPassword;
  next();
});

//Export the model
module.exports = model(databaseConfig.colUsers, UserSchema);
