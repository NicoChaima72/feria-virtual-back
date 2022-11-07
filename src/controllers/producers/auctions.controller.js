const Sale = require("../../models/sale.model");

module.exports = {
  index: async (req, res) => {
    const sales = await Sale.getForProducer(req.user.id);
    console.log({ sales });
    return res.json({ ok: true, sales });
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

  store: async (req, res) => {
    const { fruits_vegetables, message, sale_id } = req.body;

    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    await sale.addAuctionProducer(req.user.id, message, fruits_vegetables);

    return res.json({ ok: true, sale_id, fruits_vegetables, message });
  },

  participate: async (req, res) => {
    const ids = await Sale.getIdsParticipateAuctionProducer(req.user.id);

    return res.json({ ok: true, ids });
  },
};
