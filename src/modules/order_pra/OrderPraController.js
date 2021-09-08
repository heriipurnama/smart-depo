"use strict";

const baseResponse = require("../../utils/helper/Response");
const { orderPra, company, voyage, orderPraContainer } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class OrderPraController {

	static async createData(req, res, next) {
		let { cpiorderno, cpopr, cpcust, cpidish, 
			cpidisdat, liftoffcharge, cpdepo, cpipratgl, 
			cpirefin, cpijam, cpivoyid, cpives,
			cpicargo, cpideliver
		} = req.body;
        
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
				cpideliver: cpideliver
			});
            
			baseResponse({ message: "succes created order Pra", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllData(req, res, next){
		let { offset, limit } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas }  = await orderPra.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: voyage,
						as : "voyages",
						attributes: ["voyid", "vesid", "voyno"]
					},
					{
						model: orderPraContainer,
						as : "orderPraContainers",
						attributes: ["pracrnoid","praid","crno", "cccode", "ctcode","cclength","ccheight","cpife","cpishold","cpiremark","cpigatedate","cpiflag"]
					},

				],
				order:[[ "praid", "DESC"]]
			});
			baseResponse({ message: "list order pra", data:  { datas, count } })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { praid } = req.body;
        
		try {
			let payload = await orderPra.findOne(
				{ where: { praid : praid }}
			);
			
			if (!payload) {
				throw new Error(`praid order pra: ${praid} doesn't exists!`);
			}
			baseResponse({ message: "detail data order pra praid", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { cpiorderno, cpopr, cpcust, cpidish, 
			cpidisdat, liftoffcharge, cpdepo, cpipratgl, 
			cpirefin, cpijam, cpivoyid, cpives,
			cpicargo, cpideliver, praid
		} = req.body;

        
		try {
 
			let dataUsername = await orderPra.findOne({
				where: { praid: praid }
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
					cpideliver: cpideliver
				},
				{ where: { praid: praid } }
			);

			baseResponse({ message: "praid updated!", data:`order pra succes update for dpcode : ${praid}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { praid } = req.body;

		try {
			let payload = await orderPra.destroy({
				where: { praid : praid }
			});

			if (!payload) {
				throw new Error(`praid: ${praid} doesn't exists!`);
			}

			baseResponse({ message: `order pra deleted for praid: ${praid}`, data: payload })(res, 200);
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
			let resultOrderPra = await orderPra.findOne({ order:[[ "praid", "DESC"]]});

			if (resultOrderPra === null) {

				const resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
				baseResponse({ message: "succes created unix code", data: resultCode })(res, 200);
			} else {

				let resultDataOrderPra = resultOrderPra.dataValues.cpiorderno;
				let resultSubstringDataOrderPra = resultDataOrderPra.substring(7,16);
				let convertInt = parseInt(resultSubstringDataOrderPra) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				const resultCode = `${prefixCode}${paktrasl}${sdcode}${number}`;

				baseResponse({ message: "succes created unix code", data: resultCode })(res, 200);

			}
		} catch (error) {
			res.status(500);
			next(error);
		}
	}

	static async detailDataPraIn(req, res, next) {
		let { praInCode } = req.body;
        
		try {
			let payload = await orderPra.findOne(
				{ where: { cpiorderno : praInCode }}
			);
			
			if (!payload) {
				throw new Error(`pra in order pra: ${praInCode} doesn't exists!`);
			}
			baseResponse({ message: "detail data pra order by pra in", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

}

module.exports = OrderPraController;
