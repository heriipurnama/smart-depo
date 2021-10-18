"use strict";

const express = require("express");
const routers = express.Router();

const { damageProgress: DamageProgressController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, DamageProgressController.list);

module.exports = routers;