"use strict";

const express = require("express");
const routers = express.Router();

const { damageStatStockContainer: DamageStatStockContainerController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, DamageStatStockContainerController.list);

module.exports = routers;