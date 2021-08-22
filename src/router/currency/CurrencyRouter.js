"use strict";

const express = require("express");
const routers = express.Router();

const { currency: CurrencyController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewCurrency").post(Authentication, CurrencyController.createNewCurrency);
routers.route("/getAllData").get(Authentication, CurrencyController.listAllCurrency);
routers.route("/getDetailData").get(Authentication, CurrencyController.detailCurrency);
routers.route("/updateData").put(Authentication, CurrencyController.updateCurrency);

routers.route("/deleteData").delete(Authentication, CurrencyController.deleteDataCurrency);

module.exports = routers;
