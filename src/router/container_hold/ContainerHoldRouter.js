"use strict";

const express = require("express");
const routers = express.Router();
const { containerHold: ContainerHoldController} = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");

routers.route("/list").get(Authentication, ContainerHoldController.list);
routers.route("/detailConHold").get(Authentication, ContainerHoldController.detailConHold);
routers.route("/insertData").post(Authentication, ContainerHoldController.insertData);
routers.route("/deleteConHold").put(Authentication, ContainerHoldController.deleteConHold);

module.exports = routers;