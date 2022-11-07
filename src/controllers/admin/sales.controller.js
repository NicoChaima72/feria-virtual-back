const e = require("express");
const { responseErrorField } = require("../../helpers/helpers");
const Auction = require("../../models/auction.model");
const FruitVegetable = require("../../models/fruit_vegetable.model");
const Sale = require("../../models/sale.model");
const User = require("../../models/user.model");

module.exports = {
  index: async (req, res) => {
    const sales = await Sale.getAll();
    return res.json({ ok: true, sales });
  },

  indexAuctions: async (req, res) => {
    const { sale_id } = req.params;
    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    const auctions = await Auction.getBySale(sale.id);

    // console.log(auctions);

    return res.json({ ok: true, auctions });
  },

  indexAuctionsForTransportist: async (req, res) => {
    const { sale_id } = req.params;
    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    const auctions = await sale.getAuctionsForTransportist();

    return res.json({ ok: true, auctions });
  },

  storeConfirm: async (req, res) => {
    const { sale_id } = req.params;
    const { data } = req.body;
    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    data.data.map(
      async (d) =>
        await sale.addAuctionProducerConfirm(
          d.auction_sale_id,
          d.user_id,
          d.fruit_vegetable_id,
          d.quantity,
          d.price
        )
    );

    return res.json({ ok: true, data });
  },

  show: async (req, res) => {
    const { sale_id } = req.params;
    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    return res.json({ ok: true, sale });
  },

  history: async (req, res) => {
    const { sale_id } = req.params;
    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    const history = await sale.getHistory();

    return res.json({ ok: true, history });
  },

  cancel: async (req, res) => {
    const { sale_id } = req.params;
    const { status_id, observations } = req.body;

    const sale = await Sale.getById(sale_id);

    if (!sale) {
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });
    }

    await sale.cancelSale(status_id, observations);

    return res.json({ ok: true });
  },

  accept: async (req, res) => {
    const { sale_id } = req.params;
    const { auction_duration } = req.body;

    const sale = await Sale.getById(sale_id);

    if (!sale) {
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });
    }

    const auction = await sale.acceptSaleAdmin(auction_duration);

    return res.json({ ok: true });
  },

  startAuctionTransportist: async (req, res) => {
    const { sale_id } = req.params;
    const { auction_duration } = req.body;

    const sale = await Sale.getById(sale_id);

    if (!sale) {
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });
    }

    const auction = await sale.startAuctionTransportist(auction_duration);

    return res.json({ ok: true });
  },

  confirmAuctionTransportist: async (req, res) => {
    const { sale_id } = req.params;
    const { confirm_id } = req.body;

    const sale = await Sale.getById(sale_id);

    if (!sale) {
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });
    }

    await sale.confirmAuctionTransportist(confirm_id);

    return res.json({ ok: true });
  },
};
