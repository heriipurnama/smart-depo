"use strict";

const express = require("express");
const routers = express.Router();

const { dailyMovementInMsc: DailyMovementInMscController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, DailyMovementInMscController.list);

module.exports = routers;