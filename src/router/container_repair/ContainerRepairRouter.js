"use strict";

const express = require("express");
const routers = express.Router();

const {
    containerRepair: containerRepairController, EstimasiController,
} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers
    .route("/listMnr")
    .get(Authentication, containerRepairController.listMnr);

routers.route("/finisRepair").post(
    Authentication,
    containerRepairController.finisRepair);

routers.route("/finisCleaning").post(
    Authentication,
    containerRepairController.finisCleaning);

routers.route("/listbycrno").get(Authentication, containerRepairController.listOneCrno);

routers
    .route("/getFileDetail")
    .get(Authentication, containerRepairController.getFileDetail);
routers
    .route("/getFile")
    .get(Authentication, containerRepairController.getFile);

module.exports = routers;
