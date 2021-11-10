"use strict";

const express = require("express");
const routers = express.Router();

const {
	containerProcess: containerProcessController,
} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers
	.route("/gateIns")
	.post(Authentication, containerProcessController.gateIn);
routers
	.route("/printGateIns")
	.get(Authentication, containerProcessController.printGateIn);
routers
	.route("/printEIRIns")
	.get(Authentication, containerProcessController.printEIRIn);
routers
	.route("/printEIROut")
	.get(Authentication, containerProcessController.printEIROut);

module.exports = routers;
