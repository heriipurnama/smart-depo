"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_code, container_type } = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class ContainerCodeController {
	static async createNew(req, res, next) {
		let { ccCode, ctCode, ccLength, ccHeight, ccAlias1, ccAlias2 } = req.body;
		// return res.json(req.body);

		try {
			// const payload = await container_code.create({
			// 	cccode: ccCode,
			// 	ctcode: ctCode,
			// 	cclength: ccLength,
			// 	ccheight: ccHeight,
			// 	created_at: Date.now(),
			// 	created_by: idUser,
			// });

			const [payload, created] = await container_code.findOrCreate({
				where: {
					cccode: ccCode,
				},
				defaults: {
					cccode: ccCode,
					ctcode: ctCode,
					cclength: ccLength,
					ccheight: ccHeight,
					ccalias1: ccAlias1,
					ccalias2: ccAlias2,
				},
			});
			if (created === false) {
				throw new Error(`Container Exist, cccode: ${ccCode} exists!`);
			} else {
				baseResponse({ message: "Container Created ", data: payload })(
					res,
					200
				);
				Logger(req);
			}
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { ccCode, ctCode, ccLength, ccHeight, ccAlias1, ccAlias2 } = req.body;
		let dataUpdate = {
			cccode: ccCode,
			ctcode: ctCode,
			cclength: ccLength,
			ccheight: ccHeight,
			ccalias1: ccAlias1,
			ccalias2: ccAlias2,
		};
		let selector = {
			where: { cccode: ccCode },
		};
		try {
			let containerCode = ccCode;
			let dataContainer = await container_code.update(dataUpdate, selector);

			if (!dataContainer) {
				throw new Error(`container ${containerCode} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataContainer,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listOne(req, res, next) {
		let { ccCode } = req.body;

		try {
			let dataContainer = await container_code.findOne({
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				where: {
					cccode: ccCode,
				},
			});

			if (!dataContainer) {
				throw new Error(`container code: ${ccCode} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataContainer,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows, search, orderColumn, orderType} = req.body;
		let oc = (orderColumn == "")?"cccode":orderColumn;
		let ot = (orderType == "")?"DESC":orderType;
		try {
			let { count, rows: datas } = await container_code.findAndCountAll({
				offset: start,
				limit: rows,
				include:[{
					model:container_type,
					required: false, // do not generate INNER JOIN
				}],				
				where: {
					[Op.or]: [
					  { cccode : { [Op.like]: `%${search}%`} },
					  { ctcode :{ [Op.like]: `%${search}%`}},
					  { cclength :{ [Op.like]: `%${search}%`}},
					  { ccheight :{ [Op.like]: `%${search}%`}}					  
					]
				},
				order: [[ oc, ot]]
			});
			baseResponse({ message: "list container codes", data: { datas, count } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listContainerCode(req, res, next) {
		try {
			let { count, rows: datas } = await container_code.findAndCountAll({
			});
			baseResponse({ message: "list container codes", data: { datas, count } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let { ccCode } = req.body;
		try {
			let payload = await container_code.destroy({
				where: { cccode: ccCode },
			});
			baseResponse({ message: "Success Delete Container Code", data: payload })(
				res,
				200
			);
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

module.exports = ContainerCodeController;
