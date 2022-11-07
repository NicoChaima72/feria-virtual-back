const BD = require("../database/database");
const FruitVegetable = require("./fruit_vegetable.model");
const User = require("./user.model");

class Auction {
  constructor(auction) {
    this.id = auction.id;
    this.sale_id = auction.sale_id;
    this.producer_id = auction.producer_id;
    this.message = auction.message;
    this.state = auction.state;
    this.Producer = auction.Producer;
    this.Offers = auction.Offers;
  }

  static async getBySale(sale_id) {
    let auctions = await BD.execute(
      "GET_AUCTIONS_PRODUCER_BY_SALE(:p_sale_id)",
      { p_sale_id: sale_id }
    );

    auctions = auctions.map((a) => ({
      id: a[0],
      sale_id: a[1],
      producer_id: a[2],
      message: a[3],
      state: a[4],
      Producer: new User(a[10], a.slice(5, 5 + 22)),
      Offers: [
        {
          quantity: a[29],
          unitPrice: a[30],
          FruitVegetable: new FruitVegetable(a.slice(31, 33)),
        },
      ],
    }));

    const finalAuctions = [];

    auctions.forEach((e) => {
      if (finalAuctions.map((f) => f.id).includes(e.id)) {
        let index = finalAuctions.map((f) => f.id).indexOf(e.id);
        finalAuctions[index].Offers.push(e.Offers[0]);
      } else {
        finalAuctions.push(e);
      }
    });

    return finalAuctions.map((f) => new Auction(f));
  }
}

module.exports = Auction;
