"use strict";

const express = require("express");
const routers = express.Router();

const { material: MaterialController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, MaterialController.createData);
routers.route("/getAllData").get(Authentication, MaterialController.listAllData);
routers.route("/getDetailData").get(Authentication, MaterialController.detailData);
routers.route("/updateData").put(Authentication, MaterialController.updateData);

routers.route("/deleteData").delete(Authentication, MaterialController.deleteData);

module.exports = routers;
