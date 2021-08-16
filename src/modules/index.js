"use strict";

module.exports = {
	user: require("./users/UserController"),
	message: require("./message/MessageController"),
	container_code: require("./container_code/ContainerCodeController"),
	containerType: require("./container_type/ContainerTypeController"),

	damageType: require("./damage_type/DamageTypeController"),
	group: require("./group/GroupController"),
	principal: require("./principal/PrincipalController"),
	location: require("./location/LocationController"),

	param: require("./param/ParamController"),
	groups: require("./groups/GroupsController"),
	container: require("./container/ContainerController"),
	privilege: require("./privilege/PrivilegeController"),
	city: require("./city/CityController")

};
