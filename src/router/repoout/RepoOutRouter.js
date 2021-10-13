"use strict";

const express = require("express");
const routers = express.Router();

const { repoout: RepoOutController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, RepoOutController.list);

module.exports = routers;