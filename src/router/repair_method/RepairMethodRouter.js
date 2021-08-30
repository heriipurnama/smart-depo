"use strict";

const express = require("express");
const routers = express.Router();

const { repairMethod: RepairMethodController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, RepairMethodController.createData);
routers.route("/getAllData").get(Authentication, RepairMethodController.listAllData);
routers.route("/getDetailData").get(Authentication, RepairMethodController.detailData);
routers.route("/updateData").put(Authentication, RepairMethodController.updateData);

routers.route("/deleteData").delete(Authentication, RepairMethodController.deleteData);

module.exports = routers;