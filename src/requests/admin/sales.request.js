const validate = require("../request");

module.exports = {
  cancel: (req, res, next) => {
    const validationRule = {
      status_id: "required",
      observations: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  accept: (req, res, next) => {
    const validationRule = {
      auction_duration: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  storeConfirm: (req, res, next) => {
    const validationRule = {
      data: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  startAuctionTransportist: (req, res, next) => {
    const validationRule = {
      auction_duration: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },
};
