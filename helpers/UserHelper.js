

var jwt = require('jsonwebtoken');
const globalFunction = require('./GlobalFunction')
var Pool = require('./../core/db/dbPool')

//   Pool.on('connection' , (data)=>{
//       console.log(data);
//   })



const CheckIfRegistered = async function(userPhone){
    return new Promise((resolve, reject) => {
        Pool.query('SELECT IDuser,userPhone FROM adminUsers WHERE userPhone = (?);',[userPhone], (err, row ,fields) => {
            if (err) return reject(err);
            if(row.length > 0){
                resolve({status : true , userPhone:row.userPhone , IDuser:row.IDuser })
            }
                resolve({status : false , userPhone:row.userPhone})
        })
    })
}

// const RegisteredNewUser = async function(userPhone){
//     return new Promise((resolve, reject) => {

//     })
// }
const VerificationCode = async function(mobileCode , userPhone){
    console.log(mobileCode , userPhone);
    return new Promise(async (resolve, reject) => {
        Pool.query('SELECT cusFirstNameToUpdate FROM SMScodes WHERE mobileCode = (?) AND mobileNumber = (?);',[mobileCode , userPhone],async (err, row ,fields) => {
            if (err) return reject(err);
            if(row.length > 0){
                let Registered = await CheckIfRegistered(userPhone)
                console.log('Registered' , userPhone);
                jwt.sign({userPhone:userPhone}, process.env.JWT_SECRET, { expiresIn: '10h' } , function(err, Token) {
                    if(err) console.log(err);
                console.log('Token' , Token);
                    if(Registered.status){
                        // משתמש רשום
                        resolve({status : "success" , UserExist : true , Token:Token})
                    }else{
                        // משתמש חדש
                        resolve({status : "success" , UserExist : false , Token:Token})
                    }
                  });
                Pool.query('DELETE FROM SMScodes WHERE mobileNumber = (?);',[userPhone],(err, row ,fields) => {})
            }else{
                resolve({status : 'err'}) 
            }
        })
    })
}


  
const checkLoginForm = async function(loginForm){
    userName = loginForm.userName
    userPhone = loginForm.userPhone
    return new Promise(async (resolve, reject) => {
        await globalFunction.SendVerificationCode(userName , userPhone)
        resolve({status : "success"})
    })
}



const addSapakToDB = async function(addBusiness){
    return new Promise(async (resolve, reject) => {
        Pool.query('INSERT INTO sapakim (sapakName,sapakMezahe,sapakLogo,sapakOwnerName,sapakPhone,sapakEmail,sapakFax,sapakFacebook,sapakYouTube,sapakInstegram) VALUES ((?),(?),(?),(?),(?),(?),(?),(?),(?),(?));',[addBusiness.step0.sapakName,addBusiness.step0.sapakMezahe,'addBusiness.step0.sapakLogo',addBusiness.step0.sapakName,addBusiness.step1.sapakPhone,addBusiness.step1.sapakEmail,addBusiness.step1.sapakFax,addBusiness.step2.sapakFacebook,addBusiness.step2.sapakYouTube,addBusiness.step2.sapakInstegram],async (err, row ,fields) => {
            if (err) return reject(err);
            if (row.affectedRows > 0){
                resolve({status : "success", insertId : row.insertId})
            }else{
                resolve({status : "err"})
            }

        })
    })
}

const addAdminUsersToDB = async function(addBusiness ,SapakInsertId){

    return new Promise(async (resolve, reject) => {
        Pool.query('INSERT INTO adminUsers (IDsapak,userPhone,userName,userEmail,userPermission) VALUES ((?),(?),(?),(?),(?));',[SapakInsertId,addBusiness.step1.sapakPhone,addBusiness.step0.sapakName,addBusiness.step1.sapakEmail,'sapak-full'],async (err, row ,fields) => {
            if (err) return reject(err);
            if (row.affectedRows > 0){
                resolve({status : "success"})
            }else{
                resolve({status : "err"})
            }

        })
    })
}



const addBranchesToDB = async function(branch , SapakInsertId){
    return new Promise(async (resolve, reject) => {
        let allGood = true 
        for (let i = 0; i < branch.length; i++) {
            Pool.query('INSERT INTO sapakBranches (IDsapak,branchName,branchMezahe,branchAddress,branchContactPerson,branchPhone,branchFax,branchEmail,branchCCterminal,branchAreaCover,branchOpenHours) VALUES ((?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?));',[SapakInsertId,branch[i].branchName,branch[i].branchMezahe,branch[i].branchAddress,branch[i].branchContactPerson,branch[i].branchPhone,branch[i].branchFax,branch[i].branchEmail,branch[i].branchCCterminal,branch[i].branchAreaCover,branch[i].branchOpenHours],async (err, row ,fields) => {
                if (err) return reject(err);
                  if (row.affectedRows == 0){
                    allGood = false
                  }
            })
        }
        if (allGood){
            resolve({status : "success"})
        }else{
            resolve({status : "err"})
        }
    })
}



const saveBusinessToServer = async function(addBusiness , userPhone){
    /**
     * to do
     * Add validation
     */
    return new Promise(async (resolve, reject) => {
        
        let addSapak = await addSapakToDB(addBusiness)
       
        if(addSapak.status == "err"){
            resolve({status : "err"})
        }
        
        let addAdminUsers = await addAdminUsersToDB(addBusiness,addSapak.insertId)

        if(addAdminUsers.status == "err"){
            resolve({status : "err"})
        }

        let addBranches = await addBranchesToDB(addBusiness.branch,addSapak.insertId)
        if(addBranches.status == "err"){
            resolve({status : "err"})
        }
        let data = {
            IDsapak:addSapak.insertId,
            userPermission : 'sapak-full'
        }
        let Token = await globalFunction.grantToken(data)
        console.log(Token);
        resolve({status : "success" , Token : Token})
        
    })

    // console.log(addBusiness , userPhone);

}




module.exports ={

    checkLoginForm , VerificationCode , saveBusinessToServer
   
}