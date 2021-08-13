"use strict";

const express = require("express");
const routers = express.Router();

// const ContainerController = require("../../modules/container/ContainerController");
const { container: ContainerController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

// routers.route("/create").post( ContainerController.create);
routers.route("/create").post(Authentication, ContainerController.createNew);
routers.route("/update").post(Authentication, ContainerController.update);
routers.route("/list").get(Authentication, ContainerController.list);
routers.route("/listone").get(Authentication, ContainerController.listOne);
routers.route("/delete").delete(Authentication, ContainerController.delete);
routers.route("/cek").post(Authentication, ContainerController.cek);
routers.route("/checkcCode").get(Authentication, ContainerController.checkContainerCode);



module.exports = routers;
