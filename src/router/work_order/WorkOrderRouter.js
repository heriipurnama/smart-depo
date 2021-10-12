"use strict";

const express = require("express");
const routers = express.Router();

const { workOrder: WorkOrderController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, WorkOrderController.list);

module.exports = routers;