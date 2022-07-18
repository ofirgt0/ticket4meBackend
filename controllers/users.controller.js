import { getConnection, sql } from "../core/db/dbConnection";
import { queries } from "../core/db/queries";
/*
export const getUsers = (req, res) => {
  res.send("Users!");
};
*/
export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection(); // const pool = await sql.connect(dbsettings);
    const result = await pool.request().query(queries.getAllUsers);
    console.log(`NUM OF USERS: ${result.recordset.length} `);
    console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

export const addUser = async (req, res) => {
  const {
    userName,
    userEmail,
    userPhone,
    userPassword,
    picture,
    userPermission,
  } = req.body;
  if (
    userName == null ||
    userEmail == null ||
    userPhone == null ||
    userPassword == null ||
    userPermission == null ||
    picture == null
  ) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }
  /*
  console.log(
    `userName: ${userName}, userEmail: ${userEmail}, userPhone: ${userPhone}, userPassword: ${userPassword}, userPermission: ${userPermission}, picture: ${picture}`
  );
*/
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("userName", sql.VarChar, userName)
      .input("userEmail", sql.VarChar, userEmail)
      .input("userPhone", sql.VarChar, userPhone)
      .input("userPassword", sql.VarChar, userPassword)
      .input("userPermission", sql.VarChar, userPermission)
      .input("picture", sql.Text, picture)
      .query(queries.addNewUser);

    res.json({
      userName,
      userEmail,
      userPhone,
      userPassword,
      userPermission,
      picture,
    });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

export const getUserByName = async (req, res) => {
  const { uname } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("userName", sql.VarChar, uname)
      .query(queries.getUser);

    console.log(uname);
    console.log(result.recordset[0]);
    res.send(result.recordset[0]);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

export const deleteUser = async (req, res) => {
  const { name } = req.params;
  try {
    const pool = await getConnection();
    console.log(name);
    const result = await pool
      .request()
      .input("userName", sql.VarChar, name)
      .query(queries.deleteUser);

    console.log(result);
    //res.send(name);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
