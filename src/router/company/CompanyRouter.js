"use strict";

const express = require("express");
const routers = express.Router();

const { company: CompanyController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, CompanyController.createNew);
routers.route("/update").post(Authentication, CompanyController.update);
routers.route("/list").get(Authentication, CompanyController.list);
routers.route("/listOne").get(Authentication, CompanyController.listOne);
routers.route("/delete").delete(Authentication, CompanyController.delete);



module.exports = routers;
