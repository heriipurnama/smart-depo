"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class ContainerProcessController {
	static async createData(req, res, next) {
		let { dpcode, dpname } = req.body;

		try {
			const payload = await container_process.create({
				dpcode: dpcode,
				dpname: dpname,
			});

			baseResponse({
				message: "succes created container_process",
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllData(req, res, next) {
		let { offset, limit } = req.query;

		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas } = await container_process.findAndCountAll({
				offset: offsets,
				limit: limits,
			});
			baseResponse({
				message: "list container_process",
				data: { datas, count },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async detailData(req, res, next) {
		let { dpcode } = req.body;

		try {
			let payload = await container_process.findOne({
				where: { dpcode: dpcode },
			});

			if (!payload) {
				throw new Error(`dpcode container_process: ${dpcode} doesn't exists!`);
			}
			baseResponse({
				message: "detail data container_process dpcode",
				data: payload,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async updateData(req, res, next) {
		let { dpcode, dpname } = req.body;

		try {
			let dataUsername = await container_process.findOne({
				where: { dpcode: dpcode },
			});

			if (!dataUsername) {
				throw new Error(`container_process ${dpcode} doesn't exists!`);
			}

			await container_process.update(
				{
					dpcode: dpcode,
					dpname: dpname,
				},
				{ where: { dpcode: dpcode } }
			);

			baseResponse({
				message: "dpcode updated!",
				data: `container_process succes update for dpcode : ${dpcode}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteData(req, res, next) {
		let { dpcode } = req.body;

		try {
			let payload = await container_process.destroy({
				where: { dpcode: dpcode },
			});

			if (!payload) {
				throw new Error(`dpcode: ${dpcode} doesn't exists!`);
			}

			baseResponse({
				message: `container_process deleted for dpcode: ${dpcode}`,
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async gateIn(req, res, next) {
		let {
			cpdepo,
			spdepo,
			cpitgl,
			cpiefin,
			cpichrgbb,
			cpipaidbb,
			cpieir,
			cpinopol,
			cpidriver,
			cpicargo,
			cpiseal,
			cpiremark,
			cpiremark1,
			cpidpp,
			cpireceptno,
			cpideliver,
			cpitruck,
			cpiorderno,
		} = req.body;

		try {
			let payload = await container_process.update(
				{
					cpdepo: cpdepo,
					spdepo: spdepo,
					cpitgl: cpitgl,
					cpiefin: cpiefin,
					cpichrgbb: cpichrgbb,
					cpipaidbb: cpipaidbb,
					cpieir: cpieir,
					cpinopol: cpinopol,
					cpidriver: cpidriver,
					cpicargo: cpicargo,
					cpiseal: cpiseal,
					cpiremark: cpiremark,
					cpiremark1: cpiremark1,
					cpidpp: cpidpp,
					cpireceptno: cpireceptno,
					cpideliver: cpideliver,
					cpitruck: cpitruck,
					cpijam: new Date().toLocaleTimeString(),
				},
				{ where: { cpiorderno: cpiorderno } }
			);

			baseResponse({
				message: "container process updated!",
				data: `container_process succes update for payload : ${payload}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async printGateIn(req, res, next) {
		try {
			let datas = await container_process.sequelize.query(
				`SELECT pr.PRNAME,DATE_FORMAT(cp.CPITGL,'%d/%m/%Y') as CPITGL,pr.PRCODE,cp.CPIDELIVER,cp.CPIREMARK,cp.CPINOPOL,cp.CPIDRIVER,cp.CPIEIR,cp.CPDEPO,cp.CPIVOY,
                CASE WHEN cp.CPIFE='0' THEN 'EMPTY' ELSE 'FULL' END AS CPIFE,cp.CPITERM,cp.CPIVOYID,cust.CUNAME,
                cp.CPIJAM,cc.CCLENGTH,cc.CCHEIGHT,dep.CUNAME as TRUCK,cc.CTCODE,tves.VESID,tv.VOYID,cust.CUCODE,
                ty.CTDESC,cp.CPIREMARK,cr.RETFROM,
                CASE WHEN LEFT(cp.CPIORDERNO,2)='PI' THEN 'EX IMPORT' WHEN LEFT(cp.CPIORDERNO,2)='RI' THEN 'REPO IN' WHEN LEFT(cp.CPIORDERNO,2)='OF' THEN 'OFF HIRE' END AS CPIORDERNO,
                CASE WHEN cr.RETYPE='11' THEN 'DEPOT to DEPOT' WHEN cr.RETYPE='22' THEN 'PORT to DEPOT' WHEN cr.RETYPE='23' THEN 'INTERCITY to DEPOT' ELSE '' END AS RETYPE
         FROM tblcontainer con 
             LEFT JOIN container_process cp ON con.CRCPID = cp.CPID 
             LEFT JOIN tblprincipal pr ON pr.PRCODE = cp.CPOPR 
             LEFT JOIN tblcontainer_code cc ON cc.CCCODE = con.CCCODE
             LEFT JOIN tbldebitur dep ON dep.CUCODE= cp.CPITRUCK
             LEFT JOIN tblvessel tves ON tves.VESID = cp.CPIVES 
             LEFT JOIN tblvoyage tv ON tves.VESID = tv.VESID 
             LEFT JOIN tbldebitur cust ON cust.CUCODE = pr.CUCODE
             LEFT JOIN tblcontainer_type ty ON ty.CTCODE = cc.CTCODE
             LEFT JOIN order_container_repo cr ON cr.REORDERNO = cp.CPIORDERNO
             WHERE con.CRNO = '".GetParam("CRNO","")."'`
			);

			baseResponse({ message: "List Datas", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async gateOut(req, res, next) {
		try {
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async printEIRIn(req, res, next) {
		try {
			let datas = await container_process.sequelize.query(
				`SELECT cp.CPIEIR,cp.CPOPR,cp.CPIDRIVER,cp.CPINOPOL,
                DATE_FORMAT(cp.CPIPRATGL,'%d/%m/%Y') AS CPIPRATGL,
                cp.CPISEAL,cp.CPIREMARK,cp.CPIDISH,cp.CPIREFIN,con.CRLASTCOND,cp.CPIJAM,
                CASE WHEN cp.CPIFE='0' THEN 'EMPTY' ELSE 'FULL' END AS CPIFE,cp.CPITERM,cp.CPIVOYID,cp.CPODESTI,
                cust.CUNAME,cc.CCLENGTH,cc.CCHEIGHT,dp.DPNAME,cc.CTCODE,tves.VESID,tv.VOYID,cust.CUCODE,cp.CPIDELIVER
         FROM tblcontainer con
         LEFT JOIN container_process cp ON con.CRCPID = cp.CPID
         LEFT JOIN tblprincipal pr ON pr.PRCODE = cp.CPOPR
         LEFT JOIN tbldepo dp ON dp.DPCODE = cp.CPDEPO
         LEFT JOIN tblcontainer_code cc ON cc.CCCODE = con.CCCODE
         LEFT JOIN tblvoyage tv ON tv.VOYID = cp.CPIVOYID
         LEFT JOIN tblvessel tves ON tves.VESID = tv.VESID
         LEFT JOIN tbldebitur cust ON cust.CUCODE = pr.CUCODE
         WHERE con.CRNO = '".GetParam("CRNO","")."'`
			);

			baseResponse({ message: "List Datas", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async printEIROut(req, res, next) {
		try {
			let datas = await container_process.sequelize.query(
				`SELECT cp.CPOEIR,cp.CPOPR1,cp.CPODRIVER,cp.CPONOPOL,
                DATE_FORMAT(cp.CPOPRATGL,'%d/%m/%Y') AS CPOPRATGL,
                cp.CPOSEAL,cp.CPOREMARK,cp.CPOLOAD,cp.CPOREFOUT,con.CRLASTCOND,cp.CPOJAM,
                CASE WHEN cp.CPOFE='0' THEN 'EMPTY' ELSE 'FULL' END AS CPOFE,cp.CPOTERM,cp.CPOVOYID,cp.CPODESTI,
                cust.CUNAME,cc.CCLENGTH,cc.CCHEIGHT,dp.DPNAME,cc.CTCODE,tves.VESID,tv.VOYID,cust.CUCODE,cp.CPORECEIV
         FROM tblcontainer con
         LEFT JOIN container_process cp ON con.CRCPID = cp.CPID
         LEFT JOIN tblprincipal pr ON pr.PRCODE = cp.CPOPR1
         LEFT JOIN tbldepo dp ON dp.DPCODE = cp.CPDEPO
         LEFT JOIN tblcontainer_code cc ON cc.CCCODE = con.CCCODE
         LEFT JOIN tblvoyage tv ON tv.VOYID = cp.CPOVOYID
         LEFT JOIN tblvessel tves ON tves.VESID = tv.VESID
         LEFT JOIN tbldebitur cust ON cust.CUCODE = pr.CUCODE
         WHERE con.CRNO = '".GetParam("CRNO","")."'`
			);

			baseResponse({ message: "List Datas", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = ContainerProcessController;
