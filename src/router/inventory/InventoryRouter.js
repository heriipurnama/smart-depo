"use strict";

const express = require("express");
const routers = express.Router();

const { inventory: InventoryController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, InventoryController.list);

module.exports = routers;