"use strict";

const baseResponse = require("../../utils/helper/Response");
const { damageTariff } = require("../../db/models");


class DamageTariffController {

	static async createData(req, res, next) {
		let { prcode, dmno, dmdate, dmexpdate, dmremarks } = req.body;
        
		try {

			const payload = await damageTariff.create({
				prcode: prcode, 
				dmno: dmno, 
				dmdate: dmdate, 
				dmexpdate: dmexpdate, 
				dmremarks: dmremarks
			});
            
			baseResponse({ message: "damageTariff", data: payload })(res, 200);
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

			let payload = await damageTariff.findAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list damageTariff", data: payload })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { prcode } = req.body;
        
		try {
			let payload = await damageTariff.findOne(
				{ where: { prcode : prcode }}
			);
			
			if (!payload) {
				throw new Error(`prcode damageTariff: ${prcode} doesn't exists!`);
			}
			baseResponse({ message: "detail data damageTariff prcode", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { prcode, dmno, dmdate, dmexpdate, dmremarks } = req.body;
        
		try {
 
			let dataUsername = await damageTariff.findOne({
				where: { prcode: prcode }
			});

			if (!dataUsername) {
				throw new Error(`damageTariff ${prcode} doesn't exists!`);
			}

			await damageTariff.update(
				{
					prcode: prcode, 
					dmno: dmno, 
					dmdate: dmdate, 
					dmexpdate: dmexpdate, 
					dmremarks: dmremarks
				},
				{ where: { prcode: prcode } }
			);

			baseResponse({ message: "prcode updated!", data:`damageTariff succes update for prcode : ${prcode}` })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { prcode } = req.body;

		try {
			let payload = await damageTariff.destroy({
				where: { prcode : prcode }
			});

			if (!payload) {
				throw new Error(`prcode: ${prcode} doesn't exists!`);
			}

			baseResponse({ message: `prcode: ${prcode} deleted succes`, data: payload })(res, 200);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = DamageTariffController;
