"use strict";

const express = require("express");
const routers = express.Router();

const { woRecept: WoReceptController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, WoReceptController.list);
routers.route("/detailWoRecept").get(Authentication, WoReceptController.detailWoRecept);
routers.route("/updateWO").put(Authentication, WoReceptController.updateWO);
routers.route("/insertData").post(Authentication, WoReceptController.insertData);
routers.route("/deleteWO").put(Authentication, WoReceptController.deleteWO);


module.exports = routers;