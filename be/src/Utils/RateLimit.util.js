const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10012, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

module.exports = limiter;
