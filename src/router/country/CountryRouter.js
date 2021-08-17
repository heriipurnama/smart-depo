"use strict";

const express = require("express");
const routers = express.Router();

const { country: CountryController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, CountryController.createNew);
routers.route("/update").post(Authentication, CountryController.update);
routers.route("/list").get(Authentication, CountryController.list);
routers.route("/listone").get(Authentication, CountryController.listOne);
routers.route("/delete").delete(Authentication, CountryController.delete);



module.exports = routers;
