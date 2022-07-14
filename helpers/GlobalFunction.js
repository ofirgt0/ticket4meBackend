
const axios = require('axios');
const mysql = require('mysql');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

const Pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port:parseInt(process.env.DBPORT)
  });

// const sendSMS = async function(userPhone){
//     return new Promise((resolve, reject) => {
//         Pool.query('SELECT userPhone FROM adminUsers WHERE userPhone = (?);',[userPhone], (err, row ,fields) => {
          
//         })
//     })
// }
const SendVerificationCode = async function(userName , userPhone){
    return new Promise((resolve, reject) => {
        var now = new Date();
        now.setHours(now.getHours() + 4 , 10)
        let mobileNumber = userPhone.toString()
        let mobileCode = parseInt(Math.floor(100000 + Math.random() * 900000));
        let codeExpires = new Date(now).toISOString().slice(0, 19).replace('T', ' ');
        let cusFirstNameToUpdate = userName
        // console.log(mobileNumber, mobileCode, codeExpires, cusFirstNameToUpdate)
        Pool.query('DELETE FROM SMScodes WHERE mobileNumber = (?);',[mobileNumber],async (err, row ,fields) => {
            Pool.query('INSERT INTO SMScodes (mobileNumber, mobileCode, codeExpires, cusFirstNameToUpdate) VALUES ((?),(?),(?),(?));',[mobileNumber, mobileCode, codeExpires, cusFirstNameToUpdate],async (err, row ,fields) => {
                if (err) return reject(err);
                if(row.affectedRows > 0){
                    let msg = "שלום "+userName+" הקוד הזמני שלך להתחברות הוא " + mobileCode
                    await sendSMS(mobileNumber , msg)
                    // console.log('SendVerificationCode' , msg);
                    resolve(true)
                }
                resolve(false)
            })
        });
    })
}

const grantToken  = async function(data){
    return new Promise((resolve, reject) => {
        jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '10h' } , function(err, Token) {
            if (err) reject(err)
            resolve(Token)
        })
    })
}

const getAllCity = async function(lang){
    return new Promise((resolve, reject) => {
        console.log(lang);
        if(lang == "he"){
            sql = 'SELECT cityCode,cityName_HE FROM cities'
        }else{
            sql = 'SELECT cityCode,cityName_EN FROM cities'
        }

        Pool.query(sql, (err, row ,fields) => {
            if (err) return reject(err);
            if(row.length > 0){
                if(lang == "he"){
                    _.map(row, function (obj) {
                        obj.id = obj.cityCode;
                        obj.text = obj.cityName_HE;
                        return obj;
                    });
                    }else{
                        _.map(row, function (obj) {
                            obj.id =  obj.cityCode;
                            obj.text =  obj.cityName_EN;
                            return obj;
                        });
                    }
                resolve({status : 'success' , data:row })
            }
                resolve({status : 'err'})
        })
    })
}






const sendSMS = async function(Phone , msg){
    // return new Promise((resolve, reject) => {
        console.log(" send sms to " , Phone , 'msg ' , msg);
         axios.post('http://gapi.soprano.co.il/QuickGateway.ashx?apiprotocol=json',{
         "sms": {
             "account": {
                 "id": process.env.smsID,
                 "password": process.env.smsPassword
             },
             "attributes": {
                 "reference": "1",
                 "replyPath": "ticket4me"
             },
             "schedule": {
                 "relative": "1"
             },
             "targets": {
                 "cellphone": [
                 {
                     "@reference": "12",
                     "#text": Phone
                 }
                 ]
             },
             "data": msg
             }
         }).then(function (response) {
             console.log('msg sent!');
             // console.log(response);
         });

        // console.log("post to  http://soprano.co.il/prodsms/corpsms");
      
        // Pool.query('SELECT userPhone FROM adminUsers WHERE userPhone = (?);',[userPhone], (err, row ,fields) => {
          
        // })
    // })
}
  



module.exports ={

    sendSMS,SendVerificationCode,grantToken,getAllCity
   
}