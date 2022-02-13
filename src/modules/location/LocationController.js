"use strict";

const baseResponse = require("../../utils/helper/Response");
const { location } = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class LocationController {

	static async createNew(req, res, next) {
		let { lcCode, lcDesc} = req.body;

		try {
			const [payload, created] = await location.findOrCreate({
				where: {
					lccode: lcCode
				},
				defaults: {
					lcdesc: lcDesc
				}
			});
			if(created === false){
				throw new Error(`Location Exist, LCCODE: ${lcCode} exists!`);
			} else {
				baseResponse({ message:"Location Created " , data: payload})(res, 200);
				Logger(req);
			}

		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { lcCode, lcDesc} = req.body;
		let dataUpdate = {
			lccode: lcCode,
			lcdesc: lcDesc
		};
		let selector = { 
			where: { lccode: lcCode }
		};
		try {
			let dataLocation = await location.update(dataUpdate, selector);

			if (!dataLocation) {
				throw new Error(`Location Code: ${lcCode} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataUpdate,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { id } = req.body;
		
		try {
			let dataList = await location.findOne({ 
				where: {
					lccode: id
				}
			});

			if (!dataList) {
				throw new Error(`Location LCCODE: ${id} doesn't exists!`);
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
		let {start, rows, search, orderColumn, orderType} = req.body;
		let oc = (orderColumn == "")?"lccode":orderColumn;
		let ot = (orderType == "")?"DESC":orderType;
		try {
			let { count, rows: datas } = await location.findAndCountAll({
				offset: start,
				limit: rows,				
				where: {
					[Op.or]: [
					  { lccode: { [Op.like]: `%${search}%`} },
					  { lcdesc: { [Op.like]: `%${search}%`} }					  
					]
				},
				order: [[oc, ot]]
			});
			baseResponse({ message: "List Location", data: { datas,  count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listMobile(req, res, next) {
		let {start, rows, search, orderColumn, orderType} = req.query;
		let starts = limit == undefined ? "" : ` start ${start}`;
		let rowss = offset == undefined ? "" : ` rows ${rows}`;
		let oc = (orderColumn == "")?"lccode":orderColumn;
		let ot = (orderType == "")?"DESC":orderType;
		try {
			let { count, rows: datas } = await location.findAndCountAll({
				offset: starts,
				limit: rowss,
				where: {
					[Op.or]: [
						{ lccode: { [Op.like]: `%${search}%`} },
						{ lcdesc: { [Op.like]: `%${search}%`} }
					]
				},
				order: [[oc, ot]]
			});
			baseResponse({ message: "List Location", data: { datas,  count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {id} = req.body; 
		try {
			let dataDelete = await location.destroy({
				where:{ lccode: id}
			});
			if (!dataDelete) {
				throw new Error(`Location code: ${id} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Location", data: `LCCODE: ${id}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = LocationController;
