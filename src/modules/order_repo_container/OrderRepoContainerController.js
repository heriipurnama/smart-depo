"use strict";

const baseResponse = require("../../utils/helper/Response");
const { orderRepoContainer, container } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class OrderRepoContainerController {

	static async createData(req, res, next) {
		let { repoid, crno, cccode, ctcode, 
			cclength, ccheight, repofe, reposhold, 
			reporemark, newContainer
		} = req.body;
        
		try {
			let dataOrderRepoContainer = {
				repoid: repoid, 
				crno: crno, 
				cccode: cccode, 
				ctcode: ctcode,

				cclength: cclength, 
				ccheight: ccheight, 
				repofe: repofe, 
				reposhold: reposhold, 

				reporemark: reporemark
			};

			let dataNewContainer = {
				crno: crno, 
				cccode: cccode, 
				mtcode: ctcode
			};

			let payloadDataContainer;
			if (newContainer === 1) {
				payloadDataContainer = await container.create(dataNewContainer);
			}
			let payloadDataOrderRepoContainer = await orderRepoContainer.create(dataOrderRepoContainer);
			
			let templateMessage = newContainer === 1 ? 
				"Success Created Data Container And Order Repo Container" :
				"Success Created Data Order Repo Container";
			let templateResponData = newContainer === 1 ? { 
				dataNewcontainer: payloadDataContainer, 
				dataNewOrderRepoContainer: payloadDataOrderRepoContainer } : 
				{ dataNewOrderRepoContainer: payloadDataOrderRepoContainer };
			
			baseResponse({ 
				message: templateMessage, 
				data: templateResponData
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllData(req, res, next){
		let { offset, limit, repoid } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas }  = await orderRepoContainer.findAndCountAll({
				where: { repoid : repoid },
				order: [[ "repocrnoid", "DESC"]],
				limit: limits,
				offset: offsets
			});

			baseResponse({ message: "List Order Repo Container", data:  { datas, count } })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { repocrnoid } = req.query;
        
		try {
			let payload = await orderRepoContainer.findOne(
				{ where: { repocrnoid : repocrnoid }}
			);
			
			if (!payload) {
				throw new Error(`repocrnoid Order Repo Container: ${repocrnoid} doesn't exists!`);
			}
			baseResponse({ message: "Detail Data Order Repo Container", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { repoid, crno, cccode, ctcode, 
			cclength, ccheight, repofe, reposhold, 
			reporemark, repocrnoid
		} = req.body;

		let dataBody = {
			repoid: repoid, 
			crno: crno, 
			cccode: cccode, 
			ctcode: ctcode,

			cclength: cclength, 
			ccheight: ccheight, 
			repofe: repofe, 
			reposhold: reposhold, 

			reporemark: reporemark
		};

		let selectedWhere = { where: { repocrnoid: repocrnoid }};
        
		try {
 
			let dataUsername = await orderRepoContainer.findOne(selectedWhere);

			if (!dataUsername) {
				throw new Error(`Order Pra Container ${repocrnoid} doesn't exists!`);
			}

			await orderRepoContainer.update( dataBody, selectedWhere);

			baseResponse({ message: "repocrnoid Updated!", data:`Order Repo Container Success Update For repocrnoid : ${repocrnoid}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { repocrnoid } = req.body;

		try {
			let payload = await orderRepoContainer.destroy({
				where: { repocrnoid : repocrnoid }
			});

			if (!payload) {
				throw new Error(`repocrnoid: ${repocrnoid} Doesn't Exists!`);
			}

			baseResponse({ message: `Order Repo Container Deleted For repocrnoid: ${repocrnoid}`, data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = OrderRepoContainerController;
