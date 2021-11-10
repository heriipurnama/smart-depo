"use strict";

const express = require("express");
const routers = express.Router();

const { dailyMovementOutMsc: DailyMovementOutMscController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, DailyMovementOutMscController.list);

module.exports = routers;