"use strict";

const express = require("express");
const routers = express.Router();

const { gateOut: GateOutController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, GateOutController.list);

module.exports = routers;