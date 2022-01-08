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
routers
	.route("/getDataGateIN")
	.get(Authentication, containerProcessController.getDataGateIN);
routers
	.route("/getAllDataGateIN")
	.get(Authentication, containerProcessController.getAllDataGateIN);
routers
	.route("/getByCpiorderno")
	.get(Authentication, containerProcessController.getByCpiorderno);
routers
	.route("/getByCpiId")
	.get(Authentication, containerProcessController.getByCpiId);
routers
	.route("/updateSecurityIn")
	.put(Authentication, containerProcessController.updateSecurityIn);
routers
	.route("/getBarcodeGateIn")
	.put(Authentication, containerProcessController.getBarcodeGateIn);
routers
	.route("/getBarcodeSurvey")
	.put(Authentication, containerProcessController.getBarcodeSurvey);


module.exports = routers;
