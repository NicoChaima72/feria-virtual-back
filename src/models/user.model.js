const BD = require("../database/database");
const bcrypt = require("bcryptjs");

class User {
  constructor(role_id, args) {
    this.id = args[0];
    this.name = args[1];
    this.email = args[2];
    this.password = args[3];
    this.created_at = args[4];
    this.role_id = args[5];
    this.status = args[6];
    this.Role = {
      id: args[7],
      description: args[8],
    };

    switch (role_id) {
      case 2:
        this.rut = args[11];
        this.business_name = args[12];
        this.region = args[13];
        this.commune = args[14];
        this.street = args[15];
        this.observations = args[16];
        this.direction_url = args[17];
        this.phone = args[18];
        this.contract_id = args[9];
        this.Contract = {
          id: args[19],
          created_at: args[20],
          expired_at: args[21],
        };
        break;
      case 3:
        this.rut = args[11];
        this.business_name = args[12];
        this.country = args[13];
        this.region = args[14];
        this.commune = args[15];
        this.street = args[16];
        this.observations = args[17];
        this.direction_url = args[18];
        this.phone = args[19];
        this.contract_id = args[9];
        this.Contract = {
          id: args[20],
          created_at: args[21],
          expired_at: args[22],
        };
        break;
      case 4:
        this.rut = args[11];
        this.business_name = args[12];
        this.region = args[13];
        this.commune = args[14];
        this.street = args[15];
        this.observations = args[16];
        this.direction_url = args[17];
        this.phone = args[18];
        this.contract_id = args[9];
        this.Contract = {
          id: args[19],
          created_at: args[20],
          expired_at: args[21],
        };
        this.fruits_vegetables = args[23] ? args[23].split(",") : [];
        break;
      case 5:
        this.type_id = args[11];
        this.rut = args[12];
        this.business_name = args[13];
        this.phone = args[14];
        this.contract_id = args[9];
        this.Contract = {
          id: args[15],
          created_at: args[16],
          expired_at: args[17],
        };
        this.Type = {
          id: args[18],
          description: args[19],
        };
        break;
      default:
        break;
    }
  }

  static async getByRole(role_id) {
    let users = await BD.execute("GET_USERS_BY_ROLE(:p_role_id)", {
      p_role_id: role_id,
    });


    users = users.map((user) => new User(role_id, user));

    return users;
  }

  static async getByEmail(email) {
    let user = await BD.execute("GET_USER_BY_EMAIL(:p_email)", {
      p_email: email,
    });

    if (!user[0]) return null;

    return new User(user[0][5], user[0]);
  }

  static async getById(id) {
    let user = await BD.execute("GET_USER_BY_ID(:p_id)", {
      p_id: id,
    });

    if (!user[0]) return null;

    user = new User(user[0][5], user[0]);

    return user;
  }

  static async createAdminAndConsultant(name, email, password, role_id) {
    // TODO: Cambiar
    // password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    password = bcrypt.hashSync("207229865", bcrypt.genSaltSync(10));

    let sql = `ADD_USER(:p_name, :p_email, :p_password, :p_role_id)`;

    let user = await BD.execute(sql, {
      p_name: name,
      p_email: email,
      p_role_id: role_id,
      p_password: password,
    });

    if (!user[0]) return null;

    user = new User(1, user[0]);
    delete user.password;

    return user;
  }

  static async createProducer(
    name,
    email,
    password,
    rut,
    business_name,
    region,
    commune,
    street,
    observations,
    direction_url,
    phone,
    contract_expired_at
  ) {
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let sql = `ADD_PRODUCER_USER(:p_name, :p_email, :p_password, :p_role_id, :p_rut, :p_business_name, :p_region, :p_commune, :p_street, :p_observations, :p_direction_url, :p_phone, :p_contract_expired_at)`;

    let user = null;
    let error = false;
    try {
      user = await BD.execute(sql, {
        p_name: name,
        p_email: email,
        p_password: password,
        p_role_id: 4,
        p_rut: rut,
        p_business_name: business_name,
        p_region: region,
        p_commune: commune,
        p_street: street,
        p_observations: observations,
        p_direction_url: direction_url,
        p_phone: phone,
        p_contract_expired_at: contract_expired_at,
      });
    } catch (e) {
      console.log({ e });
      error = true;
    }

    if (error) return null;

    if (!user[0]) return null;

    user = new User(4, user[0]);
    delete user.password;

    return user;
  }

  static async createLocal(
    name,
    email,
    password,
    rut,
    business_name,
    region,
    commune,
    street,
    observations,
    direction_url,
    phone,
    contract_expired_at
  ) {
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let sql = `ADD_LOCAL_USER(:p_name, :p_email, :p_password, :p_role_id, :p_rut, :p_business_name, :p_region, :p_commune, :p_street, :p_observations, :p_direction_url, :p_phone, :p_contract_expired_at)`;

    let user = null;
    let error = false;
    try {
      user = await BD.execute(sql, {
        p_name: name,
        p_email: email,
        p_password: password,
        p_role_id: 2,
        p_rut: rut,
        p_business_name: business_name,
        p_region: region,
        p_commune: commune,
        p_street: street,
        p_observations: observations,
        p_direction_url: direction_url,
        p_phone: phone,
        p_contract_expired_at: contract_expired_at,
      });
    } catch (e) {
      console.log({ e });
      error = true;
    }

    if (error) return null;

    if (!user[0]) return null;

    user = new User(2, user[0]);
    delete user.password;

    return user;
  }

  static async createExternal(
    name,
    email,
    password,
    rut,
    business_name,
    country,
    region,
    commune,
    street,
    observations,
    direction_url,
    phone,
    contract_expired_at
  ) {
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let sql = `ADD_EXTERNAL_USER(:p_name, :p_email, :p_password, :p_role_id, :p_rut, :p_business_name, :p_country, :p_region, :p_commune, :p_street, :p_observations, :p_direction_url, :p_phone, :p_contract_expired_at)`;

    let user = null;
    let error = false;
    try {
      user = await BD.execute(sql, {
        p_name: name,
        p_email: email,
        p_password: password,
        p_role_id: 3,
        p_rut: rut,
        p_business_name: business_name,
        p_country: country,
        p_region: region,
        p_commune: commune,
        p_street: street,
        p_observations: observations,
        p_direction_url: direction_url,
        p_phone: phone,
        p_contract_expired_at: contract_expired_at,
      });
    } catch (e) {
      console.log({ e });
      error = true;
    }

    if (error) return null;

    if (!user[0]) return null;

    user = new User(3, user[0]);
    delete user.password;

    return user;
  }

  static async createTransportist(
    name,
    email,
    password,
    rut,
    business_name,
    phone,
    type_id,
    contract_expired_at
  ) {
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let sql = `ADD_TRANSPORTIST_USER(:p_name, :p_email, :p_password, :p_role_id, :p_rut, :p_business_name, :p_phone, :p_type_id, :p_contract_expired_at)`;

    let user = null;
    let error = false;

    try {
      user = await BD.execute(sql, {
        p_name: name,
        p_email: email,
        p_password: password,
        p_role_id: 5,
        p_rut: rut,
        p_business_name: business_name,
        p_phone: phone,
        p_type_id: type_id,
        p_contract_expired_at: contract_expired_at,
      });
    } catch (e) {
      console.log({ e });
      error = true;
    }

    if (error) return null;

    if (!user[0]) return null;

    user = new User(5, user[0]);
    delete user.password;

    return user;
  }

  async isValidPassword(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

  async addFruitsVegetables(fruits_vegetables) {
    const user = this;
    let sql =
      "ADD_PRODUCERS__FRUITS_VEGETABLES(:p_producer_id, :p_fruit_vegetable_id)";
    for (const fruit_vegetable of fruits_vegetables) {
      await BD.execute(sql, {
        p_producer_id: user.id,
        p_fruit_vegetable_id: Number(fruit_vegetable),
      });
    }
  }

  async deleteFruitsVegetables() {
    const user = this;
    let sql = "DELETE_PRODUCERS__FRUITS_VEGETABLES(:p_producer_id)";
    await BD.execute(sql, { p_producer_id: user.id });

    return true;
  }

  async updateContract(expired_at) {
    const user = this;
    let sql = "EDIT_CONTRACT(:p_contract_id, :p_expired_at)";
    const contract = await BD.execute(sql, {
      p_contract_id: user.Contract.id,
      p_expired_at: expired_at,
    });

    return contract;
  }

  async updateAdminAndConsultant(name) {
    const user = this;
    let sql = "EDIT_USER(:p_id, :p_name)";
    const result = await BD.execute(sql, {
      p_id: user.id,
      p_name: name,
    });

    return new User(user.id, result[0]);
  }

  // async updateProducer() {}

  async updateLocal(
    name,
    rut,
    business_name,
    region,
    commune,
    street,
    observations,
    direction_url,
    phone,
    contract_expired_at
  ) {
    const user = this;
    let sql =
      "EDIT_LOCAL_USER(:p_id, :p_name, :p_rut, :p_business_name, :p_region, :p_commune, :p_street, :p_observations, :p_direction_url, :p_phone, :p_contract_expired_at)";
    const result = await BD.execute(sql, {
      p_id: user.id,
      p_name: name,
      p_rut: rut,
      p_business_name: business_name,
      p_region: region,
      p_commune: commune,
      p_street: street,
      p_observations: observations,
      p_direction_url: direction_url,
      p_phone: phone,
      p_contract_expired_at: contract_expired_at,
    });

    return new User(2, result[0]);
  }

  async updateExternal(
    name,
    rut,
    business_name,
    country,
    region,
    commune,
    street,
    observations,
    direction_url,
    phone,
    contract_expired_at
  ) {
    const user = this;
    let sql =
      "EDIT_EXTERNAL_USER(:p_id, :p_name, :p_rut, :p_business_name, :p_country, :p_region, :p_commune, :p_street, :p_observations, :p_direction_url, :p_phone, :p_contract_expired_at)";
    const result = await BD.execute(sql, {
      p_id: user.id,
      p_name: name,
      p_rut: rut,
      p_business_name: business_name,
      p_country: country,
      p_region: region,
      p_commune: commune,
      p_street: street,
      p_observations: observations,
      p_direction_url: direction_url,
      p_phone: phone,
      p_contract_expired_at: contract_expired_at,
    });

    return new User(3, result[0]);
  }

  async updateProducer(
    name,
    rut,
    business_name,
    region,
    commune,
    street,
    observations,
    direction_url,
    phone,
    contract_expired_at
  ) {
    const user = this;
    let sql =
      "EDIT_PRODUCER_USER(:p_id, :p_name, :p_rut, :p_business_name, :p_region, :p_commune, :p_street, :p_observations, :p_direction_url, :p_phone, :p_contract_expired_at)";
    const result = await BD.execute(sql, {
      p_id: user.id,
      p_name: name,
      p_rut: rut,
      p_business_name: business_name,
      p_region: region,
      p_commune: commune,
      p_street: street,
      p_observations: observations,
      p_direction_url: direction_url,
      p_phone: phone,
      p_contract_expired_at: contract_expired_at,
    });

    return new User(4, result[0]);
  }

  async updateTransportist(
    name,
    rut,
    business_name,
    phone,
    type_id,
    contract_expired_at
  ) {
    const user = this;
    let sql =
      "EDIT_TRANSPORTIST_USER(:p_id, :p_name, :p_rut, :p_business_name, :p_phone, :p_type_id, :p_contract_expired_at)";
    const result = await BD.execute(sql, {
      p_id: user.id,
      p_name: name,
      p_rut: rut,
      p_business_name: business_name,
      p_phone: phone,
      p_type_id: type_id,
      p_contract_expired_at: contract_expired_at,
    });

    return new User(5, result[0]);
  }

  async changeStatus(status) {
    const user = this;
    let sql = "CHANGE_STATUS_USER(:p_id, :p_status)";
    const result = await BD.execute(sql, { p_id: user.id, p_status: status });

    return new User(user.role_id, result[0]);
  }

  async changePassword(password) {
    const user = this;
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    let sql = "CHANGE_PASSWORD_USER(:p_id, :p_password)";
    const result = await BD.execute(sql, {
      p_id: user.id,
      p_password: password,
    });

    return new User(user.role_id, result[0]);
  }

  async getFruitsAndVegetables() {
    const user = this;
    let sql = "GET_FRUITS_VEGETABLES_BY_PRODUCER(:p_producer_id)";
    const result = await BD.execute(sql, {
      p_producer_id: user.id,
    });

    console.log(result);

    // TODO: Ver aqui;
    return [];
  }
}

module.exports = User;
