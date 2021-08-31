"use strict";

const baseResponse = require("../../utils/helper/Response");
const { orderPra } = require("../../db/models");
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
    
}

module.exports = OrderPraController;
