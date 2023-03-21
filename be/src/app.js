const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();

const app = express();
const limiter = require("./utils/RateLimit.util");

// MiddleWare
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

// Connect DataBase

require("./dbs/init.mongodb");
const { checkOverload } = require("./helper/checkConnect");
// checkOverload();
// Router

app.get("/", (req, res, next) => {
  const strShow = "Hello ae";
  return res.status(500).json({
    message: "welcome back",
    metadata: strShow.repeat(10000),
  });
});

// Handle Error

module.exports = app;
