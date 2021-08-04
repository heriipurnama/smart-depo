"use strict";

const baseResponse = require("../../utils/helper/Response");
const { tblgroups } = require("../../db/models");

class GroupsController {

	static async getAllGroups(req, res, next) {
		try {
			let payload = await tblgroups.findAll();
			baseResponse({ message: "list groups", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = GroupsController;
