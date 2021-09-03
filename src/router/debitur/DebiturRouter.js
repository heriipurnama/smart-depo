"use strict";

const express = require("express");
const routers = express.Router();

const { debitur: DebiturController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, DebiturController.createData);
routers.route("/getAllData").get(Authentication, DebiturController.listAllData);
routers.route("/getDetailData").get(Authentication, DebiturController.detailData);
routers.route("/updateData").put(Authentication, DebiturController.updateData);

routers.route("/deleteData").delete(Authentication, DebiturController.deleteData);

module.exports = routers;
