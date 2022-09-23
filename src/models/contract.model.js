const e = require("express");
const BD = require("../database/database");

class Contract {
  constructor(args) {
    this.id = args[0];
    (this.createdAt = args[1]),
      (this.expiredAt = args[2]),
      (this.user_id = args[3]),
      (this.User = {
        id: args[4],
        name: args[5],
        email: args[6],
      });
  }

  static async getContractByUser(user_id) {
    const sql = "get_contract_by_user(:p_user_id)";
    let contract = await BD.execute(sql, {
      p_user_id: user_id,
    });

    return contract[0] ? new Contract(contract[0]) : {};
  }

  static async create(created_at, expired_at, user_id) {
    let sql = "add_constract(:p_created_at, :p_expired_at, :p_user_id)";
    let contract = await BD.execute(sql, {
      p_created_at: created_at,
      p_expired_at: expired_at,
      p_user_id: user_id,
    });

    return contract[0] ? new Contract(contract[0]) : {};
  }
}

module.exports = Contract;
