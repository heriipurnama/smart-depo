"use strict";

const express = require("express");
const routers = express.Router();

const { woContainer: WoContainerController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, WoContainerController.list);
routers.route("/detailWo").get(Authentication, WoContainerController.detailWoContainer);
routers.route("/detailByWonoid").get(Authentication, WoContainerController.detailByWonoid);
routers.route("/updateWO").put(Authentication, WoContainerController.updateWOContainer);
routers.route("/insertData").post(Authentication, WoContainerController.insertData);
routers.route("/deleteWO").put(Authentication, WoContainerController.deleteWO);


module.exports = routers;