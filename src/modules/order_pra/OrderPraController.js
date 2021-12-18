"use strict";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
require("dotenv").config();
const jwt = require("jsonwebtoken");

const baseResponse = require("../../utils/helper/Response");
const {
	orderPra,
	company,
	voyage,
	orderPraContainer,
	vessel,
	tblusers,
	orderPraFile,
	orderPraRecept,
} = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class OrderPraController {
	static async createData(req, res, next) {
		let {
			cpiorderno,
			cpopr,
			cpcust,
			cpidish,
			cpidisdat,
			liftoffcharge,
			cpdepo,
			cpipratgl,
			cpirefin,
			cpijam,
			cpivoyid,
			cpives,
			cpicargo,
			cpideliver,
			cpilunas,
			appv,
			checkbill,
			totalcharge,
			typedo,
		} = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let idUsernameByToken = datas.id;

		try {
			const payload = await orderPra.create({
				cpiorderno: cpiorderno,
				cpopr: cpopr,
				cpcust: cpcust,
				cpidish: cpidish,

				cpidisdat: cpidisdat,
				liftoffcharge: liftoffcharge,
				cpdepo: cpdepo,
				cpipratgl: cpipratgl,

				cpirefin: cpirefin,
				cpijam: cpijam,
				cpivoyid: cpivoyid,
				cpives: cpives,

				cpicargo: cpicargo,
				cpideliver: cpideliver,
				cpilunas: cpilunas,
				appv: appv,
				checkbill: checkbill,
				totalcharge: totalcharge,

				crtby: idUsernameByToken,
				crton: new Date(),
				mdfby: idUsernameByToken,
				mdfon: new Date(),
				type_do: typedo,
			});

			const payloadPraFile = await orderPraFile.findAll({
				where: { cpiorderno: cpiorderno },
			});

			const message = {
				"data order Pra": payload,
				"data order pra file": payloadPraFile,
			};
			baseResponse({ message: "succes created order Pra", data: message })(
				res,
				200
			);
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

			let { count, rows: datas } = await orderPra.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: voyage,
						as: "voyages",
						attributes: ["voyid", "vesid", "voyno"],
					},
					{
						model: orderPraContainer,
						as: "orderPraContainers",
						attributes: [
							"pracrnoid",
							"praid",
							"crno",
							"cccode",
							"ctcode",
							"cclength",
							"ccheight",
							"cpife",
							"cpishold",
							"cpiremark",
							"cpigatedate",
							"cpiflag",
						],
						order: [
							[
								{ model: orderPraContainer, as: "orderPraContainers" },
								"pracrnoid",
								"ASC",
							],
						],
					},
					{
						model: tblusers,
						as: "users",
					},
					{
						model: orderPraFile,
						as: "files",
					},
				],
				order: [["praid", "DESC"]],
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

	static async listAllDataByUserId(req, res, next) {
		let { offset, limit, userId } = req.query;

		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas } = await orderPra.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: voyage,
						as: "voyages",
						attributes: ["voyid", "vesid", "voyno"],
					},
					{
						model: orderPraContainer,
						as: "orderPraContainers",
						attributes: [
							"pracrnoid",
							"praid",
							"crno",
							"cccode",
							"ctcode",
							"cclength",
							"ccheight",
							"cpife",
							"cpishold",
							"cpiremark",
							"cpigatedate",
							"cpiflag",
						],
						order: [
							[
								{ model: orderPraContainer, as: "orderPraContainers" },
								"pracrnoid",
								"ASC",
							],
						],
					},
					{
						model: tblusers,
						as: "users",
					},
					{
						model: orderPraFile,
						as: "files",
					},
				],
				where: { crtby: userId },
				order: [["praid", "DESC"]],
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
		let { praid } = req.query;

		try {
			let payload = await orderPra.findOne({
				include: [
					{
						model: voyage,
						as: "voyages",
						attributes: ["voyid", "vesid", "voyno"],
					},
					{
						model: orderPraContainer,
						as: "orderPraContainers",
						attributes: [
							"pracrnoid",
							"praid",
							"crno",
							"cccode",
							"ctcode",
							"cclength",
							"ccheight",
							"cpife",
							"cpishold",
							"cpiremark",
							"cpigatedate",
							"cpiflag",
						],
						order: [
							[
								{ model: orderPraContainer, as: "orderPraContainers" },
								"pracrnoid",
								"ASC",
							],
						],
					},
					{
						model: tblusers,
						as: "users",
					},
					{
						model: orderPraFile,
						as: "files",
					},
				],
				where: { praid: praid },
			});

			if (!payload) {
				throw new Error(`praid order pra: ${praid} doesn't exists!`);
			}
			baseResponse({ message: "detail data order pra praid", data: payload })(
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
			cpiorderno,
			cpopr,
			cpcust,
			cpidish,
			cpidisdat,
			liftoffcharge,
			cpdepo,
			cpipratgl,
			cpirefin,
			cpijam,
			cpivoyid,
			cpives,
			cpicargo,
			cpideliver,
			praid,
			appv,
			checkbill,
			totalcharge,
			typedo,
		} = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let idUsernameByToken = datas.id;

		try {
			let dataUsername = await orderPra.findOne({
				where: { praid: praid },
			});

			if (!dataUsername) {
				throw new Error(`orderPra ${praid} doesn't exists!`);
			}

			await orderPra.update(
				{
					cpiorderno: cpiorderno,
					cpopr: cpopr,
					cpcust: cpcust,
					cpidish: cpidish,

					cpidisdat: cpidisdat,
					liftoffcharge: liftoffcharge,
					cpdepo: cpdepo,
					cpipratgl: cpipratgl,

					cpirefin: cpirefin,
					cpijam: cpijam,
					cpivoyid: cpivoyid,
					cpives: cpives,

					cpicargo: cpicargo,
					cpideliver: cpideliver,
					appv: appv,
					checkbill: checkbill,
					totalcharge: totalcharge,

					mdfby: idUsernameByToken,
					mdfon: new Date(),
					type_do: typedo,
				},
				{ where: { praid: praid } }
			);

			baseResponse({
				message: "praid updated!",
				data: `order pra succes update for dpcode : ${praid}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteData(req, res, next) {
		let { praid } = req.body;

		try {
			let payload = await orderPra.destroy({
				where: { praid: praid },
			});

			if (!payload) {
				throw new Error(`praid: ${praid} doesn't exists!`);
			}

			baseResponse({
				message: `order pra deleted for praid: ${praid}`,
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async createPrainNumber(req, res, next) {
		try {
			/**
			 * Format PRAIN CODE
			 * prefix[PI/PO] + 'paktrasl' + 'sdcode' + 8digit_number
			 */

			// get data company.
			let resultCompany = await company.findAll({});
			let paktrasl = resultCompany[0].dataValues.paktrasl;
			let sdcode = resultCompany[0].dataValues.sdcode;
			let prefixCode = "PI";

			// get data pra order
			let resultOrderPra = await orderPra.findOne({
				order: [["praid", "DESC"]],
			});

			if (resultOrderPra === null) {
				const resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
				baseResponse({ message: "succes created unix code", data: resultCode })(
					res,
					200
				);
			} else {
				let resultDataOrderPra = resultOrderPra.dataValues.cpiorderno;
				let resultSubstringDataOrderPra = resultDataOrderPra.substring(7, 16);
				let convertInt = parseInt(resultSubstringDataOrderPra) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				const resultCode = `${prefixCode}${paktrasl}${sdcode}${number}`;

				baseResponse({ message: "succes created unix code", data: resultCode })(
					res,
					200
				);
			}
		} catch (error) {
			res.status(500);
			next(error);
		}
	}

	static async detailDataPraIn(req, res, next) {
		let { praInCode } = req.body;

		try {
			let payload = await orderPra.findOne({
				include: [
					{
						model: voyage,
						as: "voyages",
						attributes: ["voyid", "vesid", "voyno"],
					},
					{
						model: orderPraContainer,
						as: "orderPraContainers",
						attributes: [
							"pracrnoid",
							"praid",
							"crno",
							"cccode",
							"ctcode",
							"cclength",
							"ccheight",
							"cpife",
							"cpishold",
							"cpiremark",
							"cpigatedate",
							"cpiflag",
						],
						order: [
							[
								{ model: orderPraContainer, as: "orderPraContainers" },
								"pracrnoid",
								"ASC",
							],
						],
					},
					{
						model: tblusers,
						as: "users",
					},
					{
						model: orderPraFile,
						as: "files",
					},
				],
				where: { cpiorderno: praInCode },
			});

			if (!payload) {
				throw new Error(`pra in order pra: ${praInCode} doesn't exists!`);
			}
			baseResponse({
				message: "detail data pra order by pra in",
				data: payload,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async searchPrainByContainerNumber(req, res, next) {
		let { offset, limit, containerCode } = req.query;

		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas } = await orderPra.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: voyage,
						as: "voyages",
						attributes: ["voyid", "vesid", "voyno"],
					},
					{
						model: orderPraContainer,
						as: "orderPraContainers",
						attributes: [
							"pracrnoid",
							"praid",
							"crno",
							"cccode",
							"ctcode",
							"cclength",
							"ccheight",
							"cpife",
							"cpishold",
							"cpiremark",
							"cpigatedate",
							"cpiflag",
						],
						order: [
							[
								{ model: orderPraContainer, as: "orderPraContainers" },
								"pracrnoid",
								"ASC",
							],
						],
						where: {
							crno: { [Op.like]: `%${containerCode}%` },
						},
					},
					{
						model: tblusers,
						as: "users",
					},
					{
						model: orderPraFile,
						as: "files",
					},
				],
				order: [["praid", "DESC"]],
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

	static async printOrderByPraOrderId(req, res, next) {
		let { offset, limit, praid } = req.query;

		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas } = await orderPra.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: voyage,
						as: "voyages",
						attributes: ["voyid", "vesid", "voyno"],
					},
					{
						model: vessel,
						as: "vessels",
						// attributes: ["voyid", "vesid", "voyno"]
					},
					{
						model: orderPraRecept,
						as: "orderPraRecept",
					},
					{
						model: orderPraContainer,
						as: "orderPraContainers",
						attributes: [
							"pracrnoid",
							"praid",
							"crno",
							"cccode",
							"ctcode",
							"cclength",
							"ccheight",
							"cpife",
							"cpishold",
							"cpiremark",
							"cpigatedate",
							"cpiflag",
							"cpopr",
							"cpcust",
							"biaya_lolo",
							"biaya_clean",
							"cleaning_type",
							"deposit",
						],
						order: [
							[
								{ model: orderPraContainer, as: "orderPraContainers" },
								"pracrnoid",
								"ASC",
							],
						],
					},
					{
						model: tblusers,
						as: "users",
					},
					{
						model: orderPraFile,
						as: "files",
					},
				],
				where: { praid: praid },
				order: [["praid", "DESC"]],
			});
			baseResponse({ message: "list order pra order", data: { datas, count } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = OrderPraController;
