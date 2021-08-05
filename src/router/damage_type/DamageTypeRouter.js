"use strict";

const express = require("express");
const routers = express.Router();

const { damageType: DamageTypeController } = require("../../modules");

const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers.route("/create").post(DamageTypeController.createNew);
// routers.route("/update").post(DamageTypeController.update);
// routers.route("/list").get(DamageTypeController.list);
// routers.route("/listone").get(DamageTypeController.listOne);
// routers.route("/delete").delete(DamageTypeController.delete);
routers.route("/cek").post(Authentication, DamageTypeController.cek);



module.exports = routers;
