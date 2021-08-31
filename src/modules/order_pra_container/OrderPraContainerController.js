"use strict";

const baseResponse = require("../../utils/helper/Response");
const { orderPraContainer } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class OrderPraContainerController {

	static async createData(req, res, next) {
		let { praid, crno, cccode, ctcode, 
			cclength, ccheight, cpife, cpishold, 
			cpiremark
		} = req.body;
        
		try {

			const payload = await orderPraContainer.create({
				praid: praid, 
				crno: crno, 
				cccode: cccode, 
				ctcode: ctcode,

				cclength: cclength, 
				ccheight: ccheight, 
				cpife: cpife, 
				cpishold: cpishold, 

				cpiremark: cpiremark
			});
            
			baseResponse({ message: "succes created order Pra container", data: payload })(res, 200);
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

			let { count, rows: datas }  = await orderPraContainer.findAndCountAll({
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
		let { pracrnoid } = req.body;
        
		try {
			let payload = await orderPraContainer.findOne(
				{ where: { pracrnoid : pracrnoid }}
			);
			
			if (!payload) {
				throw new Error(`pracrnoid order pra container: ${pracrnoid} doesn't exists!`);
			}
			baseResponse({ message: "detail data order pra container", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { praid, crno, cccode, ctcode, 
			cclength, ccheight, cpife, cpishold, 
			cpiremark, pracrnoid
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

			cpiremark: cpiremark
		};

		let selectedWhere = { where: { pracrnoid: pracrnoid }};
        
		try {
 
			let dataUsername = await orderPraContainer.findOne(selectedWhere);

			if (!dataUsername) {
				throw new Error(`order Pra Container ${pracrnoid} doesn't exists!`);
			}

			await orderPraContainer.update( dataBody, selectedWhere);

			baseResponse({ message: "pracrnoid updated!", data:`order pra container succes update for pracrnoid : ${pracrnoid}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { pracrnoid } = req.body;

		try {
			let payload = await orderPraContainer.destroy({
				where: { pracrnoid : pracrnoid }
			});

			if (!payload) {
				throw new Error(`pracrnoid: ${pracrnoid} doesn't exists!`);
			}

			baseResponse({ message: `order pra container deleted for pracrnoid: ${pracrnoid}`, data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = OrderPraContainerController;
