"use strict";

const baseResponse = require("../../utils/helper/Response");
const {isorepair, damageTariff, security_process} = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class DamageTariffController {

	static async createData(req, res, next) {
		let { prcode, dmno, dmdate, dmexpdate, dmremarks } = req.body;
        
		try {

			const payload = await damageTariff.create({
				prcode: prcode, 
				dmno: dmno, 
				dmdate: dmdate, 
				dmexpdate: dmexpdate, 
				dmremarks: dmremarks
			});
            
			baseResponse({ message: "damageTariff", data: payload })(res, 200);
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

			let { count, rows: datas }  = await damageTariff.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({ message: "list damageTariff", data: { datas, count }})(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { prcode } = req.body;
        
		try {
			let payload = await damageTariff.findOne(
				{ where: { prcode : prcode }}
			);
			
			if (!payload) {
				throw new Error(`prcode damageTariff: ${prcode} doesn't exists!`);
			}
			baseResponse({ message: "detail data damageTariff prcode", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { prcode, dmno, dmdate, dmexpdate, dmremarks } = req.body;
        
		try {
 
			let dataUsername = await damageTariff.findOne({
				where: { prcode: prcode }
			});

			if (!dataUsername) {
				throw new Error(`damageTariff ${prcode} doesn't exists!`);
			}

			await damageTariff.update(
				{
					prcode: prcode, 
					dmno: dmno, 
					dmdate: dmdate, 
					dmexpdate: dmexpdate, 
					dmremarks: dmremarks
				},
				{ where: { prcode: prcode } }
			);

			baseResponse({ message: "prcode updated!", data:`damageTariff succes update for prcode : ${prcode}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { prcode } = req.body;

		try {
			let payload = await damageTariff.destroy({
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

	static async listIsoRepair(req, res, next) {
		let {limit, offset, search} = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` repair_code LIKE '%${search}%' ` : ` repair_code LIKE '%%' `;

		try {
			let datas = await damageTariff.sequelize.query(
				`SELECT isoid, mtcode, comp_code, comp_description, repair_code, repair_description, material,
						formula, also_applies_to, locations, cccodes, _limit, _start, _hours, _mtrlcost,
					 _inc, _inchours, _incmtrlcost
				 FROM isorepair WHERE ${searchs} ORDER BY isoid DESC LIMIT ${limits} OFFSET ${offsets}
            `,
				{
					type: damageTariff.SELECT
				}
			);

			let TotalDatas = await damageTariff.sequelize.query(
				`SELECT count(*) As Total
                 FROM isorepair `,
				{
					type: damageTariff.SELECT,
				}
			);

			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List iso repair",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async createIsoRepair(req, res, next) {
		let { mtcode, comp_code, comp_description, repair_code, repair_description, material, formula,
			also_applies_to, locations, cccodes, _limit, _start, _hours,
			_mtrlcost, _inc, _inchours, _incmtrlcost } = req.body;

		try {

			const payload = await isorepair.sequelize.query(
				`
				INSERT INTO isorepair(mtcode, comp_code, comp_description, repair_code, repair_description, material,
									  formula, also_applies_to, locations, cccodes, _limit, _start, _hours, _mtrlcost,
					_inc, _inchours, _incmtrlcost) VALUES ('${mtcode}', '${comp_code}', '${comp_description}', '${repair_code}', 
					'${repair_description}', '${material}', '${formula}', '${also_applies_to}', '${locations}', '${cccodes}', 
					'${_limit}', '${_start}', '${_hours}', '${_mtrlcost}', '${_inc}', '${_inchours}', '${_incmtrlcost}');
				`,
				{
					type: isorepair.INSERT
				});

			baseResponse({ message: "Iso Repair created", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async updateIsoRepair(req, res, next) {
		let { isoid, mtcode, comp_code, comp_description, repair_code, repair_description, material, formula,
			also_applies_to, locations, cccodes, _limit, _start, _hours,
			_mtrlcost, _inc, _inchours, _incmtrlcost } = req.body;

		try {

			let payload = await isorepair.sequelize.query(
				`SELECT isoid, mtcode, comp_code, comp_description, repair_code, repair_description, material,
						formula, also_applies_to, locations, cccodes, _limit, _start, _hours, _mtrlcost,
					 _inc, _inchours, _incmtrlcost
				 FROM isorepair WHERE isoid = '${isoid}'
            `,
				{
					type: isorepair.SELECT
				}
			);

			if (payload[0].length === 0 ) {
				throw new Error(`isoid Iso Repair: ${isoid} doesn't exists!`);
			}

			await isorepair.sequelize.query(
				`UPDATE isorepair
					SET mtcode='${mtcode}', comp_code='${comp_code}', comp_description='${comp_description}', repair_code='${repair_code}', 
					repair_description='${repair_description}', material='${material}', formula='${formula}', 
					also_applies_to='${also_applies_to}', locations='${locations}', cccodes='${cccodes}', 
					_limit='${_limit}', _start='${_start}', _hours='${_hours}', _mtrlcost='${_mtrlcost}', 
					_inc='${_inc}', _inchours='${_inchours}', _incmtrlcost='${_incmtrlcost}'  WHERE isoid='${isoid}'`,
				{
					type: isorepair.UPDATE
				});

			baseResponse({ message: "isoid updated!", data:`iso repair succes update for isoid : ${isoid}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteIsoRepair(req, res, next){
		let { isoid } = req.body;

		try {
			let payload = await isorepair.destroy({
				where: { isoid : isoid }
			});

			if (!payload) {
				throw new Error(`isoid: ${isoid} doesn't exists!`);
			}

			baseResponse({ message: `isoid: ${isoid} deleted succes`, data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async detailIsoRepair(req, res, next) {
		let { isoid } = req.query;

		try {
			let payload = await isorepair.sequelize.query(
				`SELECT isoid, mtcode, comp_code, comp_description, repair_code, repair_description, material,
						formula, also_applies_to, locations, cccodes, _limit, _start, _hours, _mtrlcost,
					 _inc, _inchours, _incmtrlcost
				 FROM isorepair WHERE isoid = '${isoid}'
            `,
				{
					type: isorepair.SELECT
				}
			);

			if (payload[0].length === 0 ) {
				throw new Error(`isoid Iso Repair: ${isoid} doesn't exists!`);
			}
			baseResponse({ message: "detail data iso repair isoid", data: payload[0] })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
}

module.exports = DamageTariffController;
