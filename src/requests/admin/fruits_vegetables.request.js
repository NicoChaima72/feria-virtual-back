const validate = require("../request");

module.exports = {
  storeAndUpdate: (req, res, next) => {
    const validationRule = {
      name: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },
};
