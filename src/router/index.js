"use strict";

const express = require("express");
const routers = express.Router();

const user = require("./users/UserRouter");
const messages = require("./message/MessageRouter");
const container = require("./container/ContainerRouter");
const containerType = require("./container_type/ContainerTypeRouter");
const damageType = require("./damage_type/DamageTypeRouter");
const group = require("./group/GroupRouter");


// base router
routers.use("/users", user);
routers.use("/messages", messages);
routers.use("/container", container);
routers.use("/containertype", containerType);
routers.use("/damagetype", damageType);
routers.use("/groups", group);

module.exports = routers;
