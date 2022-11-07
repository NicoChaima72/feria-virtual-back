const express = require("express");
const router = express.Router();

const adminRoute = require("./admin/routes");
const authRoute = require("./auth.routes");
const clientsRoute = require("./clients/routes");
const producersRoute = require("./producers/routes");
const transportistsRoute = require("./transportists/routes");

const { authenticationRequired } = require("../middlewares/auth.middleware");

// TODO: Crear middleware validar role
router.use("/admin", authenticationRequired, adminRoute);
router.use("/clients", authenticationRequired, clientsRoute);
router.use("/producers", authenticationRequired, producersRoute);
router.use("/transportists", authenticationRequired, transportistsRoute);
// router.use("/admin",  adminRoute);
router.use("/auth", authRoute);

module.exports = router;
