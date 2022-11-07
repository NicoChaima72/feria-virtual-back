const validate = require("../request");

module.exports = {
  store: (req, res, next) => {
    const validationRule = {
      fruits_vegetables: "required",
      sale_id: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },
};
