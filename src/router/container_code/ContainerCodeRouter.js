"use strict";

const express = require("express");
const routers = express.Router();

// const ContainerController = require("../../modules/container/ContainerController");
const { container_code: ContainerCodeController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");

// routers.route("/create").post( ContainerController.create);
routers
	.route("/create")
	.post(Authentication, ContainerCodeController.createNew);
routers.route("/update").post(Authentication, ContainerCodeController.update);
routers.route("/list").get(Authentication, ContainerCodeController.list);
routers.route("/listContainerCode").get(Authentication, ContainerCodeController.listContainerCode);
routers.route("/listone").get(Authentication, ContainerCodeController.listOne);
routers.route("/delete").delete(Authentication, ContainerCodeController.delete);
routers.route("/cek").post(Authentication, ContainerCodeController.cek);

module.exports = routers;
