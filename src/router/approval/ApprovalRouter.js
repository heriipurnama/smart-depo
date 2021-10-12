"use strict";

const express = require("express");
const routers = express.Router();

const { approval: ApprovalController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, ApprovalController.list);

module.exports = routers;