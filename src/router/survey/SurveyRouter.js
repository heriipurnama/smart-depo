"use strict";

const express = require("express");
const routers = express.Router();

const { survey: SurveyController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, SurveyController.list);

module.exports = routers;