"use strict";

const express = require("express");
const routers = express.Router();

const { gateOut: GateOutController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, GateOutController.list);
routers.route("/getAllSurveyor").get(Authentication, GateOutController.listAllSurveyor);
routers.route("/getByCrno").get(Authentication, GateOutController.getByCrno);
routers.route("/updateGateOut").put(Authentication, GateOutController.gateOutUpdate);

module.exports = routers;