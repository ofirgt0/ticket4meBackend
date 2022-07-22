

var validator = require('validator');
// https://www.npmjs.com/package/validator




const addCouponsValidators = async function(coupon){  
    let valid = true
    return new Promise((resolve, reject) => {
        if(validator.isEmpty(coupon.couponName)){
            valid = false
        }
        if(!validator.isNumeric(coupon.IDiska.toString())){
            valid = false
        }
        resolve(valid)
    })
}

const EditCouponsValidators = async function(coupon){

}






module.exports ={
    addCouponsValidators,EditCouponsValidators
}