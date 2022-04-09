"use strict";

const baseResponse = require("../../utils/helper/Response");
const { repairMethod, tblwarehouse} = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class RepairMethodController {

	static async createData(req, res, next) {
		let { rmcode, rmdesc, rmclean } = req.body;
        
		try {

			const payload = await repairMethod.create({
				rmcode: rmcode,
				rmdesc: rmdesc,
				rmclean: rmclean
			});
            
			baseResponse({ message: "succes created data repair method", data: payload })(res, 200);
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

			let { count, rows: datas } = await repairMethod.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list data repair method", data: { datas, count }})(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listAllRepair(req, res, next){
		try {

			let { count, rows: datas } = await repairMethod.findAndCountAll({
			});
			baseResponse({ message: "list data repair method", data: { datas, count }})(res, 200);

		} catch (error) {
			res.status(403);
			next(error);
		}
	}
 
	static async listCleaning(req, res, next){
		let { offset, limit } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;
			let clean = 1;


			let { count, rows: datas } = await repairMethod.findAndCountAll({
				where : {rmclean : clean},
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list data repair method", data: { datas, count }})(res, 200);

		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listCleaningMobile(req, res, next){
		try {
			let datas = await tblwarehouse.sequelize.query(`SELECT * FROM tblrepair_method where rmclean = '1'`,
				{
					type: repairMethod.SELECT
				}
			);
			let totalData = datas[0];
			baseResponse({ message: "list data repair method", data: totalData })(res, 200);

		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async detailData(req, res, next) {
		let { rmcode } = req.body;
        
		try {
			let payload = await repairMethod.findOne(
				{ where: { rmcode : rmcode }}
			);
			
			if (!payload) {
				throw new Error(`rmcode Repair Method: ${rmcode} doesn't exists!`);
			}
			baseResponse({ message: "detail data Repair Method rmcode", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { rmcode, rmdesc, rmclean } = req.body;
        
		try {
 
			let dataUsername = await repairMethod.findOne({
				where: { rmcode: rmcode }
			});

			if (!dataUsername) {
				throw new Error(`repairMethod ${rmcode} doesn't exists!`);
			}

			await repairMethod.update(
				{
					rmdesc: rmdesc,
					rmclean: rmclean
				},
				{ where: { rmcode: rmcode } }
			);

			baseResponse({ message: "Repair Method updated!", data:` Repair Method succes update for rmcode : ${rmcode}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { rmcode } = req.body;

		try {
			let payload = await repairMethod.destroy({
				where: { rmcode : rmcode }
			});

			if (!payload) {
				throw new Error(`rmcode: ${rmcode} doesn't exists!`);
			}

			baseResponse({ message: "rmcode deleted", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = RepairMethodController;
