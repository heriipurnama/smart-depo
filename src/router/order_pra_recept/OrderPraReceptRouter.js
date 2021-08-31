"use strict";

const express = require("express");
const routers = express.Router();

const { orderPraRecept: OrderPraReceptController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

// Router

routers.route("/createNewData").post(Authentication, OrderPraReceptController.createData);
routers.route("/getAllData").get(Authentication, OrderPraReceptController.listAllData);
routers.route("/getDetailData").get(Authentication, OrderPraReceptController.detailData);
routers.route("/updateData").put(Authentication, OrderPraReceptController.updateData);

routers.route("/deleteData").delete(Authentication, OrderPraReceptController.deleteData);

module.exports = routers;
