"use strict";

const express = require("express");
const routers = express.Router();

const user = require("./users/UserRouter");
const messages = require("./message/MessageRouter");

// base router
routers.use("/users", user);
routers.use("/messages", messages);

module.exports = routers;
