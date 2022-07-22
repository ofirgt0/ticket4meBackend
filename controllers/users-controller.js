import { VarChar } from "mssql";
import { getConnection, sql } from "../core/db/dbConnection";
import { queries } from "../core/db/queries";

/*Users table*/
export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection(); // const pool = await sql.connect(dbsettings);
    const result = await pool.request().query(queries.getAllUsers);
    if (result.recordset.length === 0) {
      res.send("Users table is empty.");
    } else {
      console.log(`NUM OF USERS: ${result.recordset.length} `);
      console.log(result.recordset);
      res.json(result.recordset);
    }
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};