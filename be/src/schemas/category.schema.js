const mongoose = require("mongoose"); // Erase if already required
const dataConfig = require("../configs/config.database");

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model(dataConfig.colCategory, CategorySchema);
