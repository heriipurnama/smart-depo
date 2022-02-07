"use strict";

const express = require("express");
const routers = express.Router();

const Authentication = require("../../utils/middleware/Auth");
const { estimasi: EstimasiController } = require("../../modules");

routers.route("/list").get(Authentication, EstimasiController.list);
routers.route("/listOnecpId").get(Authentication, EstimasiController.listOnecpId);
routers.route("/listOneCrno").get(Authentication, EstimasiController.listOneCrno);
routers
	.route("/listHeaderContainer")
	.get(Authentication, EstimasiController.listHeaderContainer);
routers
	.route("/listDetailContainer")
	.get(Authentication, EstimasiController.listDetailContainer);

routers
	.route("/create")
	.post(Authentication, EstimasiController.insertEstimasi);
routers
	.route("/printEstimasi")
	.get(Authentication, EstimasiController.printEstimasi);
routers
	.route("/delete")
	.delete(Authentication, EstimasiController.deleteEstmasiDetail);

module.exports = routers;
