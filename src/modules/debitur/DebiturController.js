"use strict";

const baseResponse = require("../../utils/helper/Response");
const { debitur } = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class DebiturController {
	static async createData(req, res, next) {
		let {
			cucode,
			cncode,
			cuname,
			cuaddr,
			cuzip,
			cuphone,
			cufax,
			cucontact,
			cuemail,
			cunpwp,
			cuskada,
			cudebtur,
			cutype,
			cunppkp,
		} = req.body;

		try {
			const payload = await debitur.create({
				cucode: cucode,
				cncode: cncode,
				cuname: cuname,
				cuaddr: cuaddr,
				cuzip: cuzip,
				cuphone: cuphone,
				cufax: cufax,
				cucontact: cucontact,
				cuemail: cuemail,
				cunpwp: cunpwp,
				cuskada: cuskada,
				cudebtur: cudebtur,
				cutype: cutype,
				cunppkp: cunppkp,
			});

			baseResponse({ message: "succes created debitur", data: payload })(
				res,
				200
			);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllDataByCutype(req, res, next) {
		let { offset, limit, cutype, search, orderColumn, orderType } = req.query;
		let oc = orderColumn == "" ? "cucode" : orderColumn;
		let ot = orderType == "" ? "DESC" : orderType;
		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas } = await debitur.findAndCountAll({
				// where: { cutype: cutype },

				offset: offsets,
				limit: limits,
				where: {
					[Op.and]: [{ cutype: cutype }],
					[Op.or]: [
						{ cucode: { [Op.like]: `%${search}%` } },
						{ cuname: { [Op.like]: `%${search}%` } },
					],
				},
				order: [[oc, ot]],
			});
			baseResponse({ message: "list debitur", data: { datas, count } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listAllData(req, res, next) {
		let { offset, limit } = req.query;

		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas } = await debitur.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list debitur", data: { datas, count } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async detailData(req, res, next) {
		let { cucode } = req.body;

		try {
			let payload = await debitur.findOne({ where: { cucode: cucode } });

			if (!payload) {
				throw new Error(`prcode debitur: ${cucode} doesn't exists!`);
			}
			baseResponse({ message: "detail data debitur cucode", data: payload })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async updateData(req, res, next) {
		let {
			cucode,
			cncode,
			cuname,
			cuaddr,
			cuzip,
			cuphone,
			cufax,
			cucontact,
			cuemail,
			cunpwp,
			cuskada,
			cudebtur,
			cutype,
			cunppkp,
		} = req.body;

		try {
			let dataUsername = await debitur.findOne({
				where: { cucode: cucode },
			});

			if (!dataUsername) {
				throw new Error(`debitur ${cucode} doesn't exists!`);
			}

			await debitur.update(
				{
					cucode: cucode,
					cncode: cncode,
					cuname: cuname,
					cuaddr: cuaddr,
					cuzip: cuzip,
					cuphone: cuphone,
					cufax: cufax,
					cucontact: cucontact,
					cuemail: cuemail,
					cunpwp: cunpwp,
					cuskada: cuskada,
					cudebtur: cudebtur,
					cutype: cutype,
					cunppkp: cunppkp,
				},
				{ where: { cucode: cucode } }
			);

			baseResponse({
				message: "cucode updated!",
				data: `debitur succes update for dpcode : ${cucode}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteData(req, res, next) {
		let { cucode } = req.body;

		try {
			let payload = await debitur.destroy({
				where: { cucode: cucode },
			});

			if (!payload) {
				throw new Error(`cucode: ${cucode} doesn't exists!`);
			}

			baseResponse({
				message: `debitur deleted for dpcode: ${cucode}`,
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
}

module.exports = DebiturController;
