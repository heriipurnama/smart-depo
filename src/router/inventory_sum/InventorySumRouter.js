"use strict";

const express = require("express");
const routers = express.Router();

const { inventorySum: InventorySumController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, InventorySumController.list);

module.exports = routers;