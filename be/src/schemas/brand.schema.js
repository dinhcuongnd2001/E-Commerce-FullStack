const mongoose = require("mongoose");
const dataConfig = require("../configs/config.database");

var BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model(dataConfig.colBrand, BrandSchema);
