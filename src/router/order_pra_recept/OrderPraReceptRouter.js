"use strict";

const express = require("express");
const routers = express.Router();
const multer = require("multer");

const { orderPraRecept: OrderPraReceptController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");
const storageFiles = require("../../utils/middleware/Uploads-recept");

const maxSize = 5 * 1024 * 1024;

// Router

routers.route("/createNewData").post(
	Authentication,
	multer({
		storage: storageFiles,
		limits: { fileSize: maxSize },
	}).any("file"),
	OrderPraReceptController.createData
);
routers
	.route("/getAllData")
	.get(Authentication, OrderPraReceptController.listAllData);
routers
	.route("/getDetailData")
	.get(Authentication, OrderPraReceptController.detailData);
routers
	.route("/updateData")
	.put(Authentication, OrderPraReceptController.updateData);

routers
	.route("/deleteData")
	.delete(Authentication, OrderPraReceptController.deleteData);

module.exports = routers;
