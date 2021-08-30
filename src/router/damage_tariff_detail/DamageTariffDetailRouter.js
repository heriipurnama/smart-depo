"use strict";

const express = require("express");
const routers = express.Router();

const { damageTariffDetail: DamageTariffDetailController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, DamageTariffDetailController.createData);
routers.route("/getAllData").get(Authentication, DamageTariffDetailController.listAllData);
routers.route("/getDetailData").get(Authentication, DamageTariffDetailController.detailData);
routers.route("/updateData").put(Authentication, DamageTariffDetailController.updateData);

routers.route("/deleteData").delete(Authentication, DamageTariffDetailController.deleteData);

module.exports = routers;
