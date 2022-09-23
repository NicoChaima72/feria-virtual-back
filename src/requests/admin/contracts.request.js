const validate = require("../request");

module.exports = {
  store: (req, res, next) => {
    const validationRule = {
      created_at: "required",
      expired_at: "required",
      user_id: "required|integer",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  update: (req, res, next) => {
    const validationRule = {
      name: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },
};
