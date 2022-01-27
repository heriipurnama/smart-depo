"use strict";

const express = require("express");
const routers = express.Router();

const { approval: ApprovalController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

//route approval
routers.route("/list").get(Authentication, ApprovalController.list);
routers
	.route("/listHeaderContainer")
	.get(Authentication, ApprovalController.listHeaderContainer);
routers
	.route("/listDetailContainer")
	.get(Authentication, ApprovalController.listDetailContainer);

routers
	.route("/create")
	.post(Authentication, ApprovalController.insertEstimasi);
routers
	.route("/printEstimasi")
	.get(Authentication, ApprovalController.printEstimasi);
routers
	.route("/delete")
	.delete(Authentication, ApprovalController.deleteEstmasiDetail);

module.exports = routers;
