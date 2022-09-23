const validate = require("./request");

module.exports = {
  login: (req, res, next) => {
    const validationRule = {
      email: "required|email",
      password: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },
};
