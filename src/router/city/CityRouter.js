"use strict";

const express = require("express");
const routers = express.Router();

const { city: CityController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");

routers.route("/create").post(Authentication, CityController.createNew);
routers.route("/update").post(Authentication, CityController.update);
routers.route("/list").get(Authentication, CityController.list);
routers.route("/listone").get(Authentication, CityController.listOne);
routers.route("/delete").delete(Authentication, CityController.delete);
routers.route("/cek").delete(Authentication, CityController.cek);

module.exports = routers;
