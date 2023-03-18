const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const limiter = require("./Utils/RateLimit.util");
const app = express();
// MiddleWare
app.use(morgan("dev"));
app.use(helmet());
app.use(limiter());
app.use(cors());

// Connect DataBase

// Handle Error
