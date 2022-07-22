import { getConnection, sql } from "../core/db/dbConnection";
import { queries } from "../core/db/queries";

/*UsersVerify table*/
export const addVerification = async (req, res) => {
    const {
        userName,
        verifyEmailCode,
        verifyPhoneCode,
        phoneCodeExpires,
        emailCodeExpires,
    } = req.body;

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("userName", sql.VarChar, userName)
            .input("verifyEmailCode", sql.VarChar, verifyEmailCode)
            .input("verifyPhoneCode", sql.VarChar, verifyPhoneCode)
            .input("emailCodeExpires", sql.VarChar, emailCodeExpires)
            .input("phoneCodeExpires", sql.VarChar, phoneCodeExpires)
            .query(queries.addVerfiedUser);

        console.log("User verified successfully!");

        res.json({
            userName,
            verifyEmailCode,
            verifyPhoneCode,
        });
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
};

export const getVerificationByName = async (req, res, next) => {
    const { userName } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("userName", sql.VarChar, userName)
            .query(queries.getUserVerifyInfo);

        if (!result.recordset[0]) {
            console.log("Could not find this user.");
            res.sendStatus(204);
            return next();
        }
        res.send(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
};

export const updateVerification = async (req, res, next) => {
    const { userName } = req.params;
    const {
        verifyEmailCode,
        verifyPhoneCode,
        phoneCodeExpires,
        emailCodeExpires,
    } = req.body;

    // check if the user we want to update exists
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("userName", sql.VarChar, userName)
            .query(queries.getUserVerifyInfo);

        console.log(userName);
        if (!result.recordset[0]) {
            console.log("Could not find this user.");
            res.sendStatus(204);
            return next();
        }
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }

    // update user
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("userName", sql.VarChar, userName)
            .input("verifyEmailCode", sql.VarChar, verifyEmailCode)
            .input("verifyPhoneCode", sql.VarChar, verifyPhoneCode)
            .input("emailCodeExpires", sql.VarChar, emailCodeExpires)
            .input("phoneCodeExpires", sql.VarChar, phoneCodeExpires)
            .query(queries.updateVerifyInfo);

        console.log(result);
        console.log("Updated user verification info successfully!");

        res.json({
            message: `${userName} was updated successfully!`
        });
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
}

export const deleteVerification = async (req, res, next) => {
    const { userName } = req.params;

    // check if the user we want to delete exists
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("userName", sql.VarChar, userName)
            .query(queries.getUserVerifyInfo);

        if (!result.recordset[0]) {
            console.log("Could not find this user.");
            res.sendStatus(204);
            return next();
        }
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }

    // delete user
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("userName", sql.VarChar, userName)
            .query(queries.deleteUserInfo);

        console.log("Delete User successfully!");
        res.send(`${userName} was deleted successfully!`);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
}