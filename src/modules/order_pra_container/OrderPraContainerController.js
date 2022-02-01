"use strict";

const baseResponse = require("../../utils/helper/Response");
const { orderPraContainer, container } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class OrderPraContainerController {
	static async createData(req, res, next) {
		let {
			praid,
			crno,
			cccode,
			ctcode,
			cclength,
			ccheight,
			cpife,
			cpishold,
			cpiremark,
			newContainer,
			cpigatedate,
			cpiflag,
			cpopr,
			cpcust,

			biaya_lolo,
			biaya_clean,
			cleaning_type,
			deposit,
			biaya_lain,
			pph23,
			sealno,
		} = req.body;

		try {
			let dataOrderPraContainer = {
				praid: praid,
				crno: crno,
				cccode: cccode,
				ctcode: ctcode,

				cclength: cclength,
				ccheight: ccheight,
				cpife: cpife,
				cpishold: cpishold,

				cpiremark: cpiremark,
				cpigatedate: cpigatedate,
				cpiflag: cpiflag,

				cpopr: cpopr,
				cpcust: cpcust,

				biaya_lolo: biaya_lolo,
				biaya_clean: biaya_clean,
				cleaning_type: cleaning_type,
				deposit: deposit,
				biaya_lain: biaya_lain,
				pph23: pph23,
				sealno:sealno,
			};

			let dataNewContainer = {
				crno: crno,
				cccode: cccode,
				mtcode: ctcode,
			};

			let payloadDataContainer;
			if (newContainer === 1) {
				payloadDataContainer = await container.create(dataNewContainer);
			}
			let payloadDataOrderPraContainer = await orderPraContainer.create(
				dataOrderPraContainer
			);

			let templateMessage =
				newContainer === 1
					? "Succes Created Data Container And Pra Order Container"
					: "Succes Created Data Pra Order Container";
			let templateResponData =
				newContainer === 1
					? {
						dataNewcontainer: payloadDataContainer,
						dataNewOrderPraContainer: payloadDataOrderPraContainer, // eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: { dataNewOrderPraContainer: payloadDataOrderPraContainer };

			baseResponse({
				message: templateMessage,
				data: templateResponData,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllData(req, res, next) {
		let { offset, limit, praid } = req.query;

		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas } = await orderPraContainer.findAndCountAll({
				where: { praid: praid },
				order: [["pracrnoid", "DESC"]],
				limit: limits,
				offset: offsets,
			});

			baseResponse({
				message: "list order pra container",
				data: { datas, count },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async detailData(req, res, next) {
		let { pracrnoid } = req.query;

		try {
			let payload = await orderPraContainer.findOne({
				where: { pracrnoid: pracrnoid },
			});

			if (!payload) {
				throw new Error(
					`pracrnoid order pra container: ${pracrnoid} doesn't exists!`
				);
			}
			baseResponse({
				message: "detail data order pra container",
				data: payload,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async updateData(req, res, next) {
		let {
			pracrnoid,
			praid,
			crno,
			cccode,
			ctcode,
			cclength,
			ccheight,
			cpife,
			cpishold,
			cpiremark,
			cpigatedate,
			cpiflag,
			cpopr,
			cpcust,

			biaya_lolo,
			biaya_clean,
			cleaning_type,
			deposit,
			biaya_lain,
			pph23,
		} = req.body;

		let dataBody = {
			praid: praid,
			crno: crno,
			cccode: cccode,
			ctcode: ctcode,

			cclength: cclength,
			ccheight: ccheight,
			cpife: cpife,
			cpishold: cpishold,

			cpiremark: cpiremark,
			cpigatedate: cpigatedate,
			cpiflag: cpiflag,

			cpopr: cpopr,
			cpcust: cpcust,
			biaya_lolo: biaya_lolo,
			biaya_clean: biaya_clean,
			cleaning_type: cleaning_type,
			deposit: deposit,
			biaya_lain: biaya_lain,
			pph23: pph23,
		};

		let selectedWhere = { where: { pracrnoid: pracrnoid } };

		try {
			let dataUsername = await orderPraContainer.findOne(selectedWhere);

			if (!dataUsername) {
				throw new Error(`order Pra Container ${pracrnoid} doesn't exists!`);
			}

			await orderPraContainer.update(dataBody, selectedWhere);

			baseResponse({
				message: "pracrnoid updated!",
				data: `order pra container succes update for pracrnoid : ${pracrnoid}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteData(req, res, next) {
		let { pracrnoid } = req.body;

		try {
			let payload = await orderPraContainer.destroy({
				where: { pracrnoid: pracrnoid },
			});

			if (!payload) {
				throw new Error(`pracrnoid: ${pracrnoid} doesn't exists!`);
			}

			baseResponse({
				message: `order pra container deleted for pracrnoid: ${pracrnoid}`,
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
}

module.exports = OrderPraContainerController;
