"use strict";

const express = require("express");
const routers = express.Router();

const { logActivity: LogActivityController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router
routers.route("/getAllData").get(Authentication, LogActivityController.listAllData);
routers.route("/getDetailData").get(Authentication, LogActivityController.detailData);
routers.route("/deleteData").delete(Authentication, LogActivityController.deleteData);

module.exports = routers;
