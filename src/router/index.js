"use strict";

const express = require("express");
const routers = express.Router();

const user = require("./users/UserRouter");
const messages = require("./message/MessageRouter");
const container_code = require("./container_code/ContainerCodeRouter");
const containerType = require("./container_type/ContainerTypeRouter");
const damageType = require("./damage_type/DamageTypeRouter");
const group = require("./group/GroupRouter");
const principal = require("./principal/PrincipalRouter");
const location = require("./location/LocationRouter");
const param = require("./param/ParamRouter");
const container = require("./container/ContainerRouter");
const privilege = require("./privilege/PrivilegeRouter");


const groups = require("./groups/GroupsRouter");

// base router
routers.use("/users", user);
routers.use("/messages", messages);
routers.use("/containercode", container_code);
routers.use("/containertype", containerType);
routers.use("/damagetype", damageType);
routers.use("/groups", group);
routers.use("/principals", principal);
routers.use("/locations", location);
routers.use("/params", param);
routers.use("/containers", container);
routers.use("/privilege", privilege);

routers.use("/groups", groups);

module.exports = routers;
