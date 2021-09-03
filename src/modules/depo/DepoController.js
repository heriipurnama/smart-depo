"use strict";

const baseResponse = require("../../utils/helper/Response");
const { depo } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class DepoController {

	static async createData(req, res, next) {
		let { dpcode, dpname } = req.body;
        
		try {

			const payload = await depo.create({
				dpcode: dpcode, 
				dpname: dpname
			});
            
			baseResponse({ message: "succes created depo", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllData(req, res, next){
		let { offset, limit } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas } = await depo.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list depo", data: { datas, count }})(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { dpcode } = req.body;
        
		try {
			let payload = await depo.findOne(
				{ where: { dpcode : dpcode }}
			);
			
			if (!payload) {
				throw new Error(`dpcode depo: ${dpcode} doesn't exists!`);
			}
			baseResponse({ message: "detail data depo dpcode", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { dpcode, dpname } = req.body;
        
		try {
 
			let dataUsername = await depo.findOne({
				where: { dpcode: dpcode }
			});

			if (!dataUsername) {
				throw new Error(`depo ${dpcode} doesn't exists!`);
			}

			await depo.update(
				{
					dpcode: dpcode, 
					dpname: dpname
				},
				{ where: { dpcode: dpcode } }
			);

			baseResponse({ message: "dpcode updated!", data:`depo succes update for dpcode : ${dpcode}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { dpcode } = req.body;

		try {
			let payload = await depo.destroy({
				where: { dpcode : dpcode }
			});

			if (!payload) {
				throw new Error(`dpcode: ${dpcode} doesn't exists!`);
			}

			baseResponse({ message: `depo deleted for dpcode: ${dpcode}`, data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = DepoController;
