const passport = require("passport");

exports.authenticationRequired = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err)
      return res
        .status(401)
        .json({ ok: false, message: "El token es necesario" });

    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "El token no es valido" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

exports.notAuthenticationRequired = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (user)
      return res
        .status(401)
        .json({ ok: false, message: "Ya estás autenticado" });

    next();
  })(req, res, next);
};
