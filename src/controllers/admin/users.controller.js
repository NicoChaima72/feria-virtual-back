const User = require("../../models/user.model");
const uniqid = require("uniqid");
const { isEmpty, responseErrorField } = require("../../helpers/helpers");
const { sendMailRegisterUser } = require("../../helpers/mails");

module.exports = {
  indexByRole: (role_id) => {
    return async function (req, res, next) {
      const users = await User.getByRole(role_id);
      return res.json({ ok: true, users });
    };
  },

  storeAdminAndConsultant: async (req, res) => {
    const { name, email, role_id } = req.body;

    if (![1, 21].includes(Number(role_id)))
      return res.status(403).json({
        ok: false,
        message: "No puedes agregar usuarios con estos roles",
      });

    const emailExist = await User.getByEmail(email);
    if (emailExist)
      return res
        .status(400)
        .json(responseErrorField("email", "El email ya está registrado"));

    const password = uniqid();
    const user = await User.createAdminAndConsultant(
      name,
      email,
      password,
      role_id
    );

    return res.json({ ok: true, user });
  },

  storeLocal: async (req, res) => {
    const {
      name,
      email,
      rut,
      business_name,
      region,
      commune,
      street,
      observations,
      direction_url,
      phone,
      contract_expired_at,
    } = req.body;

    const emailExist = await User.getByEmail(email);
    if (emailExist)
      return res
        .status(400)
        .json(responseErrorField("email", "El email ya está registrado"));

    const password = uniqid();
    const user = await User.createLocal(
      name,
      email,
      password,
      rut,
      business_name,
      region,
      commune,
      street,
      observations || "",
      direction_url,
      phone,
      contract_expired_at
    );

    if (!user)
      return res.status(400).json({
        ok: false,
        err: { message: "Algo ha salido mal, intenta más tarde" },
      });

    const confirmUrl = `${req.headers.appurl}`;
    await sendMailRegisterUser(user, password, confirmUrl);

    return res.json({ ok: true, user });
  },

  storeExternal: async (req, res) => {
    const {
      name,
      email,
      rut,
      business_name,
      country,
      region,
      commune,
      street,
      observations,
      direction_url,
      phone,
      contract_expired_at,
    } = req.body;

    const emailExist = await User.getByEmail(email);
    if (emailExist)
      return res
        .status(400)
        .json(responseErrorField("email", "El email ya está registrado"));

    const password = uniqid();
    const user = await User.createExternal(
      name,
      email,
      password,
      rut,
      business_name,
      country,
      region,
      commune,
      street,
      observations || "",
      direction_url,
      phone,
      contract_expired_at
    );

    if (!user)
      return res.status(400).json({
        ok: false,
        err: { message: "Algo ha salido mal, intenta más tarde" },
      });

    const confirmUrl = `${req.headers.appurl}`;
    await sendMailRegisterUser(user, password, confirmUrl);

    return res.json({ ok: true, user });
  },

  storeProducer: async (req, res) => {
    const {
      name,
      email,
      rut,
      business_name,
      region,
      commune,
      street,
      observations,
      direction_url,
      phone,
      contract_expired_at,
      fruits_vegetables,
    } = req.body;

    const emailExist = await User.getByEmail(email);
    if (emailExist)
      return res
        .status(400)
        .json(responseErrorField("email", "El email ya está registrado"));

    const password = uniqid();
    const user = await User.createProducer(
      name,
      email,
      password,
      rut,
      business_name,
      region,
      commune,
      street,
      observations || "",
      direction_url,
      phone,
      contract_expired_at
    );

    if (!user)
      return res.status(400).json({
        ok: false,
        err: { message: "Algo ha salido mal, intenta más tarde" },
      });

    if (fruits_vegetables) {
      await user.addFruitsVegetables(fruits_vegetables);
    }

    const confirmUrl = `${req.headers.appurl}`;
    await sendMailRegisterUser(user, password, confirmUrl);

    return res.json({ ok: true, user });
  },

  storeTransportist: async (req, res) => {
    const {
      name,
      email,
      rut,
      business_name,
      phone,
      type_id,
      contract_expired_at,
    } = req.body;

    const emailExist = await User.getByEmail(email);
    if (emailExist)
      return res
        .status(400)
        .json(responseErrorField("email", "El email ya está registrado"));

    const password = uniqid();

    const user = await User.createTransportist(
      name,
      email,
      password,
      rut,
      business_name,
      phone,
      type_id,
      contract_expired_at
    );

    if (!user)
      return res.status(400).json({
        ok: false,
        err: { message: "Algo ha salido mal, intenta más tarde" },
      });

    const confirmUrl = `${req.headers.appurl}`;
    await sendMailRegisterUser(user, password, confirmUrl);

    return res.json({ ok: true, user });
  },

  show: async (req, res) => {
    const { user_id, role_id } = req.params;

    const user = await User.getById(user_id);

    if (!user)
      return res
        .status(400)
        .json({ ok: false, err: { message: "El usuario no existe" } });

    if (user.role_id != role_id)
      return res
        .status(400)
        .json({ ok: false, err: { message: "El usuario no existe" } });

    return res.json({ ok: true, user });
  },

  updateContract: async (req, res) => {
    const { user_id } = req.params;
    const { expired_at } = req.body;

    const user = await User.getById(user_id);

    if (!user)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Usuario no encontrado" } });

    if (user.role_id == 1 || user.role_id == 21)
      return res.status(403).json({
        ok: false,
        err: { message: "No puedes realizar esta accion" },
      });

    const contract = await user.updateContract(expired_at);

    return res.json({ ok: true, contract });
  },

  updateAdminAndConsultant: async (req, res) => {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.getById(user_id);

    if (!user)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Usuario no encontrado" } });

    if (![1, 21].includes(Number(user.role_id)))
      return res.status(403).json({
        ok: false,
        err: { message: "No puedes actualizar estos roles" },
      });

    const result = await user.updateAdminAndConsultant(name);

    return res.json({ ok: true, user, result });
  },

  updateLocal: async (req, res) => {
    const { user_id } = req.params;
    const {
      name,
      rut,
      business_name,
      region,
      commune,
      street,
      direction_url,
      observations,
      phone,
      contract_expired_at,
    } = req.body;

    const user = await User.getById(user_id);

    if (!user)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Usuario no encontrado" } });

    if (Number(user.role_id) !== 2)
      return res.status(403).json({
        ok: false,
        err: { message: "No puedes actualizar este rol" },
      });

    const result = await user.updateLocal(
      name,
      rut,
      business_name,
      region,
      commune,
      street,
      observations,
      direction_url,
      phone,
      contract_expired_at
    );

    return res.json({ ok: true, user, result });
  },

  updateExternal: async (req, res) => {
    const { user_id } = req.params;
    const {
      name,
      rut,
      business_name,
      country,
      region,
      commune,
      street,
      direction_url,
      observations,
      phone,
      contract_expired_at,
    } = req.body;

    // console.log();

    const user = await User.getById(user_id);

    if (!user)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Usuario no encontrado" } });

    if (Number(user.role_id) !== 3)
      return res.status(403).json({
        ok: false,
        err: { message: "No puedes actualizar este rol" },
      });

    const result = await user.updateExternal(
      name,
      rut,
      business_name,
      country,
      region,
      commune,
      street,
      observations,
      direction_url,
      phone,
      contract_expired_at
    );

    return res.json({ ok: true, user, result });
  },

  updateProducer: async (req, res) => {
    const { user_id } = req.params;
    const {
      name,
      rut,
      business_name,
      region,
      commune,
      street,
      direction_url,
      observations,
      phone,
      fruits_vegetables,
      contract_expired_at,
    } = req.body;

    const user = await User.getById(user_id);

    if (!user)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Usuario no encontrado" } });

    if (Number(user.role_id) !== 4)
      return res.status(403).json({
        ok: false,
        err: { message: "No puedes actualizar este rol" },
      });

    const result = await user.updateProducer(
      name,
      rut,
      business_name,
      region,
      commune,
      street,
      observations,
      direction_url,
      phone,
      contract_expired_at
    );

    await user.deleteFruitsVegetables();
    if (fruits_vegetables) {
      await user.addFruitsVegetables(fruits_vegetables);
    }

    return res.json({ ok: true, user, result });
  },

  updateTransportist: async (req, res) => {
    const { user_id } = req.params;
    const { name, rut, business_name, phone, type_id, contract_expired_at } =
      req.body;

    const user = await User.getById(user_id);

    if (!user)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Usuario no encontrado" } });

    if (Number(user.role_id) !== 5)
      return res.status(403).json({
        ok: false,
        err: { message: "No puedes actualizar este rol" },
      });

    const result = await user.updateTransportist(
      name,
      rut,
      business_name,
      phone,
      type_id,
      contract_expired_at
    );

    return res.json({ ok: true, user, result });
  },

  changeStatus: async (req, res) => {
    const { user_id } = req.params;

    const user = await User.getById(user_id);

    if (!user)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Usuario no encontrado" } });

    if (Number(user.role_id) === 1)
      return res.status(403).json({
        ok: false,
        err: { message: "No puedes actualizar este rol" },
      });

    const result = await user.changeStatus(user.status == 1 ? 0 : 1);

    return res.json({ ok: true, user, result });
  },

  changePassword: async (req, res) => {
    // TODO: CAMBIAR AL USUARIO LOGUEADO
    const { user_id } = req.params;

    const user = await User.getById(user_id);

    const result = await user.changePassword(password);

    return res.json({ ok: true, user, result });
  },
};
