"use strict";

const express = require("express");
const routers = express.Router();

const { containerType: ContainerTypeController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, ContainerTypeController.createNew);
routers.route("/update").post(Authentication, ContainerTypeController.update);
routers.route("/list").get(Authentication, ContainerTypeController.list);
routers.route("/listone").get(Authentication, ContainerTypeController.listOne);
routers.route("/delete").delete(Authentication, ContainerTypeController.delete);
routers.route("/cek").post(Authentication, ContainerTypeController.cek);



module.exports = routers;
