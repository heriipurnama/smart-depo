"use strict";

const baseResponse = require("../../utils/helper/Response");
const { voyage, vessel } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class VoyageController {
	static async createNew(req, res, next) {
		let { voyNo} = req.body;
		try {
			const [payload, created] = await voyage.findOrCreate({
				where: {
					voyno: voyNo
				},
				defaults:{
					voyno: req.body.voyno,
					vesid:  req.body.vesid,
					voypoo: req.body.voypoo,
					voypod: req.body.voypod,
					voyeta: req.body.voyeta,
					voyta: req.body.voyta,
					voyetberth: req.body.voyetberth,
					voytberth: req.body.voytberth,
					voyetd: req.body.voyetd,
					voytd: req.body.voytd
				}
			});
			if(created === false){
				throw new Error(`Voyage Exist, ${voyNo} exists!`);
			} else {
				baseResponse({ message:"Voyage Created " , data: payload})(res, 200);
				Logger(req);
			}
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		const { voyid, vesid, voyno, voypoo,
			voypod, voyeta, voyta, voyetberth,
			voytberth, voyetd, voytd } = req.body;

		let dataUpdate = {
			voyid: voyid,
			vesid: vesid,
			voyno: voyno,
			voypoo: voypoo,

			voypod: voypod,
			voyeta: voyeta,
			voyta: voyta,
			voyetberth: voyetberth,
			
			voytberth: voytberth,
			voyetd: voyetd,
			voytd: voytd
		};
		let selector = { 
			where: { voyid: voyid }
		};

		try {
			let dataVoyage = await voyage.update(dataUpdate, selector);
			if (!dataVoyage) {
				throw new Error(`Voyage ${voyid} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataVoyage,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { id } = req.query;
		
		try {
			let dataVoyage = await voyage.findOne({
				where: {
					voyid: id
				}
			});

			if (!dataVoyage) {
				throw new Error(`Voyage: ${id} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataVoyage,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
			let { count, rows: datas } = await voyage.findAndCountAll({
				offset: start,
				limit: rows,
				include:[{
					model:vessel,
					required: false // do not generate INNER JOIN
				}]
			});
			baseResponse({ message: "List Voyages", data: { datas, count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {id} = req.body; 
		try {
			let dataVoyage = await voyage.destroy({
				where:{voyid: id}
			});
			if (!dataVoyage) {
				throw new Error(`Voyage: ${id} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Voyage", data: dataVoyage })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = VoyageController;
