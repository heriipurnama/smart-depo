"use strict";

const express = require("express");
const routers = express.Router();

const { dailyRepairActivity: DailyRepairActivityController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, DailyRepairActivityController.list);

module.exports = routers;