"use strict";

const express = require("express");
const routers = express.Router();
const multer = require("multer");

const { orderRepo: OrderRepoController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");
const storageFiles = require("../../utils/middleware/Upload-file-repo");

const maxSize = 5 * 1024 * 1024;
// Router

routers.route("/createNewData").post(
	Authentication, 
	multer({
		storage: storageFiles,
		limits: { fileSize: maxSize },
	}).any("file"),
	OrderRepoController.createData);
    
routers.route("/getAllData").get(Authentication, OrderRepoController.listAllData);
routers.route("/getDetailData").get(Authentication, OrderRepoController.detailData);
routers.route("/updateData").put(
	Authentication,
	multer({
		storage: storageFiles,
		limits: { fileSize: maxSize },
	}).any("file"),
	OrderRepoController.updateData);

routers.route("/deleteData").delete(Authentication, OrderRepoController.deleteData);
routers.route("/createOrderRepoNo").get(Authentication, OrderRepoController.createOrderRepoNumber);
routers.route("/detailDataPraIn").post(Authentication, OrderRepoController.detailDataPraIn);
routers.route("/searchContainerNumbers").get(Authentication, OrderRepoController.searchPrainByContainerNumber);

routers.route("/printOrderByPraOrderId").get(Authentication, OrderRepoController.printOrderByPraOrderId);

module.exports = routers;
