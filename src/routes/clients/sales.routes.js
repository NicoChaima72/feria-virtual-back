const express = require("express");
const router = express.Router();
const request = require("../../requests/clients/sales.request");
const controller = require("../../controllers/clients/sales.controller");

router.get("/", controller.indexByUser);
router.get("/:sale_id", controller.show);
router.post("/", request.storeAndUpdate, controller.store);
router.patch("/:sale_id/cancel", request.cancel, controller.cancel);
router.get("/:sale_id/auctions-producer", controller.showAuctionsConfirm);
router.patch("/:sale_id/auctions-producer/accept", controller.acceptAuctionProducer);
router.patch("/:sale_id/auctions-transportist/accept", controller.acceptAuctionTransportist);

// router.get("/:sale_id/auctions-transportist/confirm", controller.showAuctionTransportistConfirm);
// router.get("/:fruit_vegetable_id", controller.show);
// router.put("/:fruit_vegetable_id", request.storeAndUpdate, controller.update);

module.exports = router;
