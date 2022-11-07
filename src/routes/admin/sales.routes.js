const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/sales.controller");
const request = require("../../requests/admin/sales.request");

router.get("/", controller.index);
router.get("/:sale_id", controller.show);
router.get("/:sale_id/history", controller.history);
router.patch("/:sale_id/cancel", request.cancel, controller.cancel);
router.patch("/:sale_id/accept", request.accept, controller.accept);

router.get("/:sale_id/auctions", controller.indexAuctions);
router.post(
  "/:sale_id/auctions/add-confirm",
  request.storeConfirm,
  controller.storeConfirm
);

router.get('/:sale_id/auctions/producer', controller.indexAuctionsForTransportist)
router.patch('/:sale_id/auctions/transportist/start', request.startAuctionTransportist, controller.startAuctionTransportist)
router.patch('/:sale_id/auctions/transportist/confirm', controller.confirmAuctionTransportist)

module.exports = router;
