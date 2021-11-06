"use strict";

const express = require("express");
const routers = express.Router();

const { inventoryContainerOut: InventoryContainerOutController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, InventoryContainerOutController.list);

module.exports = routers;