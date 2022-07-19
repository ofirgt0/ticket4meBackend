/*
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
*/

import express from "express";
import config from "./config";

import usersRoute from "./routes/users.route";

const app = express();
let port;
//settings
app.set("port", config.port || 3000);
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRoute);
export default app;
/*
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  header: {
    "Access-Control-Allow-Origin": "*",
    // 'Content-Type': 'multipart/form-data', //     <-- IMPORTANT
  },
};

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var couponsRouter = require("./routes/coupons");

var sapakimRouter = require("./routes/sapakim");
var sapakBranchesRouter = require("./routes/sapakBranches");
var adminUsersRouter = require("./routes/adminUsers");
var ticketTypesRouter = require("./routes/ticketTypes");
var combinedTicketsRouter = require("./routes/combinedTickets");
var featureGroupsRouter = require("./routes/featureGroups");
var feaureOptionsRouter = require("./routes/feaureOptions");
var iskaCategoriesRouter = require("./routes/iskaCategories");
var iskaotRouter = require("./routes/iskaot");
var couponsRouter = require("./routes/coupons");
var hallsRouter = require("./routes/halls");
var chairStatusListRouter = require("./routes/chairStatusList");
var upSalesRouter = require("./routes/upSales");
var shipmentsRouter = require("./routes/shipments");
var inlaysRouter = require("./routes/inlays");
var ordersRouter = require("./routes/orders");
var citiesRouter = require("./routes/cities");
var orderStatusListRouter = require("./routes/orderStatusList");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  bodyParser.json({
    extended: true,
  })
);

app.use("/", indexRouter); // michal:renders first page- only title
app.use("/users", usersRouter); // michal: users logic part missing
app.use("/coupons", couponsRouter); // michal: add coupons to DB missing logic

app.use("/coupons", couponsRouter);

// app.use('/SMScodes',SMScodesRouter);

// michal: ALL EMPTY 
app.use("/sapakim", sapakimRouter);
app.use("/sapakBranches", sapakBranchesRouter);
app.use("/adminUsers", adminUsersRouter);
app.use("/ticketTypes ", ticketTypesRouter);
app.use("/combinedTickets", combinedTicketsRouter);
app.use("/featureGroups", featureGroupsRouter);
app.use("/feaureOptions", feaureOptionsRouter);
app.use("/iskaCategories", iskaCategoriesRouter);
app.use("/iskaot", iskaotRouter);
app.use("/halls", hallsRouter);
app.use("/chairStatusList", chairStatusListRouter);
app.use("/upSales", upSalesRouter);
app.use("/shipments", shipmentsRouter);
app.use("/inlays", inlaysRouter);
app.use("/orders", ordersRouter);
app.use("/cities", citiesRouter);
app.use("/orderStatusList", orderStatusListRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
*/
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message); //I changed render to send
});

//module.exports = app;
