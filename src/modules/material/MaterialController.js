"use strict";

const baseResponse = require("../../utils/helper/Response");
const { material } = require("../../db/models");


class materialController {

	static async createData(req, res, next) {
		let { mtcode, mtdesc } = req.body;
        
		try {

			const payload = await material.create({
				mtcode: mtcode, 
				mtdesc: mtdesc
			});
            
			baseResponse({ message: "material", data: payload })(res);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllData(req, res, next){
		let { offset, limit } = req.query;

		try {

			let offsets = parseInt(offset) || 1;
			let limits = parseInt(limit) || 10;

			let payload = await material.findAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list material", data: payload })(res, 200);
			
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
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = materialController;
