"use strict";

const baseResponse = require("../../utils/helper/Response");
const { damageTariffDetail } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class DamageTariffDetailController {

	static async createData(req, res, next) {

		let { prcode, dmno, dmid, dycode, cmcode, rmcode, dmlccode1, dmlccode2, dmlccode3, dmlccode4,
			dmcalmtd1, dmcurr, dmdesc, muname, dmeachcrt, dmeachmhr, dmeachmat, dm1stcrt, dm1stmhr, dm1stmat, 
			dmaddcrt, dmaddmhr, dmaddmat, dmran1crt, dmran1mhr, dmran1mat, dmran2crt, dmran2mhr, dmran2mat, dmran3crt,
			dmran3mhr, dmran3mat, dmran4crt, dmran4mhr, dmran4mat, dm20crt, dm20mhr, dm20mat, dm40crt, dm40mhr,
			dm40mat, dmmax, dmnotes
		} = req.body;
		
		let incomingDatas = {
			prcode: prcode,
			dmno: dmno,
			dmid: dmid,
			dycode: dycode,
	
			cmcode: cmcode,
			rmcode: rmcode,
			dmlccode1: dmlccode1,
			dmlccode2: dmlccode2,
	
			dmlccode3: dmlccode3,
			dmlccode4: dmlccode4,
			dmcalmtd1: dmcalmtd1,
			dmcurr: dmcurr,
	
			dmdesc: dmdesc,
			muname: muname,
			dmeachcrt: dmeachcrt,
			dmeachmhr: dmeachmhr,
			
			dmeachmat: dmeachmat,
			dm1stcrt: dm1stcrt,
			dm1stmhr: dm1stmhr,
			dm1stmat: dm1stmat,
	
			dmaddcrt: dmaddcrt,
			dmaddmhr: dmaddmhr,
			dmaddmat: dmaddmat,
			dmran1crt: dmran1crt,
	
			dmran1mhr: dmran1mhr,
			dmran1mat: dmran1mat,
			dmran2crt: dmran2crt,
			dmran2mhr: dmran2mhr,
	
			dmran2mat: dmran2mat,
			dmran3crt: dmran3crt,
			dmran3mhr: dmran3mhr,
			dmran3mat: dmran3mat,
	
			dmran4crt: dmran4crt,
			dmran4mhr: dmran4mhr,
			dmran4mat: dmran4mat,
			dm20crt: dm20crt,

			dm20mhr: dm20mhr,
			dm20mat: dm20mat,
			dm40crt: dm40crt,
			dm40mhr: dm40mhr,
	
			dm40mat: dm40mat,
			dmmax: dmmax,
			dmnotes: dmnotes
		};

		try {

			const payload = await damageTariffDetail.create(incomingDatas);
			baseResponse({ message: "succes created damage tariff detail", data: payload })(res, 200);
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

			let { count, rows: datas }  = await damageTariffDetail.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list damageTariffDetail", data:  { datas, count } })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { prcode } = req.body;
        
		try {
			let payload = await damageTariffDetail.findOne(
				{ where: { prcode : prcode }}
			);
			
			if (!payload) {
				throw new Error(`dpcode damage tariff detail: ${prcode} doesn't exists!`);
			}
			baseResponse({ message: "detail data damage tariff detail prcode", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {

		let { prcode, dmno, dmid, dycode, cmcode, rmcode, dmlccode1, dmlccode2, dmlccode3, dmlccode4,
			dmcalmtd1, dmcurr, dmdesc, muname, dmeachcrt, dmeachmhr, dmeachmat, dm1stcrt, dm1stmhr, dm1stmat, 
			dmaddcrt, dmaddmhr, dmaddmat, dmran1crt, dmran1mhr, dmran1mat, dmran2crt, dmran2mhr, dmran2mat, dmran3crt,
			dmran3mhr, dmran3mat, dmran4crt, dmran4mhr, dmran4mat, dm20crt, dm20mhr, dm20mat, dm40crt, dm40mhr,
			dm40mat, dmmax, dmnotes
		} = req.body;
		
		let incomingDatas = {
			prcode: prcode,
			dmno: dmno,
			dmid: dmid,
			dycode: dycode,
	
			cmcode: cmcode,
			rmcode: rmcode,
			dmlccode1: dmlccode1,
			dmlccode2: dmlccode2,
	
			dmlccode3: dmlccode3,
			dmlccode4: dmlccode4,
			dmcalmtd1: dmcalmtd1,
			dmcurr: dmcurr,
	
			dmdesc: dmdesc,
			muname: muname,
			dmeachcrt: dmeachcrt,
			dmeachmhr: dmeachmhr,
			
			dmeachmat: dmeachmat,
			dm1stcrt: dm1stcrt,
			dm1stmhr: dm1stmhr,
			dm1stmat: dm1stmat,
	
			dmaddcrt: dmaddcrt,
			dmaddmhr: dmaddmhr,
			dmaddmat: dmaddmat,
			dmran1crt: dmran1crt,
	
			dmran1mhr: dmran1mhr,
			dmran1mat: dmran1mat,
			dmran2crt: dmran2crt,
			dmran2mhr: dmran2mhr,
	
			dmran2mat: dmran2mat,
			dmran3crt: dmran3crt,
			dmran3mhr: dmran3mhr,
			dmran3mat: dmran3mat,
	
			dmran4crt: dmran4crt,
			dmran4mhr: dmran4mhr,
			dmran4mat: dmran4mat,
			dm20crt: dm20crt,

			dm20mhr: dm20mhr,
			dm20mat: dm20mat,
			dm40crt: dm40crt,
			dm40mhr: dm40mhr,
	
			dm40mat: dm40mat,
			dmmax: dmmax,
			dmnotes: dmnotes
		};

		let checkDataWithPrcode = {
			where: { prcode: prcode }
		};
        
		try {
 
			let dataUsername = await damageTariffDetail.findOne(checkDataWithPrcode);

			if (!dataUsername) {
				throw new Error(`damage tariff detail ${prcode} doesn't exists!`);
			}

			await damageTariffDetail.update( incomingDatas, checkDataWithPrcode );

			baseResponse({ message: "prcode updated!", data:`damage tariff detail succes update for dpcode : ${prcode}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { prcode } = req.body;

		try {
			let payload = await damageTariffDetail.destroy({
				where: { prcode : prcode }
			});

			if (!payload) {
				throw new Error(`cucode: ${prcode} doesn't exists!`);
			}

			baseResponse({ message: `damage tariff detail deleted for prcode: ${prcode}`, data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = DamageTariffDetailController;
