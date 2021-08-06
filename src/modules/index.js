"use strict";

module.exports = {
	user: require("./users/UserController"),
	message: require("./message/MessageController"),
	container: require("./container/ContainerController"),
	containerType: require("./container_type/ContainerTypeController"),
	damageType: require("./damage_type/DamageTypeController"),
	group: require("./group/GroupController")
};
