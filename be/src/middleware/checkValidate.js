const { validationResult } = require("express-validator");
module.exports = {
  checkValidate: (req, res, next) => {
    console.log(req.body);
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const formatError = err.array().map((each) => ({
        [each.param]: each.msg,
      }));
      return res.status(400).json({ errors: formatError });
    }
    next();
  },
};
