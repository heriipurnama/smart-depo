"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_type } = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class ContainerTypeController {
	static async createNew(req, res, next) {
		let { ctDesc, ctCode } = req.body;

		try {
			const [payload, created] = await container_type.findOrCreate({
				where: {
					ctcode: ctCode,
				},
				defaults: {
					ctcode: ctCode,
					ctdesc: ctDesc,
				},
			});
			if (created === false) {
				throw new Error(`Container Type Exist, ctcode: ${ctCode} exists!`);
			} else {
				baseResponse({ message: "Container Type Created ", data: payload })(
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
		let { ctDesc, ctCode } = req.body;
		let dataUpdate = {
			ctcode: ctCode,
			ctdesc: ctDesc,
		};
		let selector = {
			where: { ctcode: ctCode },
		};
		try {
			let dataContainerType = await container_type.update(dataUpdate, selector);

			if (!dataContainerType) {
				throw new Error(`Container Type ${ctCode} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataContainerType,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listOne(req, res, next) {
		let { idContainerType } = req.body;

		try {
			let dataContainerType = await container_type.findOne({
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				where: {
					ctcode: idContainerType,
				},
			});

			if (!dataContainerType) {
				throw new Error(`container type: ${idContainerType} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataContainerType,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows, search, orderColumn, orderType} = req.body;
		let oc = (orderColumn == "")?"ctcode":orderColumn;
		// let mdl = (orderColumn =="" || orderColumn == 'ctcode')?"container":"container_code";
		let ot = (orderType == "")?"DESC":orderType;
		try {
			let { count, rows: datas } = await container_type.findAndCountAll({
				offset: start,
				limit: rows,
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				// ,
				// include:[{
				// 		model:container_type,
				// 		required: false, // do not generate INNER JOIN
				// 		attributes: { exclude:['createdAt', 'updatedAt']}
				// 	}]	
				where: {
					[Op.or]: [
					  { ctcode: { [Op.like]: `%${search}%`} },
					  { ctdesc: { [Op.like]: `%${search}%`} }					  
					]
				},
				order: [[oc, ot]]
			});
			baseResponse({
				message: "List Container Types",
				data: { datas, total: datas, count },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let { idContainerType } = req.body;
		try {
			let payload = await container_type.destroy({
				where: { ctcode: idContainerType },
			});
			baseResponse({ message: "Success Delete Container Type", data: payload })(
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

module.exports = ContainerTypeController;
