"use strict";

const baseResponse = require("../../utils/helper/Response");
const { group } = require("../../db/models");

class GroupController {
	static async createNew(req, res, next) {
		let { name, desc} = req.body;
		try {
			const [payload, created] = await group.findOrCreate({
				where: {
					group_name: name
				},
				defaults:{
					description: desc
				}
			});
			if(created === false){
				throw new Error(`Group Exist, Group Name: ${name} exists!`);
			} else {
				baseResponse({ message:"Group Created " , data: payload})(res, 200);
			}
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { name, desc, id} = req.body;
		let dataUpdate = {
			group_name: name,
			description: desc
		};
		let selector = { 
			where: { group_id: id }
		};
		try {
			let dataGroup = await group.update(dataUpdate, selector);

			if (!dataGroup) {
				throw new Error(`Group ${id} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataUpdate,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { id } = req.body;
		
		try {
			let dataList = await group.findOne({ 
				attributes: {
					exclude: ["createdAt", "updatedAt"]
				},
				where: {
					group_id: id
				}
			});

			if (!dataList) {
				throw new Error(`Group Id: ${id} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataList,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
			let payload = await group.findAll({
				offset: start,
				limit: rows
			});
			baseResponse({ message: "List Groups", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {id} = req.body; 
		try {
			let dataDelete = await group.destroy({
				where:{ group_id: id}
			});
			if (!dataDelete) {
				throw new Error(`Group id: ${id} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Group", data: dataDelete })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = GroupController;
