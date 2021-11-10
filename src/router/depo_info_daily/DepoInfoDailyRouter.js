"use strict";

const express = require("express");
const routers = express.Router();

const { depoInfoDaily: DepoInfoDailyController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, DepoInfoDailyController.list);

module.exports = routers;