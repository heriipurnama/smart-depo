"use strict";

const express = require("express");
const routers = express.Router();

const { workOrder: WorkOrderController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, WorkOrderController.list);
routers.route("/detailWoHeader").get(Authentication, WorkOrderController.detailWoHeader);
routers.route("/listComboBox").get(Authentication, WorkOrderController.listComboBox);
routers.route("/updateAllWO").put(Authentication, WorkOrderController.updateAllWO);
routers.route("/updateWO").put(Authentication, WorkOrderController.updateWO);
routers.route("/insertData").post(Authentication, WorkOrderController.insertData);
routers.route("/deleteWO").put(Authentication, WorkOrderController.deleteWO);


module.exports = routers;