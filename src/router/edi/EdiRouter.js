"use strict";

const express = require("express");
const routers = express.Router();

const { edi: EdiController} = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");

routers.route("/codecoin").get(Authentication, EdiController.codecoIn);
routers.route("/codecopti").get(Authentication, EdiController.codecoPTI);
routers.route("/codecoupdate").get(Authentication, EdiController.codecoUpdate);
routers.route("/codecoout").get(Authentication, EdiController.codecoOut);

module.exports = routers;