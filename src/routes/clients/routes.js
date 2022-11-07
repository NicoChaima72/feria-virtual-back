const express = require("express");
const salesRoute = require('./sales.routes');

const router = express.Router();

router.use("/sales", salesRoute);


module.exports = router;
