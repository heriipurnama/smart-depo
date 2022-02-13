"use strict";

const express = require("express");
const routers = express.Router();

const { damageType: DamageTypeController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(Authentication, DamageTypeController.createNew);
routers.route("/update").post(Authentication, DamageTypeController.update);
routers.route("/list").get(Authentication, DamageTypeController.list);
routers.route("/listMobile").get(Authentication, DamageTypeController.listMobile);
routers.route("/listone").get(Authentication, DamageTypeController.listOne);
routers.route("/delete").delete(Authentication, DamageTypeController.delete);
routers.route("/cek").post(Authentication, DamageTypeController.cek);



module.exports = routers;
