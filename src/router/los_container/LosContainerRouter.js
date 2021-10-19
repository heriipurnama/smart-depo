"use strict";

const express = require("express");
const routers = express.Router();

const { losContainer: LosContainerController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, LosContainerController.list);

module.exports = routers;