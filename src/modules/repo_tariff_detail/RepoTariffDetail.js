"use strict";

const baseResponse = require("../../utils/helper/Response");
const { repoTariffDetail } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class RepoTariffDetail {

	static async createData(req, res, next) {
		let { 
			prcode, rtno, rtid, rttype,
			rtfrom, rtto, rtlocurr, rtlon20,
			rtlon40, rtlon45, rtlof20, rtlof40,
			rtlof45, rtdoccurr, rtdocm, rtdocv,
			rthaulcurr, rthaulv20, rthaulv40, rthaulv45,
			rtpackcurr, rtpackv20, rtpackv40,
			rtpackv45, rtef } = req.body;
        
		try {

			const payload = await repoTariffDetail.create({
				prcode: prcode,
				rtno: rtno,
				rtid: rtid,
				rttype: rttype,

				rtfrom: rtfrom,
				rtto: rtto,
				rtlocurr: rtlocurr,
				rtlon20: rtlon20,

				rtlon40: rtlon40,
				rtlon45: rtlon45,
				rtlof20: rtlof20,
				rtlof40: rtlof40,

				rtlof45: rtlof45,
				rtdoccurr: rtdoccurr,
				rtdocm: rtdocm,
				rtdocv: rtdocv,

				rthaulcurr: rthaulcurr,
				rthaulv20: rthaulv20,
				rthaulv40: rthaulv40,
				rthaulv45: rthaulv45,

				rtpackcurr: rtpackcurr,
				rtpackv20: rtpackv20,
				rtpackv40: rtpackv40,
				rtpackv45: rtpackv45,
				rtef: rtef
			});
            
			baseResponse({ message: "succes created Repo Tariff Detail", data: payload })(res, 200);
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

			let { count, rows: datas } = await repoTariffDetail.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list Repo Tariff Detail", data: { datas, count } })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { prcode, rttype } = req.body;
        
		try {
			let payload = await repoTariffDetail.findOne(
				{ where: { prcode : prcode,
					rttype : rttype}}
			);
			
			if (!payload) {
				throw new Error(`prcode Repo Tariff Detail: ${prcode} doesn't exists!`);
			}
			baseResponse({ message: "Detail data Repo Tariff Detail prcode", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { 
			prcode, rtno, rtid, rttype,
			rtfrom, rtto, rtlocurr, rtlon20,
			rtlon40, rtlon45, rtlof20, rtlof40,
			rtlof45, rtdoccurr, rtdocm, rtdocv,
			rthaulcurr, rthaulv20, rthaulv40, rthaulv45,
			rtpackcurr, rtpackv20, rtpackv40,
			rtpackv45, rtef } = req.body;
        
		try {
 
			let dataUsername = await repoTariffDetail.findOne({
				where: { prcode: prcode }
			});

			if (!dataUsername) {
				throw new Error(`prcode repo tariff detail ${prcode} doesn't exists!`);
			}

			await repoTariffDetail.update(
				{
					prcode: prcode,
					rtno: rtno,
					rtid: rtid,
					rttype: rttype,

					rtfrom: rtfrom,
					rtto: rtto,
					rtlocurr: rtlocurr,
					rtlon20: rtlon20,

					rtlon40: rtlon40,
					rtlon45: rtlon45,
					rtlof20: rtlof20,
					rtlof40: rtlof40,

					rtlof45: rtlof45,
					rtdoccurr: rtdoccurr,
					rtdocm: rtdocm,
					rtdocv: rtdocv,

					rthaulcurr: rthaulcurr,
					rthaulv20: rthaulv20,
					rthaulv40: rthaulv40,
					rthaulv45: rthaulv45,

					rtpackcurr: rtpackcurr,
					rtpackv20: rtpackv20,
					rtpackv40: rtpackv40,
					rtpackv45: rtpackv45,
					rtef: rtef
				},
				{ where: { prcode: prcode } }
			);

			baseResponse({ message: "prcode updated!", data:`repo tariff detail succes update for prcode : ${prcode}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { prcode } = req.body;

		try {
			let payload = await repoTariffDetail.destroy({
				where: { prcode : prcode }
			});

			if (!payload) {
				throw new Error(`prcode: ${prcode} doesn't exists!`);
			}

			baseResponse({ message: `prcode: ${prcode} deleted succes`, data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = RepoTariffDetail;
