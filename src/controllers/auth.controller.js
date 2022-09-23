const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.getByEmail(email);

    if (!user)
      return res.status(403).json({
        ok: false,
        err: { message: "Usuario y/o contraseña incorrecta" },
      });

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword)
      return res.status(403).json({
        ok: false,
        err: { message: "Usuario y/o contraseña incorrecta" },
      });

    const payload = { id: user.id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    delete user.password;

    return res.json({ ok: true, token: "Bearer " + token, user });
  },

  renew: async (req, res) => {
    const payload = { id: req.user.id };
    const token = jwt.sign(payload, "top_secret", { expiresIn: "1d" });

    return res.json({ ok: true, token: "Bearer " + token, user: req.user });
  },
};
