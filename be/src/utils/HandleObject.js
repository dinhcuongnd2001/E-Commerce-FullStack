const _ = require("lodash");

module.exports = {
  getData: (obj = {}, field = []) => {
    return _.pick(obj, field);
  },
};
