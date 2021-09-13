"use strict";

const { notification } = require("../../db/models");
const baseResponse = require("../../utils/helper/Response");
const Logger = require("../../utils/helper/logger");

class NotificationController {

	static async createData(req, res, next) {
		let { message, module, createdBy } = req.body;
        
		try {
			let dataInput = {
				message: message, 
				module: module, 
				created_by: createdBy,
				created_date: new Date
			};

			const payload = await notification.create(dataInput);

			baseResponse({ message: "notification", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	// list all data notification  is not READ!
	static async listAllData(req, res, next){
		let { offset, limit } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas }  = await notification.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list notification", data: { datas, count }})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { idNotification } = req.body;
        
		try {
			let payload = await notification.findOne(
				{ where: { notification_id : idNotification }}
			);
			
			if (!payload) {
				throw new Error(`idNotification : ${idNotification} doesn't exists!`);
			}
			baseResponse({ message: "detail data notification", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
        
		try {
			
			await notification.update({ is_read: 1 }, { where: { is_read : 0 }});

			baseResponse({ message: "notification updated!", data:"notification succes update for user" })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { idNotification } = req.body;

		try {
			let payload = await notification.destroy({
				where: { notification_id : idNotification }
			});

			if (!payload) {
				throw new Error(`notification_id: ${idNotification} doesn't exists!`);
			}

			baseResponse({ message: "idNotification deleted", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = NotificationController;
