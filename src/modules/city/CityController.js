"use strict";

const baseResponse = require("../../utils/helper/Response");
const { city } = require("../../db/models");

class CityController {
	static async createNew(req, res, next) {
        let { name, code } = req.body;
		try {
			const [payload, created] = await city.findOrCreate({
				where: {
					city_name: name
				},
				defaults:{
                    city_name: name,
                    encode: code
				}
            })
            if(created === false){
                throw new Error(`City Exist, ${name} exists!`);
            } else {
            baseResponse({ message:"City Created " , data: payload})(res);
            }
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { cityId, name, code } = req.body;
		let dataUpdate = {
            city_name: name,
            encode: code
		}
		let selector = { 
			where: { city_id: cityId }
		};
		try {
			let dataCity = await city.update(dataUpdate, selector);

			if (!dataCity) {
				throw new Error(`City ${idDamageType} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataCity,
			})(res, 200);
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
			let payload = await city.findAll({
				offset: start,
				limit: rows
			});
			baseResponse({ message: "List Cities", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {cityId} = req.body 
		try {
			let dataCity = await city.destroy({
				where:{city_id: cityId}
            });
            if (!dataCity) {
				throw new Error(`City: ${cityId} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete City", data: dataCity })(res, 200);
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
