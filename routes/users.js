var express = require("express");
var router = express.Router();
var formidable = require("formidable");
var jwt = require("jsonwebtoken");
var UserHelper = require("./../controllers/UserHelper");
const globalFunction = require("../controllers/GlobalFunction");
const auth = require("../core/authentication/auth");
path = require("path");

/* GET users listing. */
router.post("/login", async function (req, res, next) {
  loginForm = req.body.loginForm;
  let validRes = await UserHelper.checkLoginForm(loginForm);
  console.log(validRes);
  res.send(validRes);
});

router.post("/SendVerificationCode", async function (req, res, next) {
  mobileCode = req.body.mobileCode.mobileCode;
  userPhone = req.body.loginForm.userPhone;
  let validRes = await UserHelper.VerificationCode(mobileCode, userPhone);
  res.send(validRes);
});

router.post("/getAllCity", async function (req, res, next) {
  lang = req.body.lang;
  let validRes = await globalFunction.getAllCity(lang);
  res.send(validRes);
});

router.post("/saveBusinessToServer", auth, async function (req, res, next) {
  let addBusiness = req.body.addBusiness;
  let userPhone = req.userPhone;
  let validRes = await UserHelper.saveBusinessToServer(addBusiness, userPhone);
  // res.cookie('token', validRes.Token , { httpOnly: true , maxAge:'2000000' })
  res.send(validRes);
});

//העלאת קבצים לפני הרשמה לפי מספר פאלפון
router.post("/upload", auth, async function (req, res, next) {
  console.log(req.userPhone);
  let userPhone = req.userPhone;
  let imgType;
  var form = new formidable.IncomingForm();
  // console.log(form);
  let uploadFile = {
    userPhone: req.IDuser,
    imgType: "",
    url: "",
  };
  // form.on('field', (name, fields) => {
  //   uploadFile.imgType = fields.imgType
  // });
  // form.on('file', (name, file) => {
  //     console.log(2);
  // });

  form.on("fileBegin", (name, file) => {
    file.path = path.resolve(
      __dirname + "./../uploads/" + userPhone + path.parse(file.name).ext
    );
    uploadFile.url =
      "http://" +
      process.env.HOST +
      ":3001/uploads/" +
      userPhone +
      path.parse(file.name).ext;
    console.log(4);
  });
  form.parse(req, (err, fields, file) => {
    if (err) {
      console.log("Error", err);
      return;
    }
    uploadFile.userPhone = userPhone;
    console.log(3);
  });
  form.on("end", async (file) => {
    res.send({ status: "success", url: uploadFile.url });
  });
});

module.exports = router;
