"use strict";

const express = require("express");
const routers = express.Router();

const { notification: NotificationController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, NotificationController.createData);
routers.route("/getAllData").get(Authentication, NotificationController.listAllData);
routers.route("/getDetailData").get(Authentication, NotificationController.detailData);
routers.route("/updateData").put(Authentication, NotificationController.updateData);

routers.route("/deleteData").delete(Authentication, NotificationController.deleteData);

module.exports = routers;
