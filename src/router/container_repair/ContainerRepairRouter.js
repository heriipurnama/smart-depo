"use strict";

const express = require("express");
const routers = express.Router();

const {
    containerRepair: containerRepairController,
} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers
    .route("/listMnr")
    .get(Authentication, containerRepairController.listMnr);

module.exports = routers;
