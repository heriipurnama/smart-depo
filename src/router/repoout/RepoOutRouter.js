"use strict";

const express = require("express");
const routers = express.Router();

const { repoout: RepoOutController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, RepoOutController.list);

routers
	.route("/remainingRepo")
	.get(Authentication, RepoOutController.remainingRepo);
routers
	.route("/searchCompleteRepo")
	.get(Authentication, RepoOutController.searchCompleteRepo);
routers
	.route("/searchTotalPackage")
	.get(Authentication, RepoOutController.searchTotalPackage);

routers
	.route("/deleteHeaderRepo/:cpiorderno")
	.delete(Authentication, RepoOutController.deleteHeaderRepo);
routers
	.route("/insertDataRepoOut")
	.post(Authentication, RepoOutController.insertRepoOut);

routers
	.route("/viewDataRepoOutDetails")
	.get(Authentication, RepoOutController.viewDataRepoOutDetails);
routers
	.route("/insertDataPraRepoOutDetails")
	.post(Authentication, RepoOutController.insertPraRepoOutDetail);
routers
	.route("/updateDataRepoOutDetails")
	.put(Authentication, RepoOutController.updateDataRepoOutDetails);
routers
	.route("/checkValid")
	.get(Authentication, RepoOutController.checkValid);
module.exports = routers;
