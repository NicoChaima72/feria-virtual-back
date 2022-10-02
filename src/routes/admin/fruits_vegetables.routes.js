const express = require("express");
const router = express.Router();
const request = require("../../requests/admin/fruits_vegetables.request");
const controller = require("../../controllers/admin/fruits_vegetables.controller");

router.get("/", controller.index);
router.post("/", request.storeAndUpdate, controller.store);
router.get("/:fruit_vegetable_id", controller.show);
router.put("/:fruit_vegetable_id", request.storeAndUpdate, controller.update);

module.exports = router;
