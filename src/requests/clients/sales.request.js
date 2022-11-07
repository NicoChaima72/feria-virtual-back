const validate = require("../request");

module.exports = {
  storeAndUpdate: (req, res, next) => {
    const validationRule = {
      client_id: "required",
      status_id: "required",
      status_payment_id: "required",
      // message: "required",
      sale__fruits_vegetables: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  cancel: (req, res, next) => {
    const validationRule = {
      status_id: "required",
      observations: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },
};
