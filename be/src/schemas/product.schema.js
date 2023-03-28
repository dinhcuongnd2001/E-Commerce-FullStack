const { Schema, model } = require("mongoose");
const dataConfig = require("../configs/config.database");

var ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: Array,
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  price_old: {
    type: Number,
    required: true,
  },
  category: {
    id: {
      type: Schema.Types.ObjectId,
      ref: dataConfig.colCategory,
      required: true,
    },
    name: String,
  },
  description: {
    type: String,
  },
  like: {
    type: Number,
    default: 0,
  },
  brand: {
    id: {
      type: Schema.Types.ObjectId,
      ref: dataConfig.colBrand,
      require: true,
    },
    name: String,
  },
  size: {
    type: Array,
    default: [],
  },
});

//Export the model
module.exports = model(dataConfig.colProduct, ProductSchema);
