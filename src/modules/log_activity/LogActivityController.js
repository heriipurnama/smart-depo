"use strict";

const baseResponse = require("../../utils/helper/Response");
const { logActivity } = require("../../db/models");


class LogActivityController {

	static async listAllData(req, res, next){
		let { offset, limit } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let payload = await logActivity.findAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list logActivity", data: payload })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { logid } = req.body;
        
		try {
			let payload = await logActivity.findOne(
				{ where: { logid : logid }}
			);
			
			if (!payload) {
				throw new Error(`logid log Activity: ${logid} doesn't exists!`);
			}
			baseResponse({ message: "detail data log Activity logid", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { logid } = req.body;

		try {
			let payload = await logActivity.destroy({
				where: { logid : logid }
			});

			if (!payload) {
				throw new Error(`logid: ${logid} doesn't exists!`);
			}

			baseResponse({ message: "logid deleted", data: payload })(res, 200);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = LogActivityController;
