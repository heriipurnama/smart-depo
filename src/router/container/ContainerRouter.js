"use strict";

const express = require("express");
const routers = express.Router();

// const ContainerController = require("../../modules/container/ContainerController");
const { container: ContainerController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

// routers.route("/create").post( ContainerController.create);
routers.route("/create").post(ContainerController.createNew);
routers.route("/update").post(ContainerController.update);
routers.route("/list").get(ContainerController.list);
routers.route("/listone").get(ContainerController.listOne);
routers.route("/delete").delete(ContainerController.delete);
routers.route("/cek").post(Authentication, ContainerController.cek);



module.exports = routers;
