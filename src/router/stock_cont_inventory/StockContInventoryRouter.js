"use strict";

const express = require("express");
const routers = express.Router();

const { stockcontinventory: StockContInventoryController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, StockContInventoryController.list);

module.exports = routers;