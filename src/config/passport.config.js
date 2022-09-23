const passport = require("passport");
const User = require("../models/user.model");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwt_payload, done) {
      const user = await User.getById(jwt_payload.id);

      if (!user) return done(null, false);

      return done(null, user);
    }
  )
);
