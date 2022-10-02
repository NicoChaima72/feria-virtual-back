const BD = require("../database/database");

class FruitVegetable {
  constructor(args) {
    this.id = args[0];
    this.name = args[1];
  }

  static async getAll() {
    let fruitsVegetables = await BD.execute("GET_FRUITS_VEGETABLES()");

    return fruitsVegetables.map(
      (fruitVegetable) => new FruitVegetable(fruitVegetable)
    );
  }

  static async getByName(name) {
    let fruitVegetable = await BD.execute(
      "GET_FRUIT_VEGETABLE_BY_NAME(:p_name)",
      {
        p_name: name,
      }
    );

    if (!fruitVegetable[0]) return null;
    return new FruitVegetable(fruitVegetable[0]);
  }
  static async getById(id) {
    let fruitVegetable = await BD.execute("GET_FRUIT_VEGETABLE_BY_ID(:p_id)", {
      p_id: id,
    });

    if (!fruitVegetable[0]) return null;
    return new FruitVegetable(fruitVegetable[0]);
  }

  static async create(name) {
    let sql = "ADD_FRUIT_VEGETABLE(:p_name)";

    let fruitVegetable = await BD.execute(sql, {
      p_name: name,
    });

    if (!fruitVegetable[0]) return null;

    fruitVegetable = new FruitVegetable(fruitVegetable[0]);

    return fruitVegetable;
  }

  async update(name) {
    const fruitVegetable = this;
    let sql = "EDIT_FRUIT_VEGETABLE(:p_id, :p_name)";
    const result = await BD.execute(sql, {
      p_id: fruitVegetable.id,
      p_name: name,
    });

    return new FruitVegetable(result[0]);
  }
}

module.exports = FruitVegetable;
