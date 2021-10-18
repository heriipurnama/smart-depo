"use strict";

const express = require("express");
const routers = express.Router();

const { inventoryNotAvailable: InventoryNotAvailableController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, InventoryNotAvailableController.list);

module.exports = routers;