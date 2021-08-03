"use strict";

const express = require("express");
const routers = express.Router();

const user = require("./users/UserRouter");
const messages = require("./message/MessageRouter");
const container = require("./container/ContainerRouter");

// base router
routers.use("/users", user);
routers.use("/messages", messages);
routers.use("/container", container);

module.exports = routers;
