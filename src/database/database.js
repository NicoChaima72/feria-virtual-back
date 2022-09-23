const oracledb = require("oracledb");
const databaseConfig = require("../config/database.config");
// oracledb.initOracleClient({ libDir: "C:/Oracle/instantclient" });

async function run(sql, data) {
  sql = sql.substring(0, sql.lastIndexOf(")"));
  sql += sql[sql.length - 1] == '(' ? ':p_data)' : ', :p_data)';
  sql = `begin ${sql}; end;`;
  let connection;

  let results = [];

  try {
    connection = await oracledb.getConnection(databaseConfig);

    binds = {
      ...data,
      p_data: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    };

    result = await connection.execute(sql, binds, {autoCommit: true});

    const resultSet = result.outBinds.p_data;
    let row;
    while ((row = await resultSet.getRow())) {
      results.push(row);
    }
    await resultSet.close(); // always close the ResultSet
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }

    return results;
  }
}

exports.execute = run;
