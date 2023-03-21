"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;

// count connect

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  return numConnection;
};

// check overload

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // Example maximun number of connection based on number of cores
    const maxConnection = numCores * 5;
    console.log("Action Connect:: ", numConnection);
    console.log(`Memoroy usage:: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnection > maxConnection) {
      console.log("Connection overload detected!");
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
