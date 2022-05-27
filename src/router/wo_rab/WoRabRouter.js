"use strict";

const express = require("express");
const routers = express.Router();

const { woRab: WoRabController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, WoRabController.list);
routers.route("/detailWoRab").get(Authentication, WoRabController.detailWoRab);
routers.route("/getRabByWonoID").get(Authentication, WoRabController.detailWoRabByWonoid);
routers.route("/updateWO").put(Authentication, WoRabController.updateWO);
routers.route("/insertData").post(Authentication, WoRabController.insertData);
routers.route("/deleteWO").put(Authentication, WoRabController.deleteWO);


module.exports = routers;