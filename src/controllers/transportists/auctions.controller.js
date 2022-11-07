const Sale = require("../../models/sale.model");
const User = require("../../models/user.model");

module.exports = {
  index: async (req, res) => {
    const sales = await Sale.getOrdersForTransportist(req.user.id);

    return res.json({ ok: true, sales });
  },

  indexOrdersByTransportist: async (req, res) => {
    const orders = await Sale.getOrdersByTransportist(req.user.id);

    return res.json({ ok: true, orders });
  },

  store: async (req, res) => {
    const { sale_id } = req.params;
    const { message, price } = req.body;

    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    await sale.createAuctionTransportist(req.user.id, message, price);

    return res.json({ ok: true });
  },

  showSale: async (req, res) => {
    const { sale_id } = req.params;
    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    return res.json({ ok: true, sale });
  },

  show: async (req, res) => {
    const { sale_id } = req.params;
    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    const auctions = await sale.getAuctionsForTransportist();

    return res.json({ ok: true, auctions });
  },
  showConfirm: async (req, res) => {
    const { sale_id } = req.params;
    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    const auctions = await sale.getAuctionsTransportistConfirm();

    return res.json({ ok: true, auctions });
  },

  updateStatus: async (req, res) => {
    const { sale_id } = req.params;
    const { status_id } = req.body;

    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    await sale.changeStatus(status_id);

    return res.json({ ok: true, sale });
  },
  participate: async (req, res) => {
    const ids = await Sale.getIdsParticipateAuctionTransportist(req.user.id);
    
    return res.json({ ok: true, ids });
  },

  // show: async (req, res) => {
  //   const { sale_id } = req.params;
  //   const sale = await Sale.getById(sale_id);

  //   if (!sale)
  //     return res
  //       .status(400)
  //       .json({ ok: false, err: { message: "Pedido no encontrado" } });

  //   return res.json({ ok: true, sale });
  // },

  // store: async (req, res) => {
  //   const { fruits_vegetables, message, sale_id } = req.body;

  //   const sale = await Sale.getById(sale_id);

  //   if (!sale)
  //     return res
  //       .status(400)
  //       .json({ ok: false, err: { message: "Pedido no encontrado" } });

  //   await sale.addAuctionProducer(req.user.id, message, fruits_vegetables);

  //   return res.json({ ok: true, sale_id, fruits_vegetables, message });
  // },
};
