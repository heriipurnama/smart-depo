"use strict";

const express = require("express");
const routers = express.Router();

const { contract: ContractController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, ContractController.createNew);
routers.route("/update").post(Authentication, ContractController.update);
routers.route("/list").get(Authentication, ContractController.list);
routers.route("/listOne").get(Authentication, ContractController.listOne);
routers.route("/delete").delete(Authentication, ContractController.delete);



module.exports = routers;
