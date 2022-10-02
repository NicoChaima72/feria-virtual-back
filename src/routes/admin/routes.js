const express = require("express");
const usersRoute = require('./users.routes')
const fruitsVegetablesRoute = require('./fruits_vegetables.routes');

const router = express.Router();

router.use("/users", usersRoute);

router.use("/fruits_vegetables", fruitsVegetablesRoute);

module.exports = router;
