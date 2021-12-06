"use strict";

const baseResponse = require("../../utils/helper/Response");
const { contract } = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class ContractController {
	static async createNew(req, res, next) {
		let dataDefault = req.body;
		try {
			const payload = await contract.create(dataDefault);
			
			baseResponse({ message:"Contract Created " , data: payload})(res, 200);
			Logger(req);
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let dataUpdate = req.body;
		let selector = { 
			where: { prcode: req.body.prcode }
		};
		try {
			let dataContract = await contract.update(dataUpdate, selector);

			if (!dataContract) {
				throw new Error(`Contract ${req.body.prcode} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataContract,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { idContract } = req.body;
		
		try {
			let dataContract = await contract.findOne({ 
				where: {
					prcode: idContract
				}
			});

			if (!dataContract) {
				throw new Error(`Contract: ${idContract} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataContract,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows, search, orderColumn, orderType} = req.body;
		let oc = (orderColumn =="")?"cono":orderColumn;
		let ot = (orderType =="")?"DESC":orderType;

		try {
			let { count, rows: datas } = await contract.findAndCountAll({
				offset: start,
				limit: rows,
				where: {
					[Op.or]: [
					  { cono: { [Op.like]: `%${search}%`} },
					  { prcode: { [Op.like]: `%${search}%`} }
					]
				},
				order: [[ `${oc}`, `${ot}`]]
			});
			baseResponse({ message: "List Contracts", data: { datas, count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {idContract} = req.body; 
		try {
			let dataContract = await contract.destroy({
				where:{prcode: idContract}
			});
			if (!dataContract) {
				throw new Error(`Contract: ${idContract} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Contract", data: dataContract })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

}

module.exports = ContractController;
