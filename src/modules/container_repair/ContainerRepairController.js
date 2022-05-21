"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_repair, container_type, container_process, container} = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class ContainerRepairController {

	static async listMnr(req, res, next) {
		let { limit, offset, search } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` and con.CRNO LIKE '%${search}%' ` : ` and con.CRNO LIKE '%%' `;

		try {
			let datas = await container_process.sequelize.query(
				`SELECT rp.RPVER,pr.PRCODE,rp.RPCRNO,surv.SVID,DATE_FORMAT( surv.SVSURDAT, '%d/%m/%Y' ) AS SVSURDAT,
                DATE_FORMAT( cp.CPITGL, '%d/%m/%Y' ) AS CPITGL,rp.RPNOEST, surv.SVCOND,
                 DATE_FORMAT( rp.RPTGLEST,'%d/%m/%Y') as RPTGLEST
                FROM 
                 container_process cp INNER JOIN tblcontainer con ON
                  cp.CRNO = con.CRNO
                  INNER JOIN container_survey surv ON
                  surv.CPID = cp.CPID
                  INNER JOIN container_repair rp ON
                  rp.SVID = surv.SVID
                  LEFT JOIN tblprincipal pr ON
                  pr.PRCODE = cp.CPOPR Where surv.TYPE='1' ${searchs} and (con.crlastact ='CO' or con.crlastact ='WC')
				  ORDER BY rp.SVID desc LIMIT ${limits} OFFSET ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);
			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
                FROM 
                 container_process cp INNER JOIN tblcontainer con ON
                  cp.CRNO = con.CRNO
                  INNER JOIN container_survey surv ON
                  surv.CPID = cp.CPID
                  INNER JOIN container_repair rp ON
                  rp.SVID = surv.SVID
                  LEFT JOIN tblprincipal pr ON
                  pr.PRCODE = cp.CPOPR Where surv.TYPE='1' and (con.crlastact ='CO' or con.crlastact ='WC')`,
				{
					type: container_process.SELECT,
				}
			);
			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List Estimation",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static  async finisRepair(req, res, next){
		let {
			crno, svid,
		} = req.body;
		try {

			let payloadEstimRepair = await container_repair.update({
					rpstsappvpr: 1,
					rptgltar: Date.now(),
					rpmridat: Date.now(),
					rpdrepair: Date.now(),
					rptglwroke: Date.now(),
					rpmrodat: Date.now(),
					rphrodat: Date.now(),
				},
				{ where: { svid: svid } }
			);

			const payload = await container.update(
				{ crlastact: "WC" },
				{ where: { crno: crno } }
			);

			let succesMessage = {
				"succes update container repair": "", "repair": payloadEstimRepair,
			};

			baseResponse({
				message: "succes update finis repair ", data : succesMessage
			})(res, 200);
			Logger(req);

		}catch (error){
			res.status(403);
			next(error);
		}
	}

	static  async finisCleaning(req, res, next){
		let {
			crno, svid,
		} = req.body;
		try {

			let payloadEstimRepair = await container_repair.update({
					rpclidat: Date.now(),
					rpclodat: Date.now(),
				},
				{ where: { svid: svid } }
			);

			const payload = await container.update(
				{ crlastact: "CO" },
				{ where: { crno: crno } }
			);

			let succesMessage = {
				"succes update container repair": "", "repair": payloadEstimRepair,
			};

			baseResponse({
				message: "succes update finis cleaning ", data : succesMessage
			})(res, 200);
			Logger(req);

		}catch (error){
			res.status(403);
			next(error);
		}
	}

	static async listOneCrno(req, res, next) {
		let { crno, limit, offset } = req.query;
		let limits = limit == undefined ? "" : ` limit ${limit}`;
		let offsets = offset == undefined ? "" : ` offset ${offset}`;

		try {
			let repairload  = await container_process.sequelize.query(
				`select con.crno, con.crlastact, cr.wono, cs.syid, cr.rptglest,pr.prdmno,date_format(ct.coexpdate,'%d/%m/%y') as coexpdate,
							cp.cpieir,cc.cccode, cc.ctcode, cc.cclength, cc.ccheight,con.crcpid, date_format( cp.cpitgl, '%d/%m/%Y' ) AS cpitgl,
							cs.svid, cs.syid, cs.svcrton, cs.svcrtby, cs.svmdfon, cs.svmdfby, con.crmandat, con.crtarak, cp.cpives,cp.cpivoyid,
							date_format(cs.svsurdat,'%d/%m/%y') as svsurdat,ct.cono,cp.cpiorderno,cr.rpver,	cr.rpnoest,cs.svcond,cp.cpopr
					 from tblcontainer  con
							  left join container_process	 cp  on con.crno = cp.crno
							  left join container_survey	 cs  on cs.cpid = cp.cpid
							  left join tblprincipal       pr  on pr.prcode =cp.cpopr
							  left join tblcontract	     ct  on ct.prcode = pr.prcode
							  left join tblcontainer_code	 cc  on con.cccode = cc.cccode
							  left join container_repair   cr  on cr.svid = cs.svid
					 where cs.type='1' and  con.crno='${crno}' `,
				{
					type: container_process.SELECT,
				}
			);

			let repairdetailload  = await container_process.sequelize.query(
				`select cp.rpcrno,cp.rpver,rd.rpid,rd.rdapp,rd.svid,tbllocation.lcdesc,com.cmdesc,dm.dydesc,rm.rmdesc,
							mu.muname,rd.rdcalmtd,rd.rdteb,rd.rdsize,rd.rdqty,rd.rdmhr,cur.curr_symbol,rd.rdlab,rd.rdmat,rd.rdtotal, rd.rdno,
							(case when rd.rdaccount='o' then 'owner' when rd.rdaccount='u' then 'user' else 'i' end) as rdaccount,
							(case when length(rd.rdsize) > 0 then
								case when length(rd.rdqty) > 0 then
									case when trim(rd.rdqty)=1 then
										left(trim(rd.rddesc),(length(trim(rd.rddesc))) )
									else
										insert(trim(rd.rddesc),(length(trim(rd.rddesc))+1),5, cast(concat(' ',rd.rdqty,'x')  as char)  )
					
									end 
								else
									rd.rddesc
								end 
							else
								case when length(rd.muname) > 0 then
									rd.rddesc
								else
									case when trim(rd.rdqty)=1 then
										left(trim(rd.rddesc),(length(trim(rd.rddesc))-1) )
									else
										insert(trim(rd.rddesc),(length(trim(rd.rddesc))+1),4,'x' )
									end
								end
							end) as rddesc,	tbllocation.lccode,	com.cmcode,dm.dycode,	rm.rmcode
						from tbllocation 
							left join container_repair_detail rd  on tbllocation.lccode=rd.rdloc 
							left join tblcomponent	          com on com.cmcode=rd.rdcom 
							left join tbldamage_type          dm  on dm.dycode=rd.rddmtype 
							left join tblrepair_method        rm  on rm.rmcode=rd.rdrepmtd 
							left join tblmeasurement_unit     mu  on mu.muname=rd.muname
							left join tblcurrency             cur on cur.tucode=rd.rdcurr
							inner join container_repair        cp  on cp.svid = rd.svid
							inner join container_survey	      cs  on cs.svid = rd.svid		
						where  cp.rpcrno='${crno}' `,
				{
					type: container_process.SELECT,
				}
			);

			let resultData    = repairload[0];
			let resultdtlData = repairdetailload[0]
			baseResponse({ message: "List Estimasi", data: {dataOne: resultData, dataTwo: resultdtlData} })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async getFileDetail(req, res, next){
		let { crno } = req.query;
		try {
			let repairload  = await container_repair.sequelize.query(
				`SELECT rdf.id, rdf.svid, rdf.rpid, rdf.url, rdf.file_time_upload, rdf.flag
					from container_repair             cr    
					left join container_repair_detail crd   on cr.svid = crd.svid
					left join repair_detail_file      rdf   on crd.svid=rdf.svid and crd.rpid=rdf.rpid
					where cr.rpcrno='${crno}' and rdf.flag=2 and rdf.id is not null`,
				{
					type: container_repair.SELECT,
				});

			let resultData    = repairload[0];
			baseResponse({ message: "List file ", data:  resultData})(res, 200);
		}catch (error){
			res.status(403);
			next(error);
		}
	}

	static async getFile(req, res, next){
		let { svid, rpid } = req.query;
		try {
			let repairload  = await container_repair.sequelize.query(
				`SELECT id, svid, rpid, url, file_time_upload, flag 
				FROM repair_detail_file WHERE svid='${svid}' AND rpid='${rpid}' AND flag= 2 `,
				{
					type: container_repair.SELECT,
				});

			let resultData    = repairload[0];
			baseResponse({ message: "List file ", data:  resultData})(res, 200);
		}catch (error){
			res.status(403);
			next(error);
		}
	}


	static async list(req, res, next) {
		let { start, rows } = req.body;

		try {
			let { count, rows: datas } = await container_repair.findAndCountAll({
				offset: start,
				limit: rows,
				include: [
					{
						model: container_type,
						required: false, // do not generate INNER JOIN
					},
				],
			});
			baseResponse({ message: "list container codes", data: { datas, count } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	// static async delete(req, res, next) {
	// 	let {ccCode} = req.body;
	// 	try {
	// 		let payload = await container_repair.destroy({
	// 			where:{cccode: ccCode}
	// 		});
	// 		baseResponse({ message: "Success Delete Container Code", data: payload })(res, 200);
	// 		Logger(req);
	// 	} catch (error) {
	// 		res.status(403);
	// 		next(error);
	// 	}
	// }

	// static async cek(req, res, next) {
	// 	try {
	// 		res.status(200);
	// 		return res.json(req.body);
	// 	} catch (error) {
	// 		res.status(403);
	// 		next(error);
	// 	}
	// }
}

module.exports = ContainerRepairController;
