"use strict";

const express = require("express");
const routers = express.Router();

const { eorcost: EorCostController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, EorCostController.list);

module.exports = routers;