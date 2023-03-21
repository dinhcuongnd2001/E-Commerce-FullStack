"use strict";

const mongoose = require("mongoose");
const {
  db: { host, name, port },
} = require("../configs/config.mongodb");
const { countConnect } = require("../helper/checkConnect");
const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (process.env.NODE_ENV == "dev") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString, {
        maxPoolsize: 50,
      })
      .then((_) =>
        console.log("Connected Mongodb Success with", countConnect())
      )
      .catch((err) => console.log("Error Connect"));
  }
  static getInstance() {
    if (!Database.instance) {
      console.log("database is new");
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
