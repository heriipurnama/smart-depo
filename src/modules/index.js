"use strict";

module.exports = {
	user: require("./users/UserController"),
	message: require("./message/MessageController"),
	container: require("./container/ContainerController"),
	containerType: require("./container_type/ContainerTypeController"),
	groups: require("./groups/GroupsController")
};
