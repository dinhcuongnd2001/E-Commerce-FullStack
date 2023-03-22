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

module.exports = app;
