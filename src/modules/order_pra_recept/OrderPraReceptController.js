"use strict";

const baseResponse = require("../../utils/helper/Response");
const { orderPraRecept, orderPraFile } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class OrderPraReceptController {
	static async createData(req, res, next) {
		let {
			praid,
			cpireceptno,
			cpicurr,
			cpirate,
			tot_lolo,
			biaya_adm,
			total_pajak,
			materai,
			total_tagihan,
		} = req.body;

		try {
			const payload = await orderPraRecept.create({
				praid: praid,
				cpireceptno: cpireceptno,
				cpicurr: cpicurr,

				cpirate: cpirate,
				tot_lolo: tot_lolo,
				biaya_adm: biaya_adm,
				total_pajak: total_pajak,
				materai: materai,
				total_tagihan: total_tagihan,
			});

			baseResponse({
				message: "succes created order Pra recept",
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

			let { count, rows: datas } = await orderPraRecept.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: orderPraFile,
						as: "files",
					},
				],
			});
			baseResponse({ message: "list order pra", data: { datas, count } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async detailData(req, res, next) {
		let { prareceptid } = req.body;

		try {
			let payload = await orderPraRecept.findOne({
				include: [
					{
						model: orderPraFile,
						as: "files",
					},
				],
				where: { prareceptid: prareceptid },
			});

			if (!payload) {
				throw new Error(
					`prareceptid order pra container: ${prareceptid} doesn't exists!`
				);
			}
			baseResponse({ message: "detail data order pra recept", data: payload })(
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
			prareceptid,
			praid,
			cpireceptno,
			cpicurr,
			cpirate,
			tot_lolo,
			biaya_adm,
			total_pajak,
			materai,
			total_tagihan,
		} = req.body;

		let dataBody = {
			prareceptid: prareceptid,
			praid: praid,
			cpireceptno: cpireceptno,
			cpicurr: cpicurr,

			cpirate: cpirate,
			tot_lolo: tot_lolo,
			biaya_adm: biaya_adm,
			total_pajak: total_pajak,
			materai: materai,
			total_tagihan: total_tagihan,
		};

		let selectedWhere = { where: { prareceptid: prareceptid } };

		try {
			let dataUsername = await orderPraRecept.findOne(selectedWhere);

			if (!dataUsername) {
				throw new Error(`order Pra recept ${prareceptid} doesn't exists!`);
			}

			await orderPraRecept.update(dataBody, selectedWhere);

			baseResponse({
				message: "prareceptid updated!",
				data: `order pra recept succes update for prareceptid : ${prareceptid}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteData(req, res, next) {
		let { prareceptid } = req.body;

		try {
			let payload = await orderPraRecept.destroy({
				where: { prareceptid: prareceptid },
			});

			if (!payload) {
				throw new Error(`prareceptid: ${prareceptid} doesn't exists!`);
			}

			baseResponse({
				message: `order pra recept deleted for pracrnoid: ${prareceptid}`,
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
}

module.exports = OrderPraReceptController;
