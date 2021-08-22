"use strict";

const baseResponse = require("../../utils/helper/Response");
const { tblcurrency } = require("../../db/models");


class currencyController {

	static async createNewCurrency(req, res, next) {
		let { tucode, currName, curSymbol } = req.body;
        
		try {

			const payload = await tblcurrency.create({
				tucode: tucode, 
				curr_name: currName, 
				curr_symbol: curSymbol
			});
            
			baseResponse({ message: "user currency", data: payload })(res);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllCurrency(req, res, next){
		let { offset, limit } = req.query;

		try {

			let offsets = parseInt(offset) || 1;
			let limits = parseInt(limit) || 10;

			let payload = await tblcurrency.findAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list curenncy", data: payload })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailCurrency(req, res, next) {
		let { tucode } = req.body;
        
		try {
			let payload = await tblcurrency.findOne(
				{ where: { tucode : tucode }}
			);
			
			if (!payload) {
				throw new Error(`currency: ${tucode} doesn't exists!`);
			}
			baseResponse({ message: "detail data currency", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateCurrency(req, res, next) {
		let { tucode, currName, curSymbol } = req.body;
        
		try {
 
			let dataUsername = await tblcurrency.findOne({
				where: { tucode: tucode }
			});

			if (!dataUsername) {
				throw new Error(`username ${tucode} doesn't exists!`);
			}

			await tblcurrency.update(
				{
					curr_name: currName, 
					curr_symbol: curSymbol
				},
				{ where: { tucode: tucode } }
			);

			baseResponse({ message: "currency updated!", data:`currency succes update for user : ${tucode}` })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteDataCurrency(req, res, next){
		let { tucode } = req.body;

		try {
			let payload = await tblcurrency.destroy({
				where: { tucode : tucode }
			});

			if (!payload) {
				throw new Error(`tucode: ${tucode} doesn't exists!`);
			}

			baseResponse({ message: "tucode deleted", data: payload })(res, 200);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = currencyController;
