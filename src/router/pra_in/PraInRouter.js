"use strict";

const express = require("express");
const routers = express.Router();

const { praIn: PraInController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers
	.route("/createNewData")
	.post(Authentication, PraInController.createNewData);
routers
	.route("/checkValid")
	.get(Authentication, PraInController.checkValid);

module.exports = routers;
