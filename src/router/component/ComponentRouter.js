"use strict";

const express = require("express");
const routers = express.Router();

const { component: ComponentController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, ComponentController.createNew);
routers.route("/update").post(Authentication, ComponentController.update);
routers.route("/list").get(Authentication, ComponentController.list);
routers.route("/listComponen").get(Authentication, ComponentController.listComponen);
routers.route("/listone").get(Authentication, ComponentController.listOne);
routers.route("/delete").delete(Authentication, ComponentController.delete);



module.exports = routers;
