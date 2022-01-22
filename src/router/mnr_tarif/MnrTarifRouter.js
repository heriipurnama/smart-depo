"use strict";

const express = require("express");
const routers = express.Router();

const { mnr_tarif: MnrTarifController} = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");

routers
    .route("/create")
    .post(Authentication, MnrTarifController.createNew);
routers.route("/update").post(Authentication, MnrTarifController.update);
routers.route("/list").get(Authentication, MnrTarifController.list);
routers.route("/listone").get(Authentication, MnrTarifController.listOne);
routers.route("/delete").delete(Authentication, MnrTarifController.delete);

module.exports = routers;