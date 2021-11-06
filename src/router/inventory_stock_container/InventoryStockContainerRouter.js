"use strict";

const express = require("express");
const routers = express.Router();

const {
	inventoryStockContainer: InventoryStockContainerController,
} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers
	.route("/getAll")
	.get(Authentication, InventoryStockContainerController.list);

module.exports = routers;
