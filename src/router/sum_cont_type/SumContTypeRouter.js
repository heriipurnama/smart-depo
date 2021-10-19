"use strict";

const express = require("express");
const routers = express.Router();

const { sumconttype: SumContTypeController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, SumContTypeController.list);

module.exports = routers;