"use strict";

const jwt = require("jsonwebtoken");
const baseResponse = require("../../utils/helper/Response");
const {
	container_process,
	container_survey,
	container,
	orderPraContainer,
	orderRepoContainer,
	security_process,
} = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const logger= require("../../utils/logger");

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
			logger.log({ level: 'error', message: error.stack });
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
			logger.log({ level: 'error', message: error.stack });
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
			logger.log({ level: 'error', message: error.stack });
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
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	static async updateSecurityIn(req, res, next) {
		let { cpid } = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;
		let userId = datas.id;
		let datetime = new Date();

		try {
			let dataUsername = await container_process.findOne({
				where: { cpid: cpid },
			});

			if (!dataUsername) {
				throw new Error(`container_process ${cpid} doesn't exists!`);
			}

			await container_process.update(
				{
					securityinid: userId,
					securityinname: usernameByToken,
					securityindatetime: datetime,
				},
				{ where: { cpid: cpid } }
			);

			await security_process.sequelize.query(
				`
				INSERT INTO security_process(cpid, securitytype, securityinid, securityname, securitydatetime) VALUES ('${cpid}','1', '${userId}','${usernameByToken}',now());
				`,
				{
					type: security_process.INSERT
				});

			baseResponse({
				message: "security updated!",
				data: `container_process succes update for cpid : ${cpid}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	static async updateSecurityOut(req, res, next) {
		let { cpid } = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;
		let userId = datas.id;
		let datetime = new Date();

		try {
			let dataUsername = await container_process.findOne({
				where: { cpid: cpid },
			});

			if (!dataUsername) {
				throw new Error(`container_process ${cpid} doesn't exists!`);
			}

			await container_process.update(
				{
					securityoutid: userId,
					securityoutname: usernameByToken,
					securityoutdatetime: datetime,
				},
				{ where: { cpid: cpid } }
			);

			await security_process.sequelize.query(
				`
				INSERT INTO security_process(cpid, securitytype, securityinid, securityname, securitydatetime) VALUES ('${cpid}','2', '${userId}','${usernameByToken}',now());
				`,
				{
					type: security_process.INSERT
				});

			baseResponse({
				message: "security updated!",
				data: `container_process succes update for cpid : ${cpid}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
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
			logger.log({ level: 'error', message: error.stack });
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
			crno,
		} = req.body;

		try {
			var genNumber = 1;
			let MyResult = await container_process.sequelize.query(
				`SELECT CPIEIR FROM container_process WHERE crno = '${crno}' and cpiorderno= '${cpiorderno}' limit 1`,
				{
					type: container_process.SELECT,
					plain: true,
				}
			);
			logger.log({ level: 'info', message: `MyResult ${MyResult["CPIEIR"]}` });
			if (MyResult["CPIEIR"] === null) {
				let rests = await container_process.sequelize.query(
					`SELECT max(CPIEIR)+1 as CPIEIR FROM container_process`,
					{
						type: container_process.SELECT,
						plain: true,
					}
				);
				genNumber = rests["CPIEIR"];
				logger.log({ level: 'info', message: `sama dengan ${genNumber}` });
			}else {
				genNumber = MyResult["CPIEIR"];
				logger.log({ level: 'info', message: `bukan sama dengan ${genNumber}` });
			}

			let payload = await container_process.update(
				{
					cpdepo: cpdepo,
					spdepo: spdepo,
					cpitgl: cpitgl,
					cpiefin: cpiefin,
					cpichrgbb: cpichrgbb,
					cpipaidbb: cpipaidbb,
					cpieir: parseInt(genNumber),
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
					crno: crno,
					crlastact: "WE",
					cpijam: new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
				},
				{
					where: {
						[Op.and]: [{ cpiorderno: cpiorderno }, { crno: crno }],
					},
				}
			);

			const payloades = await container.update(
				{ crlastact: "WE" },
				{ where: { crno: crno } }
			);

			const payloadeswe = await orderPraContainer.update(
				{ cpigatedate: new Date() },
				{ where: { crno: crno } }
			);

			//--- order_repo_container
			const payloadrepo = await orderRepoContainer.update(
				{ repogatedate: new Date() },
				{ where: { crno: crno } }
			);

			baseResponse({
				message: "container process updated!",
				data: `container_process succes update for payload : ${payload}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
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
			logger.log({ level: 'error', message: error.stack });
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
			logger.log({ level: 'error', message: error.stack });
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
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}
	// get
	static async getDataGateIN(req, res, next) {
		const {
			cpife1,
			cpife2,
			retype1,
			retype2,
			retype3,
			crlastact1,
			crlastact2,
			crno,
		} = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select b.crno,a.cpitgl,a.cpdepo,a.spdepo,k.prcode,i.cucode,d.cccode,
				a.cpopr,a.cpitruck,a.cpcust,a.cpireceptno,
		  d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
		  b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
		  b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
		  b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
		  a.cpiorderno,a.cpieir,a.cpirefin,a.cpipratgl,a.cpichrgbb,a.cpipaidbb,
		  a.cpiterm,a.cpidish,a.cpidisdat,a.cpijam,a.cpicargo,a.cpiseal,
		  a.cpivoy,a.cpivoyid,a.cpideliver,a.cpidpp,a.cpidriver,a.cpinopol,a.cpiremark,a.cpiremark1,
		  m.vesid,m.vesopr,n.voyno,r.retfrom,a.cpid,
		  r.readdr,h.cncode,h.poport, sv.rmcode,
		  (case when a.cpife='${cpife1}' then 'full' when a.cpife='${cpife2}' or a.cpife is null then 'empty' else '' end) cpife, 
		  (case when r.retype='${retype1}' then 'depot to depot' when r.retype='${retype2}' then 'port to depot' 
		  	when r.retype='${retype3}' then 'intercity to depot' else '' end )  retype
	 from tblcontainer b 
		  inner join container_process a on b.crcpid=a.cpid 
		  inner join tblcontainer_code d on d.cccode=b.cccode
		  left join tblprincipal k on k.prcode=a.cpopr 
		  left join tbldebitur i on i.cucode= a.cpitruck
		  left join tbldepo f on f.dpcode=a.dpcode 
		  left join tblsubdepo g on g.sdcode=a.sdcode 
		  left join tblmaterial e on e.mtcode=b.mtcode
		  left join tblcontainer_leasing j on j.leorderno=a.cpiorderno
		  left join tblvessel m on m.vesid = a.cpives
		  left join tblport h on h.poid = a.cpidish
		  left join tblvoyage n on n.voyid = a.cpivoy
		  left join order_container_repo r on r.reorderno = a.cpiorderno
		  left join container_survey sv on sv.cpid = b.crcpid
	 where  b.crlastact in('${crlastact1}','${crlastact2}')   
	 and  b.crno = '${crno}'`
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	static async getAllDataGateIN(req, res, next) {
		let { limit, offset, search } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` and b.crno LIKE '%${search}%' ` : ` and b.crno LIKE '%%' `;

		const {
			cpife1,
			cpife2,
			retype1,
			retype2,
			retype3,
			crlastact1,
			crlastact2,
		} = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select b.crno,a.cpitgl,a.cpdepo,a.spdepo,k.prcode,i.cucode,d.cccode,
				a.cpopr,a.cpitruck,a.cpcust,a.cpireceptno,
		  d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
		  b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
		  b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
		  b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
		  a.cpiorderno,a.cpieir,a.cpirefin,a.cpipratgl,a.cpichrgbb,a.cpipaidbb,
		  a.cpiterm,a.cpidish,a.cpidisdat,a.cpijam,a.cpicargo,a.cpiseal,
		  a.cpivoy,a.cpideliver,a.cpidpp,a.cpidriver,a.cpinopol,a.cpiremark,a.cpiremark1,
		  m.vesid,m.vesopr,n.voyno,r.retfrom,
		  r.readdr,h.cncode,h.poport,
		  (case when a.cpife='${cpife1}' then 'full' when a.cpife='${cpife2}' or a.cpife is null then 'empty' else '' end) cpife, 
		  (case when r.retype='${retype1}' then 'depot to depot' when r.retype='${retype2}' then 'port to depot' 
		  	when r.retype='${retype3}' then 'intercity to depot' else '' end )  retype
	 from tblcontainer b 
		  inner join container_process a on b.crcpid=a.cpid 
		  inner join tblcontainer_code d on d.cccode=b.cccode
		  left join tblprincipal k on k.prcode=a.cpopr 
		  left join tbldebitur i on i.cucode= a.cpitruck
		  left join tbldepo f on f.dpcode=a.dpcode 
		  left join tblsubdepo g on g.sdcode=a.sdcode 
		  left join tblmaterial e on e.mtcode=b.mtcode
		  left join tblcontainer_leasing j on j.leorderno=a.cpiorderno
		  left join tblvessel m on m.vesid = a.cpives
		  left join tblport h on h.poid = a.cpidish
		  left join tblvoyage n on n.voyid = a.cpivoy
		  left join order_container_repo r on r.reorderno = a.cpiorderno
	 where  b.crlastact in('${crlastact1}','${crlastact2}') ${searchs} ORDER BY a.cpieir desc
	 LIMIT ${limits} OFFSET ${offsets}`
			);

			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
				FROM  tblcontainer b 
				inner join container_process a on b.crcpid=a.cpid 
				inner join tblcontainer_code d on d.cccode=b.cccode
				left join tblprincipal k on k.prcode=a.cpopr 
				left join tbldebitur i on i.cucode= a.cpitruck
				left join tbldepo f on f.dpcode=a.dpcode 
				left join tblsubdepo g on g.sdcode=a.sdcode 
				left join tblmaterial e on e.mtcode=b.mtcode
				left join tblcontainer_leasing j on j.leorderno=a.cpiorderno
				left join tblvessel m on m.vesid = a.cpives
				left join tblport h on h.poid = a.cpidish
				left join tblvoyage n on n.voyid = a.cpivoy
				left join order_container_repo r on r.reorderno = a.cpiorderno
		   where  b.crlastact in('${crlastact1}','${crlastact2}')`,
				{
					type: container_process.SELECT,
				}
			);
			const allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List Datas",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}
	//print kitir IN
	static async getByCpiorderno(req, res, next) {
		const { cpiorderno, crno } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select b.crno,a.cpitgl,a.cpdepo,a.spdepo,k.prcode,i.cucode,d.cccode,
				a.cpopr,a.cpitruck,a.cpcust,opr.cpireceptno cpireceptno,a.cpid,
		  d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
		  b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
		  b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
		  b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
		  a.cpiorderno,a.cpieir,a.cpirefin,a.cpipratgl,a.cpichrgbb,a.cpipaidbb,
		  a.cpiterm,a.cpidish,a.cpidisdat,a.cpijam,a.cpicargo,a.cpiseal,
		  a.cpivoy,a.cpivoyid, a.cpideliver,a.cpidpp,a.cpidriver,a.cpinopol,a.cpiremark,a.cpiremark1,
		  m.vesid,m.vesopr,n.voyno,r.retfrom,
		  r.readdr,h.cncode,h.poport,
		  (case when a.cpife='1' then 'full' when a.cpife='0' or a.cpife is null then 'empty' else '' end) cpife,
		  (case when r.retype='21' then 'depot to depot' when r.retype='22' then 'port to depot'
		  	when r.retype='23' then 'intercity to depot' else '' end )  retype
	 from tblcontainer b
		  inner join container_process a on b.crcpid=a.cpid
		  inner join tblcontainer_code d on d.cccode=b.cccode
		  left join tblprincipal k on k.prcode=a.cpopr
		  left join tbldebitur i on i.cucode= a.cpitruck
		  left join tbldepo f on f.dpcode=a.dpcode
		  left join tblsubdepo g on g.sdcode=a.sdcode
		  left join tblmaterial e on e.mtcode=b.mtcode
		  left join tblcontainer_leasing j on j.leorderno=a.cpiorderno
		  left join tblvessel m on m.vesid = a.cpives
		  left join tblport h on h.poid = a.cpidish
		  left join tblvoyage n on n.voyid = a.cpivoy
		  left join order_container_repo r on r.reorderno = a.cpiorderno
		  left join order_pra op on  op.cpiorderno = a.cpiorderno
		  left join order_pra_recept opr on op.praid = opr.praid
		where  a.cpiorderno  like '%${cpiorderno}%' and opr.cpireceptno not like '-'
	 and  b.crno = '${crno}'`
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	//print kitir OUT
	static async getByCpiordernoOut(req, res, next) {
		const { cpoorderno, crno } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select b.crno, a.cpid,
						a.cpcust1, a.cpopr1, a.cpochrgbm, a.cpopaidbm, a.cpocurr, a.cporate,
						a.cpovbm, a.cpolonopr, a.cpoorderno, a.cpoprano,  a.cpopratgl,
						a.cpotgl, a.cpojam, a.cpostatus, a.cporeceiv, a.cpoload, a.cpoloaddat,
						a.cpoloadjam, a.cpoterm, a.cpofe, a.cpocargo, a.cpoprin, a.cpodpp, a.cpodppinout,
						a.cposeal, a.cpoves, a.cpotruck, a.cponopol, a.cporemark, a.cpoflgprt, a.cpoeir,
						a.cporefout, a.cpovoyid, a.cpodesti,
						a.cponotes, a.svsurdat, a.syid, a.gtcond,
						k.prcode,i.cucode,d.cccode,
						opr.cpireceptno cporeceptno,d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
						b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
						b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
						b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
						m.vesid,m.vesopr,n.voyno,r.retfrom,
						r.readdr,h.cncode,h.poport,
						(case when a.cpofe='1' then 'full' when a.cpofe='0' or a.cpofe is null then 'empty' else '' end) cpofe,
						(case when r.retype='11' then 'depot to depot' when r.retype='12' then 'depot to port '
							  when r.retype='13' then 'depot to intercity' else '' end )  retype
				 from tblcontainer b
						  inner join container_process a on b.crcpid=a.cpid
						  inner join tblcontainer_code d on d.cccode=b.cccode
						  left join tblprincipal k on k.prcode=a.cpopr
						  left join tbldebitur i on i.cucode= a.cpitruck
						  left join tbldepo f on f.dpcode=a.dpcode
						  left join tblsubdepo g on g.sdcode=a.sdcode
						  left join tblmaterial e on e.mtcode=b.mtcode
						  left join tblcontainer_leasing j on j.leorderno=a.cpiorderno
						  left join tblvessel m on m.vesid = a.cpives
						  left join tblport h on h.poid = a.cpidish
						  left join tblvoyage n on n.voyid = a.cpivoy
						  left join order_container_repo r on r.reorderno = a.cpiorderno
						  left join order_pra op on  op.cpiorderno = a.cpiorderno
						  left join order_pra_recept opr on op.praid = opr.praid
				 where  a.cpoorderno  like '%${cpoorderno}%' and opr.cpireceptno not like '-'
				   and  b.crno = '${crno}'`
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	//Repo Out dan GateOut
	static async getKitirRepoGateOut(req, res, next) {
		const { cpoorderno, crno } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select a.cpid, a.crno,
						a.cpcust1, a.cpopr1, a.cpochrgbm, a.cpopaidbm, a.cpocurr, a.cporate,
						a.cpovbm, a.cpolonopr, a.cpoorderno, a.cpoprano,  a.cpopratgl,
						a.cpotgl, a.cpojam, a.cpostatus, a.cporeceiv, a.cpoload, a.cpoloaddat,
						a.cpoloadjam, a.cpoterm, a.cpofe, a.cpocargo, a.cpoprin, a.cpodpp, a.cpodppinout,
						a.cposeal, a.cpoves, a.cpotruck, a.cponopol,a.cpodriver,  a.cporemark, a.cpoflgprt, a.cpoeir,
						a.cporefout, a.cpovoyid, a.cpodesti,
						a.cponotes, a.svsurdat, a.syid, a.gtcond,
						d.cccode,
						a.cporeceptno,d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
						b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
						b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
						b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
						m.vesid,m.vesopr,n.voyno
				 from tblcontainer b
						  inner join container_process a on b.crcpid=a.cpid
						  inner join tblcontainer_code d on d.cccode=b.cccode
						  left join tblmaterial e on e.mtcode=b.mtcode
						  left join tblvessel m on m.vesid = a.cpives
						  left join tblvoyage n on n.voyid = a.cpivoy
				 where  a.cpoorderno  like '%${cpoorderno}%'
				   and  b.crno = '${crno}'`
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	//PraOut
	static async getKitirPraOut(req, res, next) {
		const { cpoorderno, crno } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select a.cpid, a.crno,  a.cpovoy,
						a.cpcust1, a.cpopr1, a.cpochrgbm, a.cpopaidbm, a.cpocurr, a.cporate,
						a.cpovbm, a.cpolonopr, a.cpoorderno, a.cpoprano,  a.cpopratgl,
						a.cpotgl, a.cpojam, a.cpostatus, a.cporeceiv, a.cpoload, a.cpoloaddat,
						a.cpoloadjam, a.cpoterm, a.cpofe, a.cpocargo, a.cpoprin, a.cpodpp, a.cpodppinout,
						a.cposeal, a.cpoves, a.cpotruck, a.cponopol,a.cpodriver,  a.cporemark, a.cpoflgprt, a.cpoeir,
						a.cporefout, a.cpovoyid, a.cpodesti,
						a.cponotes, a.svsurdat, a.syid, a.gtcond,
						d.cccode,
						opr.cpireceptno cporeceptno,d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
						b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
						b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
						b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
						m.vesid,m.vesopr,n.voyno
				 from tblcontainer b
						  inner join container_process a on b.crcpid=a.cpid
						  inner join tblcontainer_code d on d.cccode=b.cccode
						  left join tblmaterial e on e.mtcode=b.mtcode
						  left join tblvessel m on m.vesid = a.cpives
						  left join tblvoyage n on n.voyid = a.cpivoy
						  left join order_pra op on  op.cpiorderno = a.cpiorderno
						  left join order_pra_recept opr on op.praid = opr.praid
				 where  a.cpoorderno  like '%${cpoorderno}%' 
				   and  b.crno = '${crno}'`
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	//PraOut by CPID
	static async getKitirPraOutByCpid(req, res, next) {
		const {cpid } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select a.cpid, a.crno,
						a.cpcust1, a.cpopr1, a.cpochrgbm, a.cpopaidbm, a.cpocurr, a.cporate,
						a.cpovbm, a.cpolonopr, a.cpoorderno, a.cpoprano,  a.cpopratgl,
						a.cpotgl, a.cpojam, a.cpostatus, a.cporeceiv, a.cpoload, a.cpoloaddat,
						a.cpoloadjam, a.cpoterm, a.cpofe, a.cpocargo, a.cpoprin, a.cpodpp, a.cpodppinout,
						a.cposeal, a.cpoves, a.cpotruck, a.cponopol,a.cpodriver,  a.cporemark, a.cpoflgprt, a.cpoeir,
						a.cporefout, a.cpovoyid, a.cpodesti,
						a.cponotes, a.svsurdat, a.syid, a.gtcond,
						d.cccode,
						opr.cpireceptno cporeceptno,d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
						b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
						b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
						b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
						m.vesid,m.vesopr,n.voyno
				 from tblcontainer b
						  inner join container_process a on b.crcpid=a.cpid
						  inner join tblcontainer_code d on d.cccode=b.cccode
						  left join tblmaterial e on e.mtcode=b.mtcode
						  left join tblvessel m on m.vesid = a.cpives
						  left join tblvoyage n on n.voyid = a.cpivoy
						  left join order_pra op on  op.cpiorderno = a.cpiorderno
						  left join order_pra_recept opr on op.praid = opr.praid
				 where  a.cpid = '${cpid}' and opr.cpireceptno not like '-'`
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	//GateOut and RepoOut by Cpid
	static async getKitirRepoGateOutByCpid(req, res, next) {
		const { cpoorderno, cpid } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select a.cpid, a.crno,
						a.cpcust1, a.cpopr1, a.cpochrgbm, a.cpopaidbm, a.cpocurr, a.cporate,
						a.cpovbm, a.cpolonopr, a.cpoorderno, a.cpoprano,  a.cpopratgl,
						a.cpotgl, a.cpojam, a.cpostatus, a.cporeceiv, a.cpoload, a.cpoloaddat,
						a.cpoloadjam, a.cpoterm, a.cpofe, a.cpocargo, a.cpoprin, a.cpodpp, a.cpodppinout,
						a.cposeal, a.cpoves, a.cpotruck, a.cponopol,a.cpodriver,  a.cporemark, a.cpoflgprt, a.cpoeir,
						a.cporefout, a.cpovoyid, a.cpodesti,
						a.cponotes, a.svsurdat, a.syid, a.gtcond,
						d.cccode,
						a.cporeceptno,d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
						b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
						b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
						b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
						m.vesid,m.vesopr,n.voyno
				 from tblcontainer b
						  inner join container_process a on b.crcpid=a.cpid
						  inner join tblcontainer_code d on d.cccode=b.cccode
						  left join tblmaterial e on e.mtcode=b.mtcode
						  left join tblvessel m on m.vesid = a.cpives
						  left join tblvoyage n on n.voyid = a.cpivoy
				 where  a.cpoorderno  like '%${cpoorderno}%'
				   and  a.cpid = '${cpid}'`
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	//print kitir REPOIN
	static async getKitirPepoIn(req, res, next) {
		const { cpiorderno, crno } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select b.crno,a.cpitgl,a.cpdepo,a.spdepo,k.prcode,i.cucode,d.cccode,
				a.cpopr,a.cpitruck,a.cpcust, cpireceptno,a.cpid,
		  d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
		  b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
		  b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
		  b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
		  a.cpiorderno,a.cpieir,a.cpirefin,a.cpipratgl,a.cpichrgbb,a.cpipaidbb,
		  a.cpiterm,a.cpidish,a.cpidisdat,a.cpijam,a.cpicargo,a.cpiseal,
		  a.cpivoy,a.cpideliver,a.cpidpp,a.cpidriver,a.cpinopol,a.cpiremark,a.cpiremark1,
		  m.vesid,m.vesopr,n.voyno,r.retfrom, r.repovendor,
		  r.readdr,h.cncode,h.poport,
		  (case when a.cpife='1' then 'full' when a.cpife='0' or a.cpife is null then 'empty' else '' end) cpife,
		  (case when r.retype='21' then 'depot to depot' when r.retype='22' then 'port to depot'
		  	when r.retype='23' then 'intercity to depot' else '' end )  retype
	 from tblcontainer b
		  inner join container_process a on b.crcpid=a.cpid
		  inner join tblcontainer_code d on d.cccode=b.cccode
		  left join tblprincipal k on k.prcode=a.cpopr
		  left join tbldebitur i on i.cucode= a.cpitruck
		  left join tbldepo f on f.dpcode=a.dpcode
		  left join tblsubdepo g on g.sdcode=a.sdcode
		  left join tblmaterial e on e.mtcode=b.mtcode
		  left join tblcontainer_leasing j on j.leorderno=a.cpiorderno
		  left join tblvessel m on m.vesid = a.cpives
		  left join tblport h on h.poid = a.cpidish
		  left join tblvoyage n on n.voyid = a.cpivoy
		  left join order_container_repo r on r.reorderno = a.cpiorderno
		where  a.cpiorderno  like '%${cpiorderno}%' and  b.crno = '${crno}'`
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	//untuk scand barcode security mobile In
	static async getByCpiId(req, res, next) {
		const { crcpid } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select b.crno,a.cpitgl,a.cpdepo,a.spdepo,k.prcode,i.cucode,d.cccode,
				a.cpopr,a.cpitruck,a.cpcust,a.cpireceptno,a.cpid,
		  d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
		  b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
		  b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
		  b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
		  a.cpiorderno,a.cpieir,a.cpirefin,a.cpipratgl,a.cpichrgbb,a.cpipaidbb,
		  a.cpiterm,a.cpidish,a.cpidisdat,a.cpijam,a.cpicargo,a.cpiseal,
		  a.cpivoy,a.cpideliver,a.cpidpp,a.cpidriver,a.cpinopol,a.cpiremark,a.cpiremark1,
		  m.vesid,m.vesopr,n.voyno,r.retfrom,
		  r.readdr,h.cncode,h.poport,
		  (case when a.cpife='1' then 'full' when a.cpife='0' or a.cpife is null then 'empty' else '' end) cpife,
		  (case when r.retype='21' then 'depot to depot' when r.retype='22' then 'port to depot'
		  	when r.retype='23' then 'intercity to depot' else '' end )  retype
	 from tblcontainer b
		  inner join container_process a on b.crcpid=a.cpid
		  inner join tblcontainer_code d on d.cccode=b.cccode
		  left join tblprincipal k on k.prcode=a.cpopr
		  left join tbldebitur i on i.cucode= a.cpitruck
		  left join tbldepo f on f.dpcode=a.dpcode
		  left join tblsubdepo g on g.sdcode=a.sdcode
		  left join tblmaterial e on e.mtcode=b.mtcode
		  left join tblcontainer_leasing j on j.leorderno=a.cpiorderno
		  left join tblvessel m on m.vesid = a.cpives
		  left join tblport h on h.poid = a.cpidish
		  left join tblvoyage n on n.voyid = a.cpivoy
		  left join order_container_repo r on r.reorderno = a.cpiorderno
	 where  b.crcpid  = '${crcpid}' `
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}
	//untuk scand barcode security mobile/web OUT
	static async getByCpiIdOut(req, res, next) {
		const { crcpid } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select cp.cpid, con.crno,dp.dpname,cp.cpotgl,sub.sdname,pr.prcode,deb.cucode,deb.cuname,con.cccode,
						cp.cpopr,cp.cpopr1,cp.cpcust,cp.cpcust1,cp.cpotruck,
						cp.cporeceptno,cp.svsurdat,
						cp.syid,concode.ctcode,concode.cclength,concode.ccheight,con.crcdp,con.cracep,con.crcsc,
						con.crweightk,con.crweightl,con.crtarak,con.crtaral,con.crnetk,
						con.crnetl,con.crvol,con.crmanuf,con.crmandat,con.crpos,con.crbay,svey.svcond,
						con.crrow,con.crtier,con.crlastcond,con.crlastconde,con.crlastact,mtrl.mtdesc,
						cp.cpoorderno,cp.cpoeir,cp.cporefout,cp.cpopratgl,cp.cpochrgbm,cp.cpopaidbm,
						(case when cp.cpofe='1' then 'full' when cp.cpofe='0' or cp.cpofe is null then 'empty' else '' end ) as cpofe,
						(case when repo.retype='11' then 'depot to depot' when repo.retype='12' then 'depot to port' when repo.retype='13' then 'depot to intercity' else '' end ) as retype,
						cp.cpoterm,cp.cpoload,cp.cpoloaddat,cp.cpojam,cp.cpocargo,voy.vesid,
						cp.cposeal,cp.cpovoy,cp.cpoves,cp.cporeceiv,cp.cpodpp,ves.vesopr,
						cp.cpodriver,cp.cponopol,cp.cporemark,repo.retfrom,usr.username syname,
						prt.cncode,prt.poport
				 from tblcontainer con
						  inner join container_process cp on con.crno = cp.crno
						  inner join tblcontainer_code concode on concode.cccode = con.cccode
						  left join tblmaterial mtrl on mtrl.mtcode = con.mtcode
						  left join tbldepo dp on dp.dpcode = cp.cpdepo
						  left join tblsubdepo sub on sub.sdcode = cp.spdepo
						  left join tbldebitur deb on deb.cucode = cp.cpotruck
						  left join tblprincipal pr on pr.prcode = cp.cpopr1
						  left join tblvessel ves on ves.vesid = cp.cpoves
						  left join tblvoyage voy on voy.vesid = ves.vesid
						  left join tblport prt on prt.poid = cp.cpoload
						  left join container_survey svey on svey.cpid = cp.cpid
						  left join tblusers usr on usr.user_id = svey.syid
						  left join order_container_repo repo on repo.reorderno = cp.cpoorderno
				 WHERE cp.cpid= '${crcpid}' `
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	static async getBarcodeGateIn(req, res, next) {
		const { crcpid } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select b.crno,a.cpitgl,a.cpdepo,a.spdepo,k.prcode,i.cucode,d.cccode, a.cpidpp,
						a.cpopr,a.cpitruck,a.cpcust,a.cpireceptno,a.cpid,
						d.ctcode,d.cclength,d.ccheight,b.crcdp,b.cracep,b.crcsc,
						b.crmmyy,b.crweightk,b.crweightl,b.crtarak,b.crtaral,b.crnetk,
						b.crnetl,b.crvol,b.crmanuf,b.crmandat,b.crpos,b.crbay,
						b.crrow,b.crtier,b.crlastcond,b.crlastconde,b.crlastact,e.mtdesc,
						a.cpiorderno,a.cpieir,a.cpirefin,a.cpipratgl,a.cpichrgbb,a.cpipaidbb,
						a.cpiterm,a.cpidish,a.cpidisdat,a.cpijam,a.cpicargo,a.cpiseal,
						a.cpivoy,a.cpideliver,a.cpidpp,a.cpidriver,a.cpinopol,a.cpiremark,a.cpiremark1,
						m.vesid,m.vesopr,n.voyno,r.retfrom,
						r.readdr,h.cncode,h.poport, sv.rmcode,
						(case when a.cpife='1' then 'full' when a.cpife='0' or a.cpife is null then 'empty' else '' end) cpife,
						(case when r.retype='21' then 'depot to depot' when r.retype='22' then 'port to depot'
							  when r.retype='23' then 'intercity to depot' else '' end )  retype
				 from tblcontainer b
						  inner join container_process a on b.crcpid=a.cpid
						  inner join tblcontainer_code d on d.cccode=b.cccode
						  left join tblprincipal k on k.prcode=a.cpopr
						  left join tbldebitur i on i.cucode= a.cpitruck
						  left join tbldepo f on f.dpcode=a.dpcode
						  left join tblsubdepo g on g.sdcode=a.sdcode
						  left join tblmaterial e on e.mtcode=b.mtcode
						  left join tblcontainer_leasing j on j.leorderno=a.cpiorderno
						  left join tblvessel m on m.vesid = a.cpives
						  left join tblport h on h.poid = a.cpidish
						  left join tblvoyage n on n.voyid = a.cpivoy
						  left join order_container_repo r on r.reorderno = a.cpiorderno
						  left join container_survey sv on sv.cpid = b.crcpid
				 where  b.crcpid  = '${crcpid}' and b.crlastact = 'BI' and a.securityinid <> 0`
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	static async getBarcodeSurvey(req, res, next) {
		const { crcpid } = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select tblcontainer.crno, container_process.cpireceptno,container_survey.svcrno,container_survey.svnotes,tblcontainer_code.cccode,tblcontainer_code.ctcode,tblcontainer_code.cclength,tblcontainer_code.ccheight,tblcontainer.mtcode as mtcode1,
						tblcontainer.crcdp,tblcontainer.cracep,tblcontainer.crcsc,container_process.cpitgl,tblcontainer.crweightk,tblcontainer.crweightl,tblcontainer.crtarak,tblcontainer.crtaral,
						tblcontainer.crnetk,tblcontainer.crnetl,tblcontainer.crvol,tblmaterial.mtdesc,tblcontainer.crmanuf,tblcontainer.crpos,
						date_format(container_survey.svsurdat,'%d/%m/%y') as svsurdat,
						date_format(container_process.cpipratgl,'%d/%m/%y') as cpipratgl,
						tblcontainer.crbay,tblcontainer.crrow,tblcontainer.crtier,tblcontainer.crlastcond,tblcontainer.crlastconde,container_process.manufdate,
						tblcontainer.crlastact,container_process.cpishold,container_process.cpiprano,container_process.cpiorderno,container_process.cpieir,container_process.cpirefin,container_survey.svcond,
						container_process.cpodesti,container_process.cpijam,container_process.cpichrgbb,container_process.cpipaidbb,container_process.cpife,container_process.cpiterm,container_process.cpidish,container_process.cpidisdat,
						container_process.cpives,container_process.cpicargo,container_process.cpiseal,container_process.cpivoyid,container_process.cpives,container_process.cpideliver,container_process.cpidpp,
						container_process.cpidriver,container_process.cpinopol,container_process.cpiremark,container_process.cpinotes,tblvoyage.voyno,tblvoyage.vesid,tblvessel.vesopr,tblprincipal.prcode,tbldebitur.cucode,
						container_survey.rmcode, container_survey.svid, tblcontainer.crmandat
						from tblcontainer
						  left join container_process on tblcontainer.crcpid = container_process.cpid
						  left join container_survey on container_process.cpid = container_survey.cpid
						  left join tblcontainer_code on tblcontainer.cccode = tblcontainer_code.cccode
						  left join tblmaterial on tblcontainer.mtcode = tblmaterial.mtcode
						  left join tblvoyage on tblvoyage.voyid = container_process.cpivoyid
						  left join tblvessel on tblvessel.vesid = container_process.cpives
						  left join tblprincipal on tblprincipal.prcode = container_process.cpopr
						  left join tbldebitur on tblprincipal.cucode = tbldebitur.cucode
				 		where  tblcontainer.crcpid  = '${crcpid}' and (tblcontainer.crlastact = 'BI' OR tblcontainer.crlastact = 'WS') `
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}
}

module.exports = ContainerProcessController;
