"use strict";

const express = require("express");
const routers = express.Router();

const { otherWorkOrder: OtherWorkOrderController, WorkOrderController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, OtherWorkOrderController.list);
routers.route("/getWODnumber").get(Authentication, OtherWorkOrderController.getWODnumber);
routers.route("/detailWo").get(Authentication, OtherWorkOrderController.detailWoHeader);
routers.route("/updateWO").put(Authentication, OtherWorkOrderController.updateWO);
routers.route("/insertData").post(Authentication, OtherWorkOrderController.insertData);
routers.route("/deleteWO").put(Authentication, OtherWorkOrderController.deleteWO);


module.exports = routers;