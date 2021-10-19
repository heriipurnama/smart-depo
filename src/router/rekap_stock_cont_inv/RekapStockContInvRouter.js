"use strict";

const express = require("express");
const routers = express.Router();

const { rekapStockContInv: RekapStockContInvController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, RekapStockContInvController.list);

module.exports = routers;