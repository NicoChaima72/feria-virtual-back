const express = require("express");
const morgan = require("morgan");
const routes = require("../routes/routes");
const cors = require("cors");
const passport = require("passport");

module.exports = (app) => {
  // settings
  app.set("port", process.env.PORT);

  // middlewares
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(passport.initialize());
  require("../config/passport.config");

  // routes
  app.use("/api", routes);

  return app;
};
