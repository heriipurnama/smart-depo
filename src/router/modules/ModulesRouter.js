"use strict";

const express = require("express");
const routers = express.Router();

const { modules: ModulController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, ModulController.createNew);
routers.route("/getAllData").get(Authentication, ModulController.list);
routers.route("/getDetailData").get(Authentication, ModulController.listOne);
routers.route("/updateData").put(Authentication, ModulController.update);

routers.route("/deleteData").delete(Authentication, ModulController.delete);

module.exports = routers;
