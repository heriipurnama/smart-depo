"use strict";

const express = require("express");
const routers = express.Router();

const { damageTariff: DamageTariffController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, DamageTariffController.createData);
routers.route("/getAllData").get(Authentication, DamageTariffController.listAllData);
routers.route("/getDetailData").get(Authentication, DamageTariffController.detailData);
routers.route("/updateData").put(Authentication, DamageTariffController.updateData);

routers.route("/deleteData").delete(Authentication, DamageTariffController.deleteData);

module.exports = routers;
