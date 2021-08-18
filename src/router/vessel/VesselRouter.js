"use strict";

const express = require("express");
const routers = express.Router();

const { vessel: VesselController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, VesselController.createNew);
routers.route("/update").post(Authentication, VesselController.update);
routers.route("/list").get(Authentication, VesselController.list);
routers.route("/listone").get(Authentication, VesselController.listOne);
routers.route("/delete").delete(Authentication, VesselController.delete);



module.exports = routers;
