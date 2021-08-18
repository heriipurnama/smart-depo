"use strict";

const express = require("express");
const routers = express.Router();

const { privilege: PrivilegeController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

// routers.route("/create").post( ContainerController.create);
routers.route("/create").post(Authentication, PrivilegeController.createNew);
routers.route("/update").post(Authentication, PrivilegeController.update);
routers.route("/list").get(Authentication, PrivilegeController.list);
routers.route("/listModule").get(Authentication, PrivilegeController.list);
routers.route("/listOne").get(Authentication, PrivilegeController.listOne);
routers.route("/delete").delete(Authentication, PrivilegeController.delete);



module.exports = routers;
