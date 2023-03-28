const mongoose = require("mongoose");
const fs = require("fs");
const {
  db: { host, name, port },
} = require("./src/configs/config.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`;

mongoose
  .connect(connectString)
  .then((_) => {
    console.log("connect cusseccess");
  })
  .catch((err) => {
    console.log(err);
  });

const categorySchema = require("./src/schemas/category.schema");
const brandSchema = require("./src/schemas/brand.schema");
const productSchema = require("./src/schemas/product.schema");

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/product.json`, "utf-8")
);

const importData = async () => {
  try {
    await productSchema.create(data);
    console.log("Data Import");
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await productSchema.deleteMany({});
    console.log("Delete all careers");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
