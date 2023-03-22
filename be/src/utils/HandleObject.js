const _ = require("lodash");

module.exports = {
  getField: (obj = {}, field = []) => {
    return _.pick(obj, field);
  },
};
