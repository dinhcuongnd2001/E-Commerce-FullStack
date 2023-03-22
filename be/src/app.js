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
app.use(express.json());

// Connect DataBase

require("./dbs/init.mongodb");
const { checkOverload } = require("./helper/checkConnect");
// checkOverload();

// Router

app.use("/", require("./routes/index"));

// Handle Error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    status: "error",
    code: status,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
