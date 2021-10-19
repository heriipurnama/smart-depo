"use strict";

const express = require("express");
const routers = express.Router();

const { dailyMovementOutSum: DailyMovementOutSumController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, DailyMovementOutSumController.list);

module.exports = routers;