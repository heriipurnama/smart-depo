"use strict";

const express = require("express");
const routers = express.Router();

const { location: LocationController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, LocationController.createNew);
routers.route("/update").post(Authentication, LocationController.update);
routers.route("/list").get(Authentication, LocationController.list);
routers.route("/listone").get(Authentication, LocationController.listOne);
routers.route("/delete").delete(Authentication, LocationController.delete);

module.exports = routers;