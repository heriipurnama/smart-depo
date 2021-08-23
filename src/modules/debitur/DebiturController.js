"use strict";

const baseResponse = require("../../utils/helper/Response");
const { debitur } = require("../../db/models");


class DebiturController {

	static async createData(req, res, next) {
		let { cucode, cncode, cuname, cuaddr, 
			cuzip, cuphone, cufax, cucontact, 
			cuemail, cunpwp, cuskada, cudebtur,
			cutype, top
		} = req.body;
        
		try {

			const payload = await debitur.create({
				cucode: cucode, 
				cncode: cncode, 
				cuname: cuname, 
				cuaddr: cuaddr, 
				cuzip: cuzip, 
				cuphone: cuphone, 
				cufax: cufax, 
				cucontact: cucontact, 
				cuemail: cuemail, 
				cunpwp: cunpwp,
				cuskada: cuskada, 
				cudebtur: cudebtur,
				cutype: cutype,
				top: top
			});
            
			baseResponse({ message: "succes created debitur", data: payload })(res);
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

			let payload = await debitur.findAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list debitur", data: payload })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { cucode } = req.body;
        
		try {
			let payload = await debitur.findOne(
				{ where: { cucode : cucode }}
			);
			
			if (!payload) {
				throw new Error(`dpcode debitur: ${cucode} doesn't exists!`);
			}
			baseResponse({ message: "detail data debitur cucode", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { cucode, cncode, cuname, cuaddr, 
			cuzip, cuphone, cufax, cucontact, 
			cuemail, cunpwp, cuskada, cudebtur,
			cutype, top
		} = req.body;

        
		try {
 
			let dataUsername = await debitur.findOne({
				where: { cucode: cucode }
			});

			if (!dataUsername) {
				throw new Error(`debitur ${cucode} doesn't exists!`);
			}

			await debitur.update(
				{
					cucode: cucode, 
					cncode: cncode, 
					cuname: cuname, 
					cuaddr: cuaddr, 
					cuzip: cuzip, 
					cuphone: cuphone, 
					cufax: cufax, 
					cucontact: cucontact, 
					cuemail: cuemail, 
					cunpwp: cunpwp,
					cuskada: cuskada, 
					cudebtur: cudebtur,
					cutype: cutype,
					top: top
				},
				{ where: { cucode: cucode } }
			);

			baseResponse({ message: "cucode updated!", data:`debitur succes update for dpcode : ${cucode}` })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { cucode } = req.body;

		try {
			let payload = await debitur.destroy({
				where: { cucode : cucode }
			});

			if (!payload) {
				throw new Error(`cucode: ${cucode} doesn't exists!`);
			}

			baseResponse({ message: `debitur deleted for dpcode: ${cucode}`, data: payload })(res, 200);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
    
}

module.exports = DebiturController;
