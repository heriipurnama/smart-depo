"use strict";

const express = require("express");
const routers = express.Router();

const { repoin: RepoInController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, RepoInController.list);

module.exports = routers;