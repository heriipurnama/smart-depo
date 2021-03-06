"use strict";

const express = require("express");
const routers = express.Router();

const { repoin: RepoInController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, RepoInController.list);
routers
	.route("/remainingRepo")
	.get(Authentication, RepoInController.remainingRepo);
routers
	.route("/searchCompleteRepo")
	.get(Authentication, RepoInController.searchCompleteRepo);
routers
	.route("/searchTotalPackage")
	.get(Authentication, RepoInController.searchTotalPackage);

routers
	.route("/deleteHeaderRepo/:cpiorderno")
	.delete(Authentication, RepoInController.deleteHeaderRepo);
routers
	.route("/insertDataRepoIn")
	.post(Authentication, RepoInController.insertRepoIn);

routers
	.route("/viewDataRepoInDetails")
	.get(Authentication, RepoInController.viewDataRepoInDetails);
routers
	.route("/insertDataPraRepoInDetails")
	.post(Authentication, RepoInController.insertPraRepoInDetail);
routers
	.route("/updateDataRepoInDetails")
	.put(Authentication, RepoInController.updateDataRepoInDetails);
routers
	.route("/checkValid")
	.get(Authentication, RepoInController.checkValid);
module.exports = routers;
