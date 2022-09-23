const validator = require("../helpers/validate");

module.exports = (data, rules, customMessages, req, res, next) => {
  const value = validator(data, rules, customMessages, (err, result) => {
    if (err) {
      return res.status(400).json({ ok: false, err: { fields: err } });
    }

    next();
  });
};
