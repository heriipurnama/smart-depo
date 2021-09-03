"use strict";

const express = require("express");
const routers = express.Router();

const { repoTariffDetail : RepoTariffDetail } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, RepoTariffDetail.createData);
routers.route("/getAllData").get(Authentication, RepoTariffDetail.listAllData);
routers.route("/getDetailData").get(Authentication, RepoTariffDetail.detailData);
routers.route("/updateData").put(Authentication, RepoTariffDetail.updateData);

routers.route("/deleteData").delete(Authentication, RepoTariffDetail.deleteData);

module.exports = routers;
