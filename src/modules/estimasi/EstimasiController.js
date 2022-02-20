"use strict";

require("dotenv").config();
const baseResponse = require("../../utils/helper/Response");
const {
	container_process,
	container_repair_detail,
	container_repair,
	repairDetailFile, con_repair_detail_temp, container,
} = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
// const {container} = require("../index");
const Op = Sequelize.Op;

class EstimasiController {
	static async list(req, res, next) {
		let { number, limit, offset } = req.query;
		let limits = limit == undefined ? "" : ` limit ${limit}`;
		let offsets = offset == undefined ? "" : ` offset ${offset}`;

		try {
			let payload;
			if (!number) {
				payload = await container_process.sequelize.query(
					`select con.crno,date_format( cp.cpitgl, '%d/%m/%y' ) as cpitgl, cp.cpijam, cp.cpid,
				sur.svcond, cust.cuname, cc.cclength, cc.ccheight, ct.ctdesc, ct.ctcode, 
			   sur.svid,date_format( sur.svsurdat, '%d/%m/%y' ) as svsurdat,
			   rp.rpnoest,pr.prcode,rp.rpver,pr.prname,
			   date_format( rp.rptglest, '%d/%m/%y' ) as rptglest, date_format( rp.rptglest, '%h:%i' ) as rpjamest,
			   dp.dpname, sdp.sdname, con.crlastcond, cp.cpideliver, cp.cpiterm,
			   tv.vesid, tv.voyno
		   	   from tblcontainer con
			   inner join container_process cp on con.crno = cp.crno
			   inner join container_survey sur on sur.cpid = cp.cpid
			   left join tblprincipal pr on pr.prcode = cp.cpopr
			   left join container_repair rp on rp.svid = sur.svid
			   left join tblcontainer_code cc on cc.cccode = con.cccode
			   left join tblcontainer_type ct on ct.ctcode = cc.ctcode
			   left join tblvoyage tv on tv.voyid = cp.cpivoyid
			   left join tblvessel tves on tves.vesid = tv.vesid
			   left join tbldebitur cust on cust.cucode = pr.cucode
			   left join tbldepo dp on dp.dpcode = cp.cpdepo
			   left join tblsubdepo sdp on sdp.sdcode = cp.spdepo 
			   where sur.type='1' order by rp.rpnoest desc
           	 	${limits} ${offsets}`,
					{
						type: container_process.SELECT,
					}
				);
			} else {
				payload = await container_process.sequelize.query(
					`select con.crno,date_format( cp.cpitgl, '%d/%m/%y' ) as cpitgl, cp.cpijam, cp.cpid,
					sur.svcond, cust.cuname, cc.cclength, cc.ccheight, ct.ctdesc, ct.ctcode, 
				   sur.svid,date_format( sur.svsurdat, '%d/%m/%y' ) as svsurdat,
				   rp.rpnoest,pr.prcode,rp.rpver,pr.prname,
				   date_format( rp.rptglest, '%d/%m/%y' ) as rptglest, date_format( rp.rptglest, '%h:%i' ) as rpjamest,
				   dp.dpname, sdp.sdname, con.crlastcond, cp.cpideliver, cp.cpiterm,
				   tv.vesid, tv.voyno
			   from tblcontainer con
				   inner join container_process cp on con.crno = cp.crno
				   inner join container_survey sur on sur.cpid = cp.cpid
				   left join tblprincipal pr on pr.prcode = cp.cpopr
				   left join container_repair rp on rp.svid = sur.svid
				   left join tblcontainer_code cc on cc.cccode = con.cccode
				   left join tblcontainer_type ct on ct.ctcode = cc.ctcode
				   left join tblvoyage tv on tv.voyid = cp.cpivoyid
				   left join tblvessel tves on tves.vesid = tv.vesid
				   left join tbldebitur cust on cust.cucode = pr.cucode
				   left join tbldepo dp on dp.dpcode = cp.cpdepo
				   left join tblsubdepo sdp on sdp.sdcode = cp.spdepo 
				   where rp.rpcrno='${number}' 
				   and sur.type='1' order by rp.rpnoest desc
						${limits} ${offsets}`,
					{
						type: container_process.SELECT,
					}
				);
			}
			let resultData = payload[0];
			baseResponse({ message: "List Estimasi", data: resultData })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listHeaderContainer(req, res, next) {
		let { number, limit, offset } = req.query;
		let limits = limit == undefined ? "" : ` limit ${limit}`;
		let offsets = offset == undefined ? "" : ` offset ${offset}`;

		try {
			let payload;
			if (!number) {
				payload = await container_process.sequelize.query(
					`select con.crno,cr.rptglest,pr.prdmno,date_format(ct.coexpdate,'%d/%m/%y') as coexpdate,
					cp.cpieir,cc.cccode, cc.ctcode, cc.cclength, cc.ccheight,
					date_format(cs.svsurdat,'%d/%m/%y') as svsurdat,ct.cono,cp.cpiorderno,cr.rpver,	cr.rpnoest,cs.svcond,cp.cpopr
					from tblcontainer  con
						left join container_process	 cp  on con.crno = cp.crno
						left join container_survey	 cs  on cs.cpid = cp.cpid
						left join tblprincipal       pr  on pr.prcode =cp.cpopr
						left join tblcontract	     ct  on ct.prcode = pr.prcode
						left join tblcontainer_code	 cc  on con.cccode = cc.cccode
						left join container_repair   cr  on cr.svid = cs.svid
						where cs.type='1' order by cr.rpnoest desc
           	 	${limits} ${offsets}`,
					{
						type: container_process.SELECT,
					}
				);
			} else {
				payload = await container_process.sequelize.query(
					`select con.crno,cr.rptglest,pr.prdmno,date_format(ct.coexpdate,'%d/%m/%y') as coexpdate,
					cp.cpieir,cc.cccode, cc.ctcode, cc.cclength, cc.ccheight,
					date_format(cs.svsurdat,'%d/%m/%y') as svsurdat,ct.cono,cp.cpiorderno,cr.rpver,	cr.rpnoest,cs.svcond,cp.cpopr
					from tblcontainer  con
						left join container_process	 cp  on con.crno = cp.crno
						left join container_survey	 cs  on cs.cpid = cp.cpid
						left join tblprincipal       pr  on pr.prcode =cp.cpopr
						left join tblcontract	     ct  on ct.prcode = pr.prcode
						left join tblcontainer_code	 cc  on con.cccode = cc.cccode
						left join container_repair   cr  on cr.svid = cs.svid 
				   where cr.rpcrno='${number}' 
				   and cs.type='1' order by cr.rpnoest desc
						${limits} ${offsets}`,
					{
						type: container_process.SELECT,
					}
				);
			}
			let resultData = payload[0];
			baseResponse({ message: "List Estimasi", data: resultData })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listDetailContainer(req, res, next) {
		let { limit, offset } = req.query;
		let limits = limit == undefined ? "" : ` limit ${limit}`;
		let offsets = offset == undefined ? "" : ` offset ${offset}`;

		try {
			let payload = await container_process.sequelize.query(
				`	select cp.rpcrno,cp.rpver,rd.rpid,rd.rdapp,rd.svid,tbllocation.lcdesc,com.cmdesc,dm.dydesc,rm.rmdesc,
					mu.muname,rd.rdcalmtd,rd.rdteb,rd.rdsize,rd.rdqty,rd.rdmhr,cur.curr_symbol,rd.rdlab,rd.rdmat,rd.rdtotal, 
					case when rd.rdaccount='o' then 'owner' when rd.rdaccount='u' then 'user' else 'i' end as rdaccount,
					case when length(rd.rdsize) > 0 then
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
					end as rddesc,	tbllocation.lccode,	com.cmcode,dm.dycode,	rm.rmcode
				from tbllocation 
				left join container_repair_detail rd  on tbllocation.lccode=rd.rdloc 
				left join tblcomponent	          com on com.cmcode=rd.rdcom 
				left join tbldamage_type          dm  on dm.dycode=rd.rddmtype 
				left join tblrepair_method        rm  on rm.rmcode=rd.rdrepmtd 
				left join tblmeasurement_unit     mu  on mu.muname=rd.muname
				left join tblcurrency             cur on cur.tucode=rd.rdcurr
				inner join container_repair       cp  on cp.svid = rd.svid
           	 	${limits} ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);

			let resultData = payload[0];
			baseResponse({ message: "List Detail Estimasi", data: resultData })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteEstmasiDetail(req, res, next) {
		let { SVID, RPID, RDNO } = req.body;
		try {
			let datas = await container_process.sequelize.query(
				`Delete FROM container_repair_detail 
				 	WHERE svid='${SVID}' and rpid='${RPID}' and rdno='${RDNO}' `,
				{
					type: container_process.DELETE,
				}
			);
			let datasx = await container_repair_detail.sequelize.query(
				`Delete FROM repair_detail_file 
				 	WHERE svid='${SVID}' and rpid='${RPID}' `,
				{
					type: container_repair_detail.DELETE,
				}
			);

			baseResponse({ message: "Deleted Header Repo", data: { datas, datasx } })(
				res,
				200
			);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async printEstimasi(req, res, next) {
		let { limit, offset } = req.query;
		let limits = limit == undefined ? "" : ` limit ${limit}`;
		let offsets = offset == undefined ? "" : ` offset ${offset}`;

		try {
			let payload = await container_process.sequelize.query(
				`select con.crno,date_format( cp.cpitgl, '%d/%m/%y' ) as cpitgl, cp.cpijam, cp.cpid,
					sur.svcond, cust.cuname, cc.cclength, cc.ccheight, ct.ctdesc, ct.ctcode, 
				   sur.svid,date_format( sur.svsurdat, '%d/%m/%y' ) as svsurdat,
				   rp.rpnoest,pr.prcode,rp.rpver,pr.prname,
				   date_format( rp.rptglest, '%d/%m/%y' ) as rptglest, date_format( rp.rptglest, '%h:%i' ) as rpjamest,
				   dp.dpname, sdp.sdname, con.crlastcond, cp.cpideliver, cp.cpiterm,
				   tv.vesid, tv.voyno
			   from tblcontainer con
				   inner join container_process cp on con.crno = cp.crno
				   inner join container_survey sur on sur.cpid = cp.cpid
				   left join tblprincipal pr on pr.prcode = cp.cpopr
				   left join container_repair rp on rp.svid = sur.svid
				   left join tblcontainer_code cc on cc.cccode = con.cccode
				   left join tblcontainer_type ct on ct.ctcode = cc.ctcode
				   left join tblvoyage tv on tv.voyid = cp.cpivoyid
				   left join tblvessel tves on tves.vesid = tv.vesid
				   left join tbldebitur cust on cust.cucode = pr.cucode
				   left join tbldepo dp on dp.dpcode = cp.cpdepo
				   left join tblsubdepo sdp on sdp.sdcode = cp.spdepo
				   
			   where con.crno = '".getparam("crno","")."' and sur.type='1' 
				   and rp.rpver='".getparam("rpver","")."'
				   and rp.rpnoest='".getparam("rpnoest","")."'
				   and rp.svid='".getparam("svid","")."'
           	 	${limits} ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);
			let resultData = payload[0];
			baseResponse({ message: "List Estimasi", data: resultData })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async insertEstimasiHeader(req, res, next) {
		let {
			svid,
			rpver,
			rptglest,
			rpnoest,
			rpcrno,
			rpcrton,
			rpcrtby,
			syid,
		} = req.body;

		try {
			var genNumber = 1;
			let MyResult = await container_repair.sequelize.query(
				`SELECT count(rpnoest) as rpnoest FROM container_repair`,
				{
					type: container_repair.SELECT,
					plain: true,
				});
			if (MyResult !== null) {
				let rests = await container_repair.sequelize.query(
					`SELECT max(rpnoest)+1 as rpnoest FROM container_repair`,
					{
						type: container_repair.SELECT,
						plain: true,
					}
				);
				genNumber = rests["rpnoest"];
			}

			let dataUsername = await container_repair.findOne({
				where: { svid: svid },
			});

			if (!dataUsername) {
				throw new Error(`container_repair ${svid} doesn't exists!`);
			}
			let payloadEstimHeader = await container_repair.create({
				svid: svid,
				rpver: rpver,
				rptglest: rptglest,
				rpnoest: genNumber,
				rpcrno: rpcrno,
				rpcrton: rpcrton,
				rpcrtby: rpcrtby,
				syid: syid,
			});

			let succesMessage = {
				"succes created container process": "", "header": payloadEstimHeader,
			};

			baseResponse({
				message: "succes created estimasi",
				data: succesMessage,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async insertEstimasiDetail(req, res, next) {
		let {
			svid,
			rpid,
			rdno,
			rdloc,
			rdcom,
			rddmtype,
			rdrepmtd,
			rdcalmtd,
			rdteb,
			rdsize,
			muname,
			rdqty,
			rdmhr,
			rdcurr,
			rdlab,
			rdmat,
			rdtotal,
			rdaccount,
			rddesc,
			rdpic,
			rdsizea,
			rdqtya,
			rdmhra,
			rdmata,
			rdlaba,
			rdtotala,
		} = req.body;

		try {

			let cmdescRest = await container_repair.sequelize.query(
				`SELECT cmdesc FROM tblcomponent WHERE cmcode LIKE '${rdcom}' `,
				{
					type: container_repair.SELECT,
					plain: true
				});

			let dydescRest = await container_repair.sequelize.query(
				`SELECT dydesc FROM tbldamage_type   WHERE dycode LIKE '${rddmtype}' `,
				{
					type: container_repair.SELECT,
					plain: true
				});

			let rmdescRest = await container_repair.sequelize.query(
				`SELECT rmdesc FROM tblrepair_method WHERE rmcode LIKE '${rdrepmtd}' `,
				{
					type: container_repair.SELECT,
					plain: true
				});

			let rdDescrip = cmdescRest['cmdesc']+" "+dydescRest['dydesc']+" "+rmdescRest['rmdesc']+" "+rdsize+" "+muname;

			let payloadEstimasi = await container_repair_detail.create({
				svid: svid,
				rpid: rpid,
				rdno: rdno,
				rdloc: rdloc,
				rdcom: rdcom,
				rddmtype: rddmtype,
				rdrepmtd: rdrepmtd,
				rdcalmtd: rdcalmtd,
				rdteb: rdteb,
				rdsize: rdsize,
				muname: muname,
				rdqty: rdqty,
				rdmhr: rdmhr,
				rdcurr: rdcurr,
				rdlab: rdlab,
				rdmat: rdmat,
				rdtotal: rdtotal,
				rdaccount: rdaccount,
				rddesc: rdDescrip,
				rdpic: rdpic,
				rdsizea: rdsizea,
				rdqtya: rdqtya,
				rdmhra: rdmhra,
				rdmata: rdmata,
				rdlaba: rdlaba,
				rdtotala: rdtotala,
			});

			const payloadRepairFile = await repairDetailFile.findAll({
				where: { rpid: rpid },
			});

			let succesMessage = {
				"succes created estimasi": payloadEstimasi,
				"data repair file": payloadRepairFile,
			};

			baseResponse({
				message: "succes created estimasi",
				data: succesMessage,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listOnecpId(req, res, next) {
		let { crcpid, limit, offset } = req.query;
		let limits = limit == undefined ? "" : ` limit ${limit}`;
		let offsets = offset == undefined ? "" : ` offset ${offset}`;

		try {
			let repairload = await container_process.sequelize.query(
					`select con.crno,cr.rptglest,pr.prdmno,date_format(ct.coexpdate,'%d/%m/%y') as coexpdate,
					cp.cpieir,cc.cccode, cc.ctcode, cc.cclength, cc.ccheight,con.crcpid,
					cs.svid, cs.syid, cs.svcrton, cs.svcrtby, cs.svmdfon, cs.svmdfby,
					date_format(cs.svsurdat,'%d/%m/%y') as svsurdat,ct.cono,cp.cpiorderno,cr.rpver,	cr.rpnoest,cs.svcond,cp.cpopr
					from tblcontainer  con
						left join container_process	 cp  on con.crno = cp.crno
						left join container_survey	 cs  on cs.cpid = cp.cpid
						left join tblprincipal       pr  on pr.prcode =cp.cpopr
						left join tblcontract	     ct  on ct.prcode = pr.prcode
						left join tblcontainer_code	 cc  on con.cccode = cc.cccode
						left join container_repair   cr  on cr.svid = cs.svid		
			   where cs.type='1' and  con.crcpid='${crcpid}' 
           	 	`,
					{
						type: container_process.SELECT,
					}
				);
			let repairdetailload = await container_process.sequelize.query(
					`select cp.rpcrno,cp.rpver,rd.rpid,rd.rdapp,rd.svid,tbllocation.lcdesc,com.cmdesc,dm.dydesc,rm.rmdesc,
							mu.muname,rd.rdcalmtd,rd.rdteb,rd.rdsize,rd.rdqty,rd.rdmhr,cur.curr_symbol,rd.rdlab,rd.rdmat,rd.rdtotal, 
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
						where  cs.cpid='${crcpid}' 
						`,
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

	static async listOneCrno(req, res, next) {
		let { crno, limit, offset } = req.query;
		let limits = limit == undefined ? "" : ` limit ${limit}`;
		let offsets = offset == undefined ? "" : ` offset ${offset}`;

		try {
			let repairload  = await container_process.sequelize.query(
					`select con.crno,cr.rptglest,pr.prdmno,date_format(ct.coexpdate,'%d/%m/%y') as coexpdate,
							cp.cpieir,cc.cccode, cc.ctcode, cc.cclength, cc.ccheight,con.crcpid,
							cs.svid, cs.syid, cs.svcrton, cs.svcrtby, cs.svmdfon, cs.svmdfby,
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

	static async updateDataHeader(req, res, next){
		let {
			svid,
			rpver,
			rptglest,
			rpnoest,
			rpcrno,
			rpcrton,
			rpcrtby,
			syid,
		} = req.body;

		try {

			var genNumber = 1;
			let MyResult = await container_repair.sequelize.query(
				`SELECT count(rpnoest) as rpnoest FROM container_repair`,
				{
					type: container_repair.SELECT,
					plain: true,
				});
			if (MyResult !== null) {
				let rests = await container_repair.sequelize.query(
					`SELECT max(rpnoest)+1 as rpnoest FROM container_repair`,
					{
						type: container_repair.SELECT,
						plain: true,
					}
			);
				genNumber = rests["rpnoest"];
			}

			let dataUsername = await container_repair.findOne({
				where: { svid: svid },
			});

			if (!dataUsername) {
				throw new Error(`container_repair ${svid} doesn't exists!`);
			}

			let payloadEstimHeader = await container_repair.update({
				svid: svid,
				rpver: rpver,
				rptglest: rptglest,
				rpnoest: genNumber,
				rpcrno: rpcrno,
				rpcrton: rpcrton,
				rpcrtby: rpcrtby,
				syid: syid,
			},
				{ where: { svid: svid } }
			);

			let succesMessage = {
				"succes update container repair": "", "header": payloadEstimHeader,
			};

			baseResponse({
				message: "succes update estimasi header",
				data: succesMessage,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async updateDataDetail(req, res, next){
		let {
			svid,
			rpid,
			rdno,
			rdloc,
			rdcom,
			rddmtype,
			rdrepmtd,
			rdcalmtd,
			rdteb,
			rdsize,
			muname,
			rdqty,
			rdmhr,
			rdcurr,
			rdlab,
			rdmat,
			rdtotal,
			rdaccount,
			rddesc,
			rdpic,
			rdsizea,
			rdqtya,
			rdmhra,
			rdmata,
			rdlaba,
			rdtotala,
		} = req.body;

		try {
			let dataUsername = await container_repair_detail.findOne({
				where: {
					[Op.and]: [
						{svid: svid},
						{rpid : rpid}
					],
				},
			});

			if (!dataUsername) {
				throw new Error(`container_repair_detail ${svid} doesn't exists!`);
			}

			let cmdescRest = await container_repair.sequelize.query(
				`SELECT cmdesc FROM tblcomponent WHERE cmcode LIKE '${rdcom}' `,
				{
					type: container_repair.SELECT,
					plain: true
				});

			let dydescRest = await container_repair.sequelize.query(
				`SELECT dydesc FROM tbldamage_type   WHERE dycode LIKE '${rddmtype}' `,
				{
					type: container_repair.SELECT,
					plain: true
				});

			let rmdescRest = await container_repair.sequelize.query(
				`SELECT rmdesc FROM tblrepair_method WHERE rmcode LIKE '${rdrepmtd}' `,
				{
					type: container_repair.SELECT,
					plain: true
				});

			let rdDescrip = cmdescRest['cmdesc']+" "+dydescRest['dydesc']+" "+rmdescRest['rmdesc']+" "+rdsize+" "+muname;

			let payloadEstimasi = await container_repair_detail.update({
				svid: svid,
				rpid: rpid,
				rdno: rdno,
				rdloc: rdloc,
				rdcom: rdcom,
				rddmtype: rddmtype,
				rdrepmtd: rdrepmtd,
				rdcalmtd: rdcalmtd,
				rdteb: rdteb,
				rdsize: rdsize,
				muname: muname,
				rdqty: rdqty,
				rdmhr: rdmhr,
				rdcurr: rdcurr,
				rdlab: rdlab,
				rdmat: rdmat,
				rdtotal: rdtotal,
				rdaccount: rdaccount,
				rddesc: rdDescrip,
				rdpic: rdpic,
				rdsizea: rdsizea,
				rdqtya: rdqtya,
				rdmhra: rdmhra,
				rdmata: rdmata,
				rdlaba: rdlaba,
				rdtotala: rdtotala,
			},
			{ where: {
				[Op.and]: [{ svid: svid }, { rpid : rpid }],
				},
			});

			const payloadRepairFile = await repairDetailFile.findAll({
				where: {
					[Op.and]: [
						{svid: svid},
						{rpid : rpid}

					],
				},
			});

			let succesMessage = {
				"succes update estimasi detail ": payloadEstimasi,
				"data repair file ": payloadRepairFile,
			};

			baseResponse({
				message: "succes created estimasi",
				data: succesMessage,
			})(res, 200);
			Logger(req);
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
					where cr.rpcrno='${crno}' and rdf.id is not null`,
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
				FROM repair_detail_file WHERE svid='${svid}' AND rpid='${rpid}' `,
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

	static async nextEstimasi(req, res, next){
		let {
			svid,
		} = req.body;

		try {

			var MyResult = await container_repair.sequelize.query(
				`INSERT INTO con_repair_detail_temp
				 SELECT *  FROM container_repair_detail WHERE svid LIKE '${svid}' `,
				{
					type: container_repair.INSERT
				});

			let rdnoRest = await container_repair.sequelize.query(
				`SELECT (rdno)+1 as rdno FROM container_repair_detail WHERE svid LIKE '${svid}' `,
				{
					type: container_repair.SELECT,
					plain: true
				});

			var RDNOS = rdnoRest['rdno']
			if ( RDNOS != null){
				var repairDetail = await container_repair.sequelize.query(
					`UPDATE container_repair_detail SET rdno = '${RDNOS}'  WHERE svid LIKE '${svid}' `,
					{
						type: container_repair.INSERT
					});
			}

			let rpverRest = await container_repair.sequelize.query(
				`SELECT (rpver)+1 as rpver FROM container_repair WHERE svid LIKE '${svid}' `,
				{
					type: container_repair.SELECT,
					plain: true
				});

			var RPVERS = rpverRest['rpver']
			if (RPVERS != null){
				var repair = await container_repair.sequelize.query(
					`UPDATE  container_repair SET rpver = '${RPVERS}' WHERE svid LIKE '${svid}' `,
					{
						type: container_repair.INSERT
					});
			}



			baseResponse({
				message: "succes created estimasi next",
				data : repair
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async finalEstimasi(req, res, next){
		let {
			crno, svid, totalrmhr, totallab, totalcost, total, autno, rpnotesa, rpbillon,
		} = req.body;

		try {

			let payloadEstimRepair = await container_repair.update({
					rpbillon: rpbillon,
					rptotalrmhr: totalrmhr,
					rptotalrlab: totallab,
					rptotalrcost: totalcost,
					rptotalamount: total,
					rpautno: autno,
					rpnotesa: rpnotesa,
					rpstsappvpr: 1,
					rptglappvpr: Date.now(),
				},
				{ where: { svid: svid } }
			);

            const payload = await container.update(
                { crlastact: "WW" },
                { where: { crno: crno } }
            );

			let succesMessage = {
				"succes update container repair": "", "repair": payloadEstimRepair,
			};

			baseResponse({
				message: "succes update estimasi final", data : succesMessage
			})(res, 200);
			Logger(req);

		}catch (error){
			res.status(403);
			next(error);
		}



	}

	static async listcalculated(req, res, next){
		let { rdloc,  rdcom,  rddmtype,  rdrepmtd, rdsize,  rdcalmtd, rdqty,  muname, prcode } = req.query;
		try {
			let repairload  = await container_repair.sequelize.query(
				`SELECT 1 xlimit,
						1 xstart, 1 xhours, 1 xmtrl_cost,1 xinc, 1 xinc_hours,
						0 xinc_mtrl_cost, 0 xtariff_hours,
						0 xtariff_labor_cost, 0 xtariff_mtrl_cost
				 FROM tbl_mnr_tariff limit 1 `,
				{
					type: container_repair.SELECT,
				});

			let resultData    = repairload[0];
			baseResponse({ message: "List calculated ", data:  resultData})(res, 200);
		}catch (error){
			res.status(403);
			next(error);
		}
	}

	static async completeRepairItem(req, res, next){
		let {
			svid,
			rpid,
			rdcomp,
			rdcompdate
		} = req.body;

		try {
			let dataUsername = await container_repair_detail.findOne({
				where: {
					[Op.and]: [
						{svid: svid},
						{rpid : rpid}
					],
				},
			});

			if (!dataUsername) {
				throw new Error(`container_repair_detail ${svid} doesn't exists!`);
			}

			let payloadEstimasi = await container_repair_detail.update({
					svid: svid,
					rpid: rpid,
					rdcomp: rdcomp,
					rdcompdate: rdcompdate,
				},
				{ where: {
						[Op.and]: [{ svid: svid }, { rpid : rpid }],
					},
				});


			let succesMessage = {
				"succes update estimasi detail ": payloadEstimasi,
			};

			baseResponse({
				message: "succes created estimasi",
				data: succesMessage,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = EstimasiController;
