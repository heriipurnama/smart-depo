"use strict";

const express = require("express");
const routers = express.Router();

const { gateOut: GateOutController, CurrencyController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, GateOutController.list);
routers.route("/getByCrno").get(Authentication, GateOutController.getByCrno);
routers.route("/updateGateOut").put(Authentication, GateOutController.gateOutUpdate);

module.exports = routers;