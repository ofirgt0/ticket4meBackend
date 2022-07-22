const mysql = require("mysql");

const Pool = mysql.createPool({
  port: parseInt(process.env.PORT),
  host: process.env.HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: sqlEncrypt,
    enableArithAbort: true
  },
});

module.exports.Pool = Pool.getConnection;
