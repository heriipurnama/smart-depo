"use strict";

const express = require("express");
const routers = express.Router();

const { param: ParamController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, ParamController.createNew);
routers.route("/update").post(Authentication, ParamController.update);
routers.route("/list").get(Authentication, ParamController.list);
routers.route("/listone").get(Authentication, ParamController.listOne);
routers.route("/delete").delete(Authentication, ParamController.delete);

module.exports = routers;