"use strict";

const baseResponse = require("../../utils/helper/Response");
const { city, country } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class CityController {
	static async createNew(req, res, next) {
		let { name, cncode } = req.body;
		try {
			const [payload, created] = await city.findOrCreate({
				where: {
					city_name: name
				},
				defaults:{
					city_name: name,
					cncode: cncode
				}
			});
			if(created === false){
				throw new Error(`City Exist, ${name} exists!`);
			} else {
				baseResponse({ message:"City Created " , data: payload})(res, 200);
				Logger(req);
			}
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { cityId, name, cncode } = req.body;
		let dataUpdate = {
			city_name: name,
			cncode: cncode
		};
		let selector = { 
			where: { city_id: cityId }
		};
		try {
			let dataCity = await city.update(dataUpdate, selector);

			if (!dataCity) {
				throw new Error(`City ${cityId} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataCity,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { cityId } = req.body;
		
		try {
			let dataCity = await city.findOne({
				where: {
					city_id: cityId
				}
			});

			if (!dataCity) {
				throw new Error(`City: ${cityId} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataCity,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
			let { count, rows: datas } = await city.findAndCountAll({
				offset: start,
				limit: rows,
				include:[{
					model:country,
					required: false // do not generate INNER JOIN
				}]
			});
			baseResponse({ message: "List Cities", data: { datas,  count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {cityId} = req.body; 
		try {
			let dataCity = await city.destroy({
				where:{city_id: cityId}
			});
			if (!dataCity) {
				throw new Error(`City: ${cityId} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete City", data: dataCity })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async cek(req, res, next) {
		try {
			res.status(200);
			return res.json(req.body);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = CityController;
