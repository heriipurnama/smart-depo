"use strict";

const { material } = require("../../db/models");
const baseResponse = require("../../utils/helper/Response");
const Logger = require("../../utils/helper/logger");

class materialController {

	static async createData(req, res, next) {
		let { mtcode, mtdesc } = req.body;
        
		try {

			const payload = await material.create({
				mtcode: mtcode, 
				mtdesc: mtdesc
			});

			baseResponse({ message: "material", data: payload })(res, 200);
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

			let { count, rows: datas }  = await material.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list material", data: { datas, count }})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { mtcode } = req.body;
        
		try {
			let payload = await material.findOne(
				{ where: { mtcode : mtcode }}
			);
			
			if (!payload) {
				throw new Error(`mtcode material: ${mtcode} doesn't exists!`);
			}
			baseResponse({ message: "detail data material mtcode", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { mtcode, mtdesc } = req.body;
        
		try {
 
			let dataUsername = await material.findOne({
				where: { mtcode: mtcode }
			});

			if (!dataUsername) {
				throw new Error(`material ${mtcode} doesn't exists!`);
			}

			await material.update(
				{
					mtcode: mtcode, 
					mtdesc: mtdesc
				},
				{ where: { mtcode: mtcode } }
			);

			baseResponse({ message: "mtcode updated!", data:`material succes update for user : ${mtcode}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { mtcode } = req.body;

		try {
			let payload = await material.destroy({
				where: { mtcode : mtcode }
			});

			if (!payload) {
				throw new Error(`mtcode: ${mtcode} doesn't exists!`);
			}

			baseResponse({ message: "mtcode deleted", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = materialController;
