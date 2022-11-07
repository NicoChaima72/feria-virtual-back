const BD = require("../database/database");
const moment = require("moment");
const FruitVegetable = require("./fruit_vegetable.model");
const User = require("./user.model");

class Sale {
  constructor(args, type) {
    this.id = args[0];
    this.status_id = args[1];
    this.Status = {
      id: args[1],
      description: args[2],
    };
    this.status_payment = args[3];
    this.StatusPayment = {
      id: args[3],
      description: args[4],
    };
    this.message = args[5];
    this.created_at = args[6];
    this.updated_at = args[7];
    this.observations = args[8];
    this.client_id = args[9];
    this.Client = {
      id: args[9],
      // role_id: args[10],
      rut: args[11],
      name: args[12],
      email: args[13],
      bussiness_name: args[14],
      region: args[15],
      commune: args[16],
      street: args[17],
      observations: args[18],
      direction_url: args[19],
      phone: args[20],
    };
    if (args[10] == 3) {
      this.Client.country = args[21];
    }

    if (type == "get") {
      // si está en subasta de productor
      if (args[1] == 4) {
        this.AuctionProducer = {
          ended_at: args[10] == 2 ? args[22] : args[23] || null,
        };
      }

      if (args[10] == 3) {
        this.Client.country = args[21];
        this.fruits_vegetables = args[22].split(",");
      } else {
        this.fruits_vegetables = args[21].split(",");
      }
    }

    // if (args[1] == 4) {
    //   this.AuctionProducer.duration = args[10] == 2 ? args[22] : args[23];
    // }
  }

  static async getAll() {
    let sql = "GET_SALES_LOCAL()";
    let sales = await BD.execute(sql);
    sales = sales.map((sale) => new Sale(sale, "get"));

    return sales;
  }

  static async getById(id) {
    let sql = "GET_SALE_BY_ID(:p_id)";
    let sale = await BD.execute(sql, { p_id: id });

    if (!sale[0]) return null;

    sale = new Sale(sale[0], "get");

    sql = "GET_FRUITS_VEGETABLES_BY_SALE(:p_sale_id)";
    let fv = await BD.execute(sql, { p_sale_id: id });
    fv = fv.map((f) => ({
      id: f[0],
      name: f[1],
      quantity: f[2],
      measurement: f[3],
    }));

    sale.FruitsVegetables = fv;

    return sale;
  }

  static async getByUser(user_id) {
    let sql = "GET_SALES_BY_USER(:p_user_id)";

    let sales = await BD.execute(sql, {
      p_user_id: user_id,
    });

    sales = sales.map((sale) => new Sale(sale, "get"));
    return sales;
  }

  static async getForProducer(producer_id) {
    let sql = "GET_SALES_FOR_PRODUCER(:p_producer_id)";

    let sales = await BD.execute(sql, {
      p_producer_id: producer_id,
    });

    sales = sales.map((sale) => new Sale(sale, "get"));
    return sales;
  }
  static async getOrdersForTransportist(transportist_id) {
    const sale = this;
    let sql = "GET_ORDERS_LOCALS_FOR_TRANSPORTIST(:p_transportist_id)";
    let orders = await BD.execute(sql, { p_transportist_id: transportist_id });
    orders = orders.map((sale) => new Sale(sale, "get"));

    return orders;
  }

  static async getOrdersByTransportist(transportist_id) {
    let sql = "GET_ORDERS_FOR_TRANSPORTIST(:p_transportist_id)";
    let sales = await BD.execute(sql, { p_transportist_id: transportist_id });
    sales = sales.map((sale) => new Sale(sale, "get"));
    return sales;
  }

  static async getIdsParticipateAuctionProducer(producer_id) {
    let sql = "GET_IDS_PARTICIPATE_AUCTION_PRODUCER(:p_producer_id)";
    let ids = await BD.execute(sql, { p_producer_id: producer_id });
    return ids.map(id => id[0]);
  }
  
  static async getIdsParticipateAuctionTransportist(transportist_id) {
    let sql = "GET_IDS_PARTICIPATE_AUCTION_TRANSPORTIST(:p_transportist_id)";
    let ids = await BD.execute(sql, { p_transportist_id: transportist_id });
    return ids.map(id => id[0]);
  }

  static async create(client_id, status_id, status_payment_id, message) {
    let sql =
      "ADD_SALE(:p_client_id, :p_status_id, :p_status_payment_id, :p_message)";

    let sale = await BD.execute(sql, {
      p_client_id: client_id,
      p_status_id: status_id,
      p_status_payment_id: status_payment_id,
      p_message: message,
    });

    if (!sale[0]) return null;

    sale = new Sale(sale[0], "store");

    return sale;
  }

  async addFruitsVegetables(fruits_vegetables) {
    const sale = this;
    let sql =
      "ADD_SALES__FRUITS_VEGETABLES(:p_sale_id, :p_fruit_vegetable_id, :p_quantity, :p_measurement)";
    for (const fv of fruits_vegetables) {
      await BD.execute(sql, {
        p_sale_id: sale.id,
        p_fruit_vegetable_id: fv.fruit_vegetable_id,
        p_quantity: fv.quantity,
        p_measurement: fv.measurement,
      });
    }
  }

  async cancelSale(status_id, observations) {
    const sale = this;
    let sql = "CANCEL_SALE(:p_sale_id, :p_status_id, :p_observations)";
    await BD.execute(sql, {
      p_sale_id: sale.id,
      p_status_id: status_id,
      p_observations: observations,
    });

    return true;
  }

  async acceptSaleAdmin(auction_duration) {
    const sale = this;
    let sql = "ACCEPT_SALE_ADMIN(:p_sale_id)";
    let auction = await BD.execute(sql, {
      p_sale_id: sale.id,
    });

    auction = auction[0][1];

    auction = moment(new Date(auction))
      .add(auction_duration, "hours")
      .format("DD/MM/YYYY HH:mm:ss");

    sql = "CHANGE_AUCTION_PRODUCER_DURATION(:p_sale_id, :p_ended_at)";
    auction = await BD.execute(sql, {
      p_sale_id: sale.id,
      p_ended_at: auction,
    });

    return true;
  }

  async startAuctionTransportist(auction_duration) {
    const sale = this;
    let sql = "START_AUCTION_TRANSPORTIST(:p_sale_id)";
    let auction = await BD.execute(sql, { p_sale_id: sale.id });
    auction = auction[0][1];

    auction = moment(new Date(auction))
      .add(auction_duration, "hours")
      .format("DD/MM/YYYY hh:mm:ss");

    sql = "CHANGE_AUCTION_TRANSPORTIST_DURATION(:p_sale_id, :p_ended_at)";
    auction = await BD.execute(sql, {
      p_sale_id: sale.id,
      p_ended_at: auction,
    });

    return true;
  }

  async addAuctionProducer(producer_id, message, fruits_vegetables) {
    const sale = this;
    let sql =
      "ADD_AUCTION_PRODUCER_SALE(:p_sale_id, :p_producer_id, :p_message)";

    let auction = await BD.execute(sql, {
      p_sale_id: sale.id,
      p_producer_id: producer_id,
      p_message: message,
    });

    let auctionId = auction[0][0];

    sql =
      "ADD_AUCTION_PRODUCER_FRUITS_VEGETABLES(:p_auction_sale_id, :p_fruit_vegetable_id, :p_quantity, :p_unit_price)";
    for (const fv of fruits_vegetables) {
      await BD.execute(sql, {
        p_auction_sale_id: auctionId,
        p_fruit_vegetable_id: fv.fruit_vegetable_id,
        p_quantity: fv.quantity,
        p_unit_price: fv.unitPrice,
      });
    }

    return true;
  }

  async addAuctionProducerConfirm(
    auction_sale_id,
    user_id,
    fruit_vegetable_id,
    quantity,
    price
  ) {
    const sale = this;
    let sql =
      "ADD_AUCTION_PRODUCER_CONFIRM(:p_auction_sale_id, :p_sale_id, :p_user_id, :p_fruit_vegetable_id, :p_quantity, :p_price)";

    await BD.execute(sql, {
      p_auction_sale_id: auction_sale_id,
      p_sale_id: sale.id,
      p_user_id: user_id,
      p_fruit_vegetable_id: fruit_vegetable_id,
      p_quantity: quantity,
      p_price: price,
    });

    return true;
  }

  async getAuctionsForTransportist() {
    const sale = this;
    let sql = "GET_AUCTIONS_FOR_TRANSPORTIST(:p_sale_id)";
    let auctions = await BD.execute(sql, { p_sale_id: sale.id });

    auctions = auctions.map((a) => ({
      sale_id: a[0],
      Producer: new User(a[16], a.slice(11)),
      producer_id: a[1],
      fruit_vegetable_id: a[2],
      Offers: [
        {
          quantity: a[3],
          price: a[4],
          measurement: a[10],
          FruitVegetable: new FruitVegetable([a[5], a[6]]),
        },
      ],
    }));

    const finalAuctions = [];
    auctions.forEach((e) => {
      if (finalAuctions.map((f) => f.producer_id).includes(e.producer_id)) {
        let index = finalAuctions
          .map((f) => f.producer_id)
          .indexOf(e.producer_id);
        finalAuctions[index].Offers.push(e.Offers[0]);
      } else {
        finalAuctions.push(e);
      }
    });

    return finalAuctions;
  }

  async getAuctionProducerResult() {
    const sale = this;
    let sql = "GET_AUCTIONS_PRODUCER_CONFIRM_BY_SALE(:p_sale_id)";

    let auctions = await BD.execute(sql, { p_sale_id: sale.id });

    auctions = auctions.map((a) => ({
      sale_id: a[0],
      user_id: a[1],
      fruit_vegetable_id: a[2],
      quantity: a[3],
      price: a[4],
      FruitVegetable: new FruitVegetable([a[5], a[6]]),
    }));

    let fruitsVegetables = auctions.map((a) => {
      console.log(a.FruitVegetable);
      return a.FruitVegetable;
    });
    fruitsVegetables = [...new Set(fruitsVegetables)];

    fruitsVegetables = fruitsVegetables.map((fv) => ({
      id: fv.id,
      name: fv.name,
      quantity: auctions
        .filter((a) => a.FruitVegetable.id === fv.id)
        .reduce((acc, a) => acc + a.quantity, 0),
      price: auctions
        .filter((a) => a.FruitVegetable.id === fv.id)
        .reduce((acc, a) => acc + a.price * a.quantity, 0),
    }));

    return fruitsVegetables;
  }

  async changeStatus(status_id) {
    const sale = this;
    let sql = "CHANGE_STATUS_SALE(:p_sale_id, :p_status_id)";
    await BD.execute(sql, { p_sale_id: sale.id, p_status_id: status_id });
    return true;
  }

  async createAuctionTransportist(transportist_id, message, price) {
    const sale = this;
    let sql =
      "ADD_AUCTION_TRANSPORTIST_SALE(:p_sale_id, :p_transportist_id, :p_message, :p_price)";
    await BD.execute(sql, {
      p_sale_id: sale.id,
      p_transportist_id: transportist_id,
      p_message: message,
      p_price: price,
    });

    return true;
  }

  async getAuctionsTransportistConfirm() {
    const sale = this;
    let sql = "GET_AUCTIONS_TRANSPORTIST_BY_SALE(:p_sale_id)";
    let auctions = await BD.execute(sql, { p_sale_id: sale.id });

    auctions = auctions.map((a) => ({
      id: a[0],
      sale_id: a[1],
      transportist_id: a[2],
      message: a[3],
      price: a[4],
      state: a[5],
      Transportist: new User(a[11], a.slice(6)),
    }));
    return auctions;
  }

  async confirmAuctionTransportist(confirm_id) {
    const sale = this;
    let sql = "CONFIRM_AUCTION_TRANSPORTIST(:p_sale_id, :p_confirm_id)";
    await BD.execute(sql, { p_sale_id: sale.id, p_confirm_id: confirm_id });

    return true;
  }

  async getHistory() {
    const sale = this;
    let sql = "GET_HISTORY_BY_SALE(:p_sale_id)";
    let history = await BD.execute(sql, { p_sale_id: sale.id });
    history = history.map((h) => ({
      sale_id: h[0],
      status_id: h[1],
      created_at: h[2],
      Status: { id: h[3], description: h[4] },
    }));

    return history;
  }
}

module.exports = Sale;
