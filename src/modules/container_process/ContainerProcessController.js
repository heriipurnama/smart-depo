"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class ContainerProcessController {
	static async createData(req, res, next) {
		let { dpcode, dpname } = req.body;

		try {
			const payload = await container_process.create({
				dpcode: dpcode,
				dpname: dpname,
			});

			baseResponse({
				message: "succes created container_process",
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllData(req, res, next) {
		let { offset, limit } = req.query;

		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas } = await container_process.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({
				message: "list container_process",
				data: { datas, count },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async detailData(req, res, next) {
		let { dpcode } = req.body;

		try {
			let payload = await container_process.findOne({
				where: { dpcode: dpcode },
			});

			if (!payload) {
				throw new Error(`dpcode container_process: ${dpcode} doesn't exists!`);
			}
			baseResponse({
				message: "detail data container_process dpcode",
				data: payload,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async updateData(req, res, next) {
		let { dpcode, dpname } = req.body;

		try {
			let dataUsername = await container_process.findOne({
				where: { dpcode: dpcode },
			});

			if (!dataUsername) {
				throw new Error(`container_process ${dpcode} doesn't exists!`);
			}

			await container_process.update(
				{
					dpcode: dpcode,
					dpname: dpname,
				},
				{ where: { dpcode: dpcode } }
			);

			baseResponse({
				message: "dpcode updated!",
				data: `container_process succes update for dpcode : ${dpcode}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteData(req, res, next) {
		let { dpcode } = req.body;

		try {
			let payload = await container_process.destroy({
				where: { dpcode: dpcode },
			});

			if (!payload) {
				throw new Error(`dpcode: ${dpcode} doesn't exists!`);
			}

			baseResponse({
				message: `container_process deleted for dpcode: ${dpcode}`,
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async gateIn(req, res, next) {
		let { dpcode, dpname } = req.body;

		try {
			let dataUsername = await container_process.findOne({
				where: { dpcode: dpcode },
			});

			if (!dataUsername) {
				throw new Error(`container_process ${dpcode} doesn't exists!`);
			}

			await container_process.update(
				{
					dpcode: dpcode,
					dpname: dpname,
				},
				{ where: { dpcode: dpcode } }
			);

			baseResponse({
				message: "dpcode updated!",
				data: `container_process succes update for dpcode : ${dpcode}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = ContainerProcessController;
