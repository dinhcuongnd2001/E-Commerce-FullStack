const { validationResult } = require("express-validator");
const { ConflictRequestError } = require("../core/error.response");
module.exports = {
  checkValidate: (req, res, next) => {
    console.log(req.body);
    const err = validationResult(req);
    if (!err.isEmpty()) {
      // let strErr = "";
      // const formatError = err.array().map((each) => {
      //   return
      //   [each.param]: each.msg,
      // });
      let strError = `${err.array()[0].msg}`;
      throw new ConflictRequestError(strError);
    }
    next();
  },
};
