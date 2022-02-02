"use strict";

const express = require("express");
const routers = express.Router();

const {
	orderContainerRepo: OrderContainerRepoController,
} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers
	.route("/createNewData")
	.post(Authentication, OrderContainerRepoController.createData);
routers
	.route("/getAllData")
	.get(Authentication, OrderContainerRepoController.listAllData);
routers
	.route("/getAllDataOut")
	.get(Authentication, OrderContainerRepoController.listAllDataOut);
routers
	.route("/getDetailData")
	.get(Authentication, OrderContainerRepoController.detailData);
routers
	.route("/updateData")
	.put(Authentication, OrderContainerRepoController.updateData);

routers
	.route("/deleteData")
	.delete(Authentication, OrderContainerRepoController.deleteData);

routers
	.route("/createOrderRepoNumber")
	.get(Authentication, OrderContainerRepoController.createOrderRepoNumber);

module.exports = routers;
