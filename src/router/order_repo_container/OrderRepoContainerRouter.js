"use strict";

const express = require("express");
const routers = express.Router();

const { orderRepoContainer: OrderRepoContainerController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, OrderRepoContainerController.createData);
routers.route("/getAllData").get(Authentication, OrderRepoContainerController.listAllData);
routers.route("/getDetailData").get(Authentication, OrderRepoContainerController.detailData);
routers.route("/updateData").put(Authentication, OrderRepoContainerController.updateData);

routers.route("/deleteData").delete(Authentication, OrderRepoContainerController.deleteData);

module.exports = routers;
