"use strict";

const express = require("express");
const routers = express.Router();

const { message: MessageController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");

routers
	.route("/createMessages")
	.post(Authentication, MessageController.createMessages);

module.exports = routers;