"use strict";

const express = require("express");
const routers = express.Router();

const { stockcontin: StockContInController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, StockContInController.list);

module.exports = routers;