"use strict";

const express = require("express");
const routers = express.Router();

const { mskGudang: MskGudangController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers
    .route("/createNewData")
    .post(Authentication, MskGudangController.createData);
routers.route("/getAllData").get(Authentication, MskGudangController.listAllData);
routers
    .route("/getDetailData")
    .get(Authentication, MskGudangController.detailData);
routers.route("/updateData").put(Authentication, MskGudangController.updateData);
routers
    .route("/deleteData")
    .delete(Authentication, MskGudangController.deleteData);
routers
    .route("/getCucode")
    .get(Authentication, MskGudangController.getCucode());
routers
    .route("/getWarehouse")
    .get(Authentication, MskGudangController.getWarehouse());

module.exports = routers;
