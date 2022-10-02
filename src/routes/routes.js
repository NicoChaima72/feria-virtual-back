const express = require("express");
const router = express.Router();

const adminRoute = require("./admin/routes");
const authRoute = require("./auth.routes");
const { authenticationRequired } = require("../middlewares/auth.middleware");

router.use("/admin", authenticationRequired,  adminRoute);
// router.use("/admin",  adminRoute);
router.use('/auth', authRoute)

module.exports = router;
