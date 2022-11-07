const express = require("express");
const router = express.Router();
const request = require("../../requests/producers/auctions.request");
const controller = require("../../controllers/producers/auctions.controller");

router.get("/", controller.index);
router.get('/participate', controller.participate)
router.get("/:sale_id", controller.show);
router.post("/", request.store, controller.store);
// router.patch("/:sale_id/cancel", request.cancel, controller.cancel);
// router.get("/:fruit_vegetable_id", controller.show);
// router.put("/:fruit_vegetable_id", request.storeAndUpdate, controller.update);

module.exports = router;
