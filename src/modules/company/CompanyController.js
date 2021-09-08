"use strict";

const baseResponse = require("../../utils/helper/Response");
const { company } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class CompanyController {
	static async createNew(req, res, next) {
		// let { cmCode, cmDesc, cmCode_ssl_ext } = req.body;
		let dataDefault = req.body;
		try {
			const payload = await company.create(dataDefault);
			
			baseResponse({ message:"Company Created " , data: payload})(res, 200);
			Logger(req);
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		// let { cmDesc, cmCode_ssl_ext, idCompany } = req.body;
		let dataUpdate = req.body;
		let selector = { 
			where: { dpcode: req.body.dpcode }
		};
		try {
			let dataCompany = await company.update(dataUpdate, selector);

			if (!dataCompany) {
				throw new Error(`Company ${dpcode} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataCompany,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { idCompany } = req.body;
		
		try {
			let dataCompany = await company.findOne({ 
				where: {
					dpcode: idCompany
				}
			});

			if (!dataCompany) {
				throw new Error(`Company: ${idCompany} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataCompany,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows} = req.body;

		try {
			let { count, rows: datas } = await company.findAndCountAll({
				offset: start,
				limit: rows
			});
			baseResponse({ message: "List Companies", data: { datas, total:rows, count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {idCompany} = req.body; 
		try {
			let dataCompany = await company.destroy({
				where:{dpcode: idCompany}
			});
			if (!dataCompany) {
				throw new Error(`Company: ${idCompany} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Company", data: dataCompany })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

}

module.exports = CompanyController;
