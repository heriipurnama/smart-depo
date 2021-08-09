"use strict";

const express = require("express");
const routers = express.Router();

const { principal: PrincipalController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, PrincipalController.createNew);
routers.route("/update").post(Authentication, PrincipalController.update);
routers.route("/list").get(Authentication, PrincipalController.list);
routers.route("/listone").get(Authentication, PrincipalController.listOne);
routers.route("/delete").delete(Authentication, PrincipalController.delete);

module.exports = routers;