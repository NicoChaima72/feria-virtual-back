const validate = require("../request");

module.exports = {
  storeAdminAndConsultant: (req, res, next) => {
    const validationRule = {
      name: "required|max:100",
      email: "required|email|max:100",
      role_id: "required|integer",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  storeProducerAndLocal: (req, res, next) => {
    const validationRule = {
      name: "required|max:100",
      email: "required|email|max:100",
      rut: "required|max:20",
      business_name: "required|max:50",
      region: "required|max:50",
      commune: "required|max:50",
      street: "required|max:100",
      direction_url: "required|max:255",
      phone: "required|max:20",
      contract_expired_at: "required|max:10",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },
  storeExternals: (req, res, next) => {
    const validationRule = {
      name: "required|max:100",
      email: "required|email|max:100",
      rut: "required|max:20",
      business_name: "required|max:50",
      country: "required|max:50",
      region: "required|max:50",
      commune: "required|max:50",
      street: "required|max:100",
      direction_url: "required|max:255",
      phone: "required|max:20",
      contract_expired_at: "required|max:10",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  storeTransportist: (req, res, next) => {
    const validationRule = {
      name: "required|max:100",
      email: "required|email|max:100",
      rut: "required|max:20",
      business_name: "required|max:50",
      phone: "required|max:20",
      type_id: "required|integer",
      contract_expired_at: "required|max:10",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  update: (req, res, next) => {
    const validationRule = {
      name: "required",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  updateAdminAndConsultant: (req, res, next) => {
    const validationRule = {
      name: "required|max:100",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  updateProducerAndLocal: (req, res, next) => {
    const validationRule = {
      name: "required|max:100",
      rut: "required|max:20",
      business_name: "required|max:50",
      region: "required|max:50",
      commune: "required|max:50",
      street: "required|max:100",
      direction_url: "required|max:255",
      phone: "required|max:20",
      contract_expired_at: "required|max:10",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  updateExternals: (req, res, next) => {
    const validationRule = {
      name: "required|max:100",
      rut: "required|max:20",
      business_name: "required|max:50",
      country: "required|max:50",
      region: "required|max:50",
      commune: "required|max:50",
      street: "required|max:100",
      direction_url: "required|max:255",
      phone: "required|max:20",
      contract_expired_at: "required|max:10",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  updateTransportist: (req, res, next) => {
    const validationRule = {
      name: "required|max:100",
      rut: "required|max:20",
      business_name: "required|max:50",
      phone: "required|max:20",
      type_id: "required|integer",
      contract_expired_at: "required|max:10",
    };

    return validate(req.body, validationRule, {}, req, res, next);
  },

  changePassword: (req, res, next) => {
    const validationRule = {
      password: "required|confirmed",
      password_confirmation: "required",
    };

    const customMessages = {
      "confirmed.password": "Las contraseñas no coinciden",
    };

    return validate(req.body, validationRule, customMessages, req, res, next);
  },
};
