"use strict";

const express = require("express");
const routers = express.Router();

const { depo: DepoController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, DepoController.createData);
routers.route("/getAllData").get(Authentication, DepoController.listAllData);
routers.route("/getDetailData").get(Authentication, DepoController.detailData);
routers.route("/updateData").put(Authentication, DepoController.updateData);

routers.route("/deleteData").delete(Authentication, DepoController.deleteData);

module.exports = routers;
