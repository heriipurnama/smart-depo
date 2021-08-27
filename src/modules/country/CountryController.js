"use strict";

const baseResponse = require("../../utils/helper/Response");
const { country } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class CountryController {
	static async createNew(req, res, next) {
		let { cnCode, cnDesc } = req.body;
		try {
			const [payload, created] = await country.findOrCreate({
				where: {
					cncode: cnCode
				},
				defaults:{
					cndesc: cnDesc
				}
			});
			if(created === false){
				throw new Error(`Country Exist, ${cnCode} exists!`);
			} else {
				baseResponse({ message:"Country Created " , data: payload})(res, 200);
				Logger(req);
			}
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { cnCode, cnDesc } = req.body;
		let dataUpdate = {
			cncode: cnCode,
			cndesc: cnDesc
		};
		let selector = { 
			where: { cncode: cnCode }
		};
		try {
			let dataCountry = await country.update(dataUpdate, selector);

			if (!dataCountry) {
				throw new Error(`Country ${cnCode} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataCountry,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { cnCode } = req.body;
		
		try {
			let dataCountry = await country.findOne({
				where: {
					cncode: cnCode
				}
			});

			if (!dataCountry) {
				throw new Error(`country: ${cnCode} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataCountry,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
			let { count, rows: datas } = await country.findAndCountAll({
				offset: start,
				limit: rows
			});
			baseResponse({ message: "List Countries", data: { datas, total:datas, count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {cnCode} = req.body; 
		try {
			let dataCountry = await country.destroy({
				where:{cncode: cnCode}
			});
			if (!dataCountry) {
				throw new Error(`Country: ${cnCode} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Country", data: dataCountry })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = CountryController;
