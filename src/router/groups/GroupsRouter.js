"use strict";

const express = require("express");
const routers = express.Router();

const { groups: GroupsController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers
	.route("/allGroups")
	.get(Authentication, GroupsController.getAllGroups);

module.exports = routers;