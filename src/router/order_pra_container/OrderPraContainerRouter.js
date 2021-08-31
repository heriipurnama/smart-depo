"use strict";

const express = require("express");
const routers = express.Router();

const { orderPraContainer: OrderPraContainerController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, OrderPraContainerController.createData);
routers.route("/getAllData").get(Authentication, OrderPraContainerController.listAllData);
routers.route("/getDetailData").get(Authentication, OrderPraContainerController.detailData);
routers.route("/updateData").put(Authentication, OrderPraContainerController.updateData);

routers.route("/deleteData").delete(Authentication, OrderPraContainerController.deleteData);

module.exports = routers;
