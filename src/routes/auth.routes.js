const express = require("express");
const router = express.Router();
const request = require("../requests/auth.request");
const controller = require("../controllers/auth.controller");
const { authenticationRequired } = require("../middlewares/auth.middleware");

router.post("/login", request.login, controller.login);
router.get("/renew", authenticationRequired, controller.renew);

// router.post("/", request.store, controller.store);

module.exports = router;
