const mysql = require("mysql");

const Pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: parseInt(process.env.DBPORT),
});

module.exports.Pool = Pool.getConnection;
