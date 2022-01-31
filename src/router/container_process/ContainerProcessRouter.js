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
	.route("/getKitirPepoIn")
	.get(Authentication, containerProcessController.getKitirPepoIn);	
routers
	.route("/getByCpiId")
	.get(Authentication, containerProcessController.getByCpiId);
routers
	.route("/getByCpiIdOut")
	.get(Authentication, containerProcessController.getByCpiIdOut);
routers
	.route("/updateSecurityIn")
	.put(Authentication, containerProcessController.updateSecurityIn);
routers
	.route("/updateSecurityOut")
	.put(Authentication, containerProcessController.updateSecurityOut);
routers
	.route("/getBarcodeGateIn")
	.get(Authentication, containerProcessController.getBarcodeGateIn);
routers
	.route("/getBarcodeSurvey")
	.get(Authentication, containerProcessController.getBarcodeSurvey);


module.exports = routers;
