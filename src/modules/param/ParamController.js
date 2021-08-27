"use strict";

const baseResponse = require("../../utils/helper/Response");
const { param } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class ParamController {

	static async createNew(req, res, next) {
		let { paramId, tab, desc, prm} = req.body;
		try {
			const [payload, created] = await param.findOrCreate({
				where: {
					param_id: paramId
				},
				defaults:{
					tabs: tab,
					description: desc,
					param: prm
				}
			});
			if(created === false){
				throw new Error(`Param Exist, Param ID: ${paramId} exists!`);
			} else {
				baseResponse({ message:"Param Created " , data: payload})(res, 200);
				Logger(req);
			}
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { paramId, tab, desc, prm, seqid} = req.body;
		let dataset = {
			param_id: paramId,
			tabs: tab,
			description: desc,
			param: prm
		};
		let selector = { 
			where: { id: seqid }
		};
		try {
			let dataUpdate = await param.update(dataset, selector);

			if (!dataUpdate) {
				throw new Error(`Param ID ${id} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataset,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { seqid } = req.body;
		
		try {
			let dataList = await param.findOne({ 
				attributes: {
					exclude: ["createdAt", "updatedAt"]
				},
				where: {
					id: seqid
				}
			});

			if (!dataList) {
				throw new Error(`Param ID: ${seqid} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataList,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
			let { count, rows: datas } = await param.findAndCountAll({
				offset: start,
				limit: rows
			});
			baseResponse({ message: "List Params", data: { datas, total:rows, count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {seqid} = req.body; 
		try {
			let dataDelete = await param.destroy({
				where:{ id: seqid}
			});
			if (!dataDelete) {
				throw new Error(`Param ID: ${seqid} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Param", data: dataDelete })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = ParamController;
