"use strict";

const express = require("express");
const routers = express.Router();

const { orderPra: OrderPraController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, OrderPraController.createData);
routers.route("/getAllData").get(Authentication, OrderPraController.listAllData);
routers.route("/getDetailData").get(Authentication, OrderPraController.detailData);
routers.route("/updateData").put(Authentication, OrderPraController.updateData);

routers.route("/deleteData").delete(Authentication, OrderPraController.deleteData);
routers.route("/createPrainNo").get(Authentication, OrderPraController.createPrainNumber);
routers.route("/detailDataPraIn").post(Authentication, OrderPraController.detailDataPraIn);
routers.route("/searchContainerNumbers").get(Authentication, OrderPraController.searchPrainByContainerNumber);

routers.route("/printOrderByPraOrderId").get(Authentication, OrderPraController.printOrderByPraOrderId);
routers.route("/listAllDataByUserId").get(Authentication, OrderPraController.listAllDataByUserId);

module.exports = routers;
