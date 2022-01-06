"use strict";

const express = require("express");
const routers = express.Router();

const { survey: SurveyController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/getAll").get(Authentication, SurveyController.list);
routers.route("/checkValid").get(Authentication, SurveyController.checkValid);
routers.route("/getDetail").get(Authentication, SurveyController.getDetail);
routers.route("/createNew").post(Authentication, SurveyController.createData);
routers.route("/getSVID").get(Authentication, SurveyController.getSvnumber);
routers.route("/updateData").put(Authentication, SurveyController.updateData);
routers.route("/deleteData").delete(Authentication, SurveyController.deleteData);

module.exports = routers;