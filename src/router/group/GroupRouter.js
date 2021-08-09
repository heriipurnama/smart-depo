"use strict";

const express = require("express");
const routers = express.Router();

const { group: GroupController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, GroupController.createNew);
routers.route("/update").post(Authentication, GroupController.update);
routers.route("/list").get(Authentication, GroupController.list);
routers.route("/listone").get(Authentication, GroupController.listOne);
routers.route("/delete").delete(Authentication, GroupController.delete);

module.exports = routers;