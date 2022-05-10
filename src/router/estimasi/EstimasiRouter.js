"use strict";

const express = require("express");
const routers = express.Router();
const multer = require("multer");

const Authentication = require("../../utils/middleware/Auth");
const { estimasi: EstimasiController } = require("../../modules");
const storageFiles = require("../../utils/middleware/UploadFileEstimasi");

const maxSize = 5 * 1024 * 1024;

routers.route("/list").get(Authentication, EstimasiController.list);
routers.route("/listOnecpId").get(Authentication, EstimasiController.listOnecpId);
routers.route("/listOneCrno").get(Authentication, EstimasiController.listOneCrno);
routers.route("/listcalculated").get(Authentication, EstimasiController.listcalculated);
routers
	.route("/listHeaderContainer")
	.get(Authentication, EstimasiController.listHeaderContainer);
routers
	.route("/listDetailContainer")
	.get(Authentication, EstimasiController.listDetailContainer);

routers
	.route("/checkValidasiHeader")
	.get(Authentication, EstimasiController.checkValidasiHeader);

routers.route("/createHeader").post(
	Authentication,
	EstimasiController.insertEstimasiHeader);

routers.route("/createDetail").post(
	Authentication,
		multer({
			storage: storageFiles,
		}).array("file", 3),
	EstimasiController.insertEstimasiDetail);

routers
	.route("/printEstimasi")
	.get(Authentication, EstimasiController.printEstimasi);
routers
	.route("/delete")
	.delete(Authentication, EstimasiController.deleteEstmasiDetail);

routers.route("/updateDataHeader").put(
	Authentication,
	EstimasiController.updateDataHeader);

routers.route("/completeRepairItem").put(
	Authentication,
	EstimasiController.completeRepairItem);

routers.route("/updateDetail").put(
	Authentication,
	multer({
		storage: storageFiles,
		limits: { fileSize: maxSize },
	}).any("file"),
	EstimasiController.updateDataDetail);

routers
	.route("/getFileDetail")
	.get(Authentication, EstimasiController.getFileDetail);
routers
	.route("/getFile")
	.get(Authentication, EstimasiController.getFile);

routers.route("/nextEstimasi").post(
	Authentication,
	EstimasiController.nextEstimasi);

routers.route("/finalEstimasi").post(
	Authentication,
	EstimasiController.finalEstimasi);

module.exports = routers;
