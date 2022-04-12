"use strict";

const express = require("express");
const routers = express.Router();

const { repoTarif : RepoTarifController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, RepoTarifController.createData);
routers.route("/getAllData").get(Authentication, RepoTarifController.listAllData);
routers.route("/getDetailData").get(Authentication, RepoTarifController.detailData);
routers.route("/updateData").put(Authentication, RepoTarifController.updateData);

routers.route("/deleteData").delete(Authentication, RepoTarifController.deleteData);

module.exports = routers;
