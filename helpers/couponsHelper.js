const myvalidator = require('./validators');
var Pool = require('./../core/db/dbPool')


const addCoupon = async function(coupon){  
    return new Promise(async (resolve, reject) => {
        let res = await myvalidator.addCouponsValidators(coupon)
        if(res){
            // coupon.couponName...
            Pool.query('INSERT INTO coupons (mobileNumber, mobileCode, codeExpires, cusFirstNameToUpdate) VALUES ((?),(?),(?),(?));',[mobileNumber, mobileCode, codeExpires, cusFirstNameToUpdate],async (err, row ,fields) => {
                if (err) return reject(err);
                if(row.affectedRows > 0){
                    resolve({status : 'success'})
                }else{
                    resolve({status : 'err'})
                }
            })
        }else{
            resolve({status : 'err'})
        }
    })
}



const editCoupon = async function(coupons){  
    return new Promise((resolve, reject) => {
        validator.editCoupon()
    
    })
}

const deleteCoupon = async function(coupons){  
    return new Promise((resolve, reject) => {
    
    })
}


const GetAllCoupon = async function(coupons){  
    return new Promise((resolve, reject) => {
      
    
    })
}


module.exports ={
    // ...
    addCoupon,editCoupon,deleteCoupon,GetAllCoupon
}