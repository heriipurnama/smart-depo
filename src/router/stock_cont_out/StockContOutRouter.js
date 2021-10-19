"use strict";

const express = require("express");
const routers = express.Router();

const { stockcontout: StockContOutController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, StockContOutController.list);

module.exports = routers;