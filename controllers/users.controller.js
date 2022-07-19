import { VarChar } from "mssql";
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

//TODO : check if user name is already exist ??
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

    console.log("New user added successfully!");
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

//TODO : check if user exist
export const getUserByName = async (req, res, next) => {
  const { name } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("userName", sql.VarChar, name)
      .query(queries.getUser);

    console.log(name);
    if (!result.recordset[0]) {
      console.log("Could not find this user.");
      res.sendStatus(204); //No Content
      return next();
    }

    console.log(result.recordset[0]);
    res.send(result.recordset[0]);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

//TODO : check if user exist
export const deleteUser = async (req, res, next) => {
  const { name } = req.params;
  console.log(name);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("userName", sql.VarChar, name)
      .query(queries.deleteUser);

    console.log(result);
    console.log("Delete User successfully!");
    //res.send(name);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

export const updateUserByName = async (req, res, next) => {
  const { name } = req.params;
  const { userEmail, userPhone } = req.body;
  console.log(JSON.stringify({ userEmail, userPhone }));
  try {
    if (userEmail == null || userPhone == null) {
      console.log("NULL");
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("NewEmail", sql.VarChar, userEmail)
      .input("NewPhone", sql.VarChar, userPhone)
      .query(queries.updateUserByName);

    console.log(result);
    console.log("Update User successfully!");
    console.log(JSON.stringify({ userEmail, userPhone }));
    //res.send("OK");
    res.json({ userEmail, userPhone });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
