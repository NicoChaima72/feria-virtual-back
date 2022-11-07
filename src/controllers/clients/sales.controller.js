const FruitVegetable = require("../../models/fruit_vegetable.model");
const Sale = require("../../models/sale.model");

module.exports = {
  indexAll: async (req, res) => {
    const sales = await Sale.getAll();
    return res.json({ ok: true, sales });
  },
  indexByUser: async (req, res) => {
    const sales = await Sale.getByUser(req.user.id);

    return res.json({ ok: true, sales });
  },
  store: async (req, res) => {
    const { status_id, status_payment_id, message, sale__fruits_vegetables } =
      req.body;

    const sale = await Sale.create(
      req.user.id,
      status_id,
      status_payment_id,
      message
    );

    await sale.addFruitsVegetables(sale__fruits_vegetables);

    return res.json({ ok: true, sale });
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

  showAuctionsConfirm: async (req, res) => {
    const { sale_id } = req.params;
    const sale = await Sale.getById(sale_id);

    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    let result = await sale.getAuctionProducerResult();

    return res.json({ ok: true, result });
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

  acceptAuctionProducer: async (req, res) => {
    const { sale_id } = req.params;

    const sale = await Sale.getById(sale_id);
    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    await sale.changeStatus(8);

    return res.json({ ok: true });
  },

  acceptAuctionTransportist: async (req, res) => {
    const { sale_id } = req.params;

    const sale = await Sale.getById(sale_id);
    if (!sale)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Pedido no encontrado" } });

    await sale.changeStatus(13);

    return res.json({ ok: true });
  },

};
