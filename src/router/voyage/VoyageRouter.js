"use strict";

const express = require("express");
const routers = express.Router();

const { voyage: VoyageController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, VoyageController.createNew);
routers.route("/update").post(Authentication, VoyageController.update);
routers.route("/list").get(Authentication, VoyageController.list);
routers.route("/listone").get(Authentication, VoyageController.listOne);
routers.route("/delete").delete(Authentication, VoyageController.delete);



module.exports = routers;
