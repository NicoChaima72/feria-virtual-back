const { responseErrorField } = require("../../helpers/helpers");
const FruitVegetable = require("../../models/fruit_vegetable.model");

module.exports = {
  index: async (req, res) => {
    const fruitsVegetables = await FruitVegetable.getAll();
    console.log(fruitsVegetables);
    return res.json({ ok: true, fruitsVegetables: fruitsVegetables });
  },
  store: async (req, res) => {
    const { name } = req.body;

    const fruitVegetableExist = await FruitVegetable.getByName(name);

    if (fruitVegetableExist)
      return res
        .status(400)
        .json(responseErrorField("name", "El nombre ya está registrado"));

    const fruitVegetable = await FruitVegetable.create(name);

    return res.json({ ok: true, fruitVegetable: fruitVegetable });
  },

  show: async (req, res) => {
    const { fruit_vegetable_id } = req.params;
    const fruitVegetable = await FruitVegetable.getById(fruit_vegetable_id);

    if (!fruitVegetable)
      return res
        .status(400)
        .json({ ok: false, err: { message: "La fruta o verdura no existe" } });

    return res.json({ ok: true, fruitVegetable });
  },

  update: async (req, res) => {
    const { fruit_vegetable_id } = req.params;
    const { name } = req.body;
    const fruitVegetable = await FruitVegetable.getById(fruit_vegetable_id);

    if (!fruitVegetable)
      return res
        .status(400)
        .json({ ok: false, err: { message: "Fruta o verdura no encontrada" } });

    const fruitVegetableExist = await FruitVegetable.getByName(name);

    if (fruitVegetableExist && fruitVegetable.id !== fruitVegetableExist.id)
      return res
        .status(400)
        .json(responseErrorField("name", "El nombre ya está registrado"));

    const result = await fruitVegetable.update(name);

    return res.json({ ok: true, fruitVegetable, result });
  },
};
