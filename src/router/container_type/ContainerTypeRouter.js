"use strict";

const express = require("express");
const routers = express.Router();

const { containerType: ContainerTypeController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(ContainerTypeController.createNew);
routers.route("/update").post(ContainerTypeController.update);
routers.route("/list").get(ContainerTypeController.list);
routers.route("/listone").get(ContainerTypeController.listOne);
routers.route("/delete").delete(ContainerTypeController.delete);
routers.route("/cek").post(Authentication, ContainerTypeController.cek);



module.exports = routers;
