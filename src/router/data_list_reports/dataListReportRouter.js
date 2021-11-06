"use strict";

const express = require("express");
const routers = express.Router();

const { dataListReport: DataListReportController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers
	.route("/listAllGateOuts")
	.get(Authentication, DataListReportController.listGateOut);
routers
	.route("/listAllSurveis")
	.get(Authentication, DataListReportController.listSurvey);
routers
	.route("/listAllEstimations")
	.get(Authentication, DataListReportController.listEstimation);
routers
	.route("/listAllApprovals")
	.get(Authentication, DataListReportController.listApproval);
routers
	.route("/listAllWOs")
	.get(Authentication, DataListReportController.listWO);
routers
	.route("/listAllMnRs")
	.get(Authentication, DataListReportController.listMnR);
routers
	.route("/listAllRepoIns")
	.get(Authentication, DataListReportController.listRepoIn);
routers
	.route("/listAllRepoOuts")
	.get(Authentication, DataListReportController.listRepoOut);
module.exports = routers;
