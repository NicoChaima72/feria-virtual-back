const express = require("express");
const auctionsRoute = require("./auctions.routes");

const router = express.Router();

router.use("/auctions", auctionsRoute);

module.exports = router;
