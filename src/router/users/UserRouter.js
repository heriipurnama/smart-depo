"use strict";

const express = require("express");
const routers = express.Router();

const { user: UserController } = require("../../modules");
const Authentication = require("../../utils/middleware/Auth");
const schemaValidation = require("../../utils/middleware/SchemaValidator");
const AuthorizeAdmin = require("../../utils/middleware/AuthorizeAdmin");

const Chace = require("../../utils/middleware/Chace");

// Router


routers.route("/auth/signup").post( schemaValidation.user(), schemaValidation.validate, UserController.signup);
routers.route("/auth/signin").post(UserController.signin);
routers.route("/auth/activate").get(UserController.activated);
routers.route("/auth/registers").post( Authentication, AuthorizeAdmin, schemaValidation.user(), schemaValidation.validate, UserController.register);

routers.route("/auth/updatePassword").put(UserController.updatePassword);

routers.route("/profile").get(Authentication, UserController.profile);
routers.route("/allUser").get(Authentication, AuthorizeAdmin, Chace, UserController.getAlluser);

module.exports = routers;
