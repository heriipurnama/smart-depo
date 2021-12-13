"use strict";

const baseResponse = require("../../utils/helper/Response");
const { vessel, country } = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class VesselController {

	static async createNew(req, res, next) {
		let { id, opr, country, title } = req.body;
		try {
			const [payload, created] = await vessel.findOrCreate({
				where: {
					vesid: id
				},
				defaults:{
					vesopr: opr,
					cncode: country,
					vestitle: title
				}
			});
			if(created === false){
				throw new Error(`Vessel Exist, ${id} exists!`);
			} else {
				baseResponse({ message:"Vessel Created " , data: payload})(res, 200);
				Logger(req);
			}
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { id, opr, country, title } = req.body;
		let dataUpdate = {
			vesopr: opr,
			cncode: country,
			vestitle: title
		};
		let selector = { 
			where: { vesid: id }
		};
		try {
			let dataVessel = await vessel.update(dataUpdate, selector);

			if (!dataVessel) {
				throw new Error(`Vessel ${id} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataVessel,
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
			let dataVessel = await vessel.findOne({
				where: {
					vesid: id
				}
			});

			if (!dataVessel) {
				throw new Error(`Vessel: ${id} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataVessel,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows, search, orderColumn, orderType} = req.body;
		let oc = (orderColumn == "")?"vesid":orderColumn;
		let ot = (orderType == "")?"DESC":orderType;
		try {
			let { count, rows: datas } = await vessel.findAndCountAll({
				offset: start,
				limit: rows,
				include:[{
					model:country,
					required: false // do not generate INNER JOIN
				}],				
				where: {
					[Op.or]: [
					  { vesid: { [Op.like]: `%${search}%`} },
					  { vestitle :{ [Op.like]: `%${search}%`}},
					  { vesopr :{ [Op.like]: `%${search}%`}}					  
					]
				},
				order: [[oc, ot]]
			});
			baseResponse({ message: "List Vessels", data: { datas, count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {id} = req.body; 
		try {
			let dataVessel = await vessel.destroy({
				where:{vesid: id}
			});
			if (!dataVessel) {
				throw new Error(`vessel: ${id} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Vessel", data: dataVessel })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async cek(req, res, next) {
		try {
			res.status(200);
			return res.json(req.body);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = VesselController;
