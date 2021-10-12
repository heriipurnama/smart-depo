"use strict";

const express = require("express");
const routers = express.Router();

const { estimation: EstimationController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, EstimationController.list);

module.exports = routers;