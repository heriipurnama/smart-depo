"use strict";

require("dotenv").config();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const baseResponse = require("../../utils/helper/Response");
const {
	container_process,
	container_repair_detail,
	container_repair,
	repairDetailFile, orderPra,
} = require("../../db/models");
const Logger = require("../../utils/helper/logger");

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
		let { SVID, RPID, RDNO } = req.params;
		try {
			let datas = await container_process.sequelize.query(
				`	Delete FROM container_repair_detail 
				 	WHERE SVID=${SVID} 
					 and RPID=${RPID} 
					 and RDNO=${RDNO}
				 `,
				{
					type: container_process.DELETE,
				}
			);
			let datasx = await container_repair_detail.sequelize.query(
				`	Delete FROM repair_detail_file 
				 	WHERE SVID=${SVID} 
					 and RPID=${RPID}
				 `,
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
			let payloadEstimHeader = await container_repair.create({
				svid: svid,
				rpver: rpver,
				rptglest: rptglest,
				rpnoest: rpnoest,
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
				rddesc: rddesc,
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
							cs.svid, cs.syid, cs.svcrton, cs.svcrtby, cs.svmdfon, cs.svmdfby,
							date_format(cs.svsurdat,'%d/%m/%y') as svsurdat,ct.cono,cp.cpiorderno,cr.rpver,  cr.rpnoest,cs.svcond,cp.cpopr
					 from tblcontainer  con
							  left join container_process   cp  on con.crno = cp.crno
							  left join container_survey   cs  on cs.cpid = cp.cpid
							  left join tblprincipal       pr  on pr.prcode =cp.cpopr
							  left join tblcontract       ct  on ct.prcode = pr.prcode
							  left join tblcontainer_code   cc  on con.cccode = cc.cccode
							  left join container_repair   cr  on cr.svid = cs.svid
					 where cs.type='1' and  con.crno='${crno}' `,
					{
						type: container_process.SELECT,
					}
				);

			let repairdetailload  = await container_process.sequelize.query(
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
				rpnoest: rpnoest,
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
				where: { svid: svid },
			});

			if (!dataUsername) {
				throw new Error(`container_repair_detail ${svid} doesn't exists!`);
			}

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
				rddesc: rddesc,
				rdpic: rdpic,
				rdsizea: rdsizea,
				rdqtya: rdqtya,
				rdmhra: rdmhra,
				rdmata: rdmata,
				rdlaba: rdlaba,
				rdtotala: rdtotala,
			},
			{ where: { svid: svid } }
		);

			const payloadRepairFile = await repairDetailFile.findAll({
				where: { rpid: rpid },
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
}

module.exports = EstimasiController;
