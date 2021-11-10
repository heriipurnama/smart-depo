"use strict";

const express = require("express");
const routers = express.Router();

const { depoInfoMonthly: DepoInfoMonthlyController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, DepoInfoMonthlyController.list);

module.exports = routers;