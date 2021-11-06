"use strict";

const express = require("express");
const routers = express.Router();

const { inventoryContainerIn: InventoryContainerInController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, InventoryContainerInController.list);

module.exports = routers;