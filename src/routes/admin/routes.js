const express = require("express");
const usersRoute = require('./users.routes')

const router = express.Router();

router.use("/users", usersRoute);

module.exports = router;
