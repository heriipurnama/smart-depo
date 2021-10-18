"use strict";

const express = require("express");
const routers = express.Router();

const { inventoryMsc: InventoryMscController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, InventoryMscController.list);

module.exports = routers;