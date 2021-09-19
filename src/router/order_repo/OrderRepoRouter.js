"use strict";

const express = require("express");
const routers = express.Router();

const { orderRepo: OrderRepoController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, OrderRepoController.createData);
routers.route("/getAllData").get(Authentication, OrderRepoController.listAllData);
routers.route("/getDetailData").get(Authentication, OrderRepoController.detailData);
routers.route("/updateData").put(Authentication, OrderRepoController.updateData);

routers.route("/deleteData").delete(Authentication, OrderRepoController.deleteData);
routers.route("/createPrainNo").get(Authentication, OrderRepoController.createPrainNumber);
routers.route("/detailDataPraIn").post(Authentication, OrderRepoController.detailDataPraIn);
routers.route("/searchContainerNumbers").get(Authentication, OrderRepoController.searchPrainByContainerNumber);

routers.route("/printOrderByPraOrderId").get(Authentication, OrderRepoController.printOrderByPraOrderId);

module.exports = routers;
