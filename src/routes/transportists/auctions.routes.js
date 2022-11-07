const express = require("express");
const router = express.Router();
const request = require("../../requests/transportists/auctions.request");
const controller = require("../../controllers/transportists/auctions.controller");

router.get("/", controller.index);
router.get("/participate", controller.participate);
router.get("/orders-transportist", controller.indexOrdersByTransportist);
router.patch("/orders-transportist/:sale_id", controller.updateStatus);
router.get("/:sale_id", controller.showSale);
router.get("/:sale_id/auctions", controller.show);
router.post("/:sale_id/auctions", controller.store);
router.get("/:sale_id/auctions/confirm", controller.showConfirm);

module.exports = router;
