var express = require('express');
const couponsHelper = require('./../helpers/couponsHelper');


var router = express.Router();



router.post('/addCoupon', async function(req, res, next) {
  let coupon = req.body.coupon
  let validRes = await couponsHelper.addCoupon(coupon)
  res.send(validRes)  

});

module.exports = router; 
