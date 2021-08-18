"use strict";

const express = require("express");
const routers = express.Router();

const { port: PortController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, PortController.createNew);
routers.route("/update").post(Authentication, PortController.update);
routers.route("/list").get(Authentication, PortController.list);
routers.route("/listone").get(Authentication, PortController.listOne);
routers.route("/delete").delete(Authentication, PortController.delete);



module.exports = routers;
