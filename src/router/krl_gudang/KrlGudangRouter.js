"use strict";

const express = require("express");
const routers = express.Router();

const { krlGudang: KrlGudangController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers
    .route("/createNewData")
    .post(Authentication, KrlGudangController.createData);

module.exports = routers;
