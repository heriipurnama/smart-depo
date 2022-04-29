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

const Op = Sequelize.Op;



class ReportsController {

    static async rptDailyMovementIn(req, res, next) {
        let { prcode, date_from, date_to,  hour_from, hour_to} = req.query;
		let prcode1    = prcode == "" ? " " : " cp.cpopr ='" + prcode + "' and ";

        try {
			let datas = await container_process.sequelize.query(
				`
				select cp.cpopr, cpdepo, dep.dpname, cp.crno, cc.ctcode, cc.cclength, cc.ccheight, cp.cpives as vesid,
				cp.cpivoy as voyid, sur.svcond as svcond, sur.svcond as conde,  
				cp.cpitruck, cp.cpidriver, cp.cpideliver, 
				cp.cpitgl ,
				cp.cpijam, cp.cpinopol, cp.cpiremark, cr.retype, cr.retfrom,
				cr.readdr, cpiorderno
				from container_process cp 
					left join tblcontainer con on con.crno = cp.crno
					left join order_container_repo cr on cr.reorderno=cp.cpiorderno
					left join container_survey sur on sur.cpid = cp.cpid
					left join tblcontainer_code cc on cc.cccode = con.cccode
					left join tblvoyage voy on voy.voyid = cp.cpivoyid
					left join tbldepo dep on dep.dpcode = cp.cpdepo
				where
				${prcode1}
				(cp.cpitgl BETWEEN '${date_from}' AND '${date_to}')
				and (cp.cpijam BETWEEN '${hour_from}' AND '${hour_to}')
				and cp.cpopr<>'' and (cp.cpistatus<>'of' and cp.cpistatus<>'fs' and cp.cpistatus<>'fc') 
				and (cp.crno<>'' or cp.crno is not null ) 
				order by cp.cpitgl 
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "Report Daily Movement In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

	static async rptDailyMovementOut(req, res, next) {
		let { prcode, date_from, date_to,  hour_from, hour_to} = req.query;
		let prcode1    = prcode == "" ? " " : " cp.cpopr ='" + prcode + "' and ";


		try {
			let datas = await container_process.sequelize.query(
				`
					select cp.cpopr1,
						   dep.dpname,
						   cp.cpideliver  as consignee,
						   cp.cpopr,
						   cp.cpidisdat   as cek_disdat,
						   cp.crno        as crno,
						   cc.cccode      as id_code,
						   cc.ctcode      as ctype,
						   cp.cpidisdat   as disch_date,
						   cc.cclength    as clength,
						   cc.ccheight    as cheight,
						   cpoves         as loading_ves,
						   cpovoy         as loading_voy,
						   cp.cpoload     as dest,
						   cp.cporeceptno,
						   cp.cpitgl      as date_in,
						   cp.cpotgl      as date_out,
						   con.crlastcond as cond,
						   cp.cporefout   as do_no,
						   cp.cposeal     as seal,
						   cp.cpojam as time, cp.cpives as ex_vessel, cp.cpivoy as ex_voy,
				cp.cporemark as remarks, cp.cpotruck as trucker, cp.cpodriver as driver, cp.cponopol as vehicle_id, 
				cr.retype, cr.retto,cp.cporeceiv as receiver,po.poport,po.cncode, cp.cporemark, sur.svcond as kondisi
					from container_process cp
						inner join tblcontainer con
					on con.crno = cp.crno
						left join order_container_repo cr on cr.reorderno=cp.cpoorderno
						left join tblcontainer_code cc on cc.cccode = con.cccode
						left join tblvoyage voy on voy.voyid = cp.cpovoyid
						left join tbldepo dep on dep.dpcode = cp.cpdepo
						left join tblport po on po.poid = cp.cpoload
						left join tblprincipal pr on cp.cpopr = pr.prcode
						left join container_survey sur on sur.cpid = cp.cpid
					where
						${prcode1}
						(cp.cpotgl BETWEEN '${date_from}' AND '${date_to}')
					  and (cp.cpojam BETWEEN '${hour_from}' AND '${hour_to}')
					  and cp.cpopr<>'' and (cp.cpistatus<>'of' and cp.cpistatus<>'fs' and cp.cpistatus<>'fc')
					  and (cp.crno<>'' or cp.crno is not null )
					order by cp.cpotgl
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "Report Daily Movement In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

    static async rptDailyRepairActivity(req, res, next) {
        let { prcode, date_from} = req.query;
		let prcode1    = prcode !== undefined ? ` and cp.cpopr ='${prcode}' `:``;
		



        try {
			let datas = await container_process.sequelize.query(
				`
				select  
				cp.cpdepo, cp.cpopr, cp.sdcode, sd.sdname as sdname, t.dpname as dpname,
				cp.cpcust as cust, cp.cpopr as opr, cp.crno as container,
				(case when cc.cclength=20 then 1 else 0 end) as size_20,
				(case when cc.cclength=40 then 1 else 0 end) as size_40,
				(case when cc.cclength=45 then 1 else 0 end) as size_45,
				cc.ctcode as ctype, 
				date_format(rep.rptglappvpr, '%d-%m-%y') as appv, 
				date_format(rep.rpmridat, '%d-%m-%y') as in_w_s,
				date_format(rep.rpdrepair, '%d-%m-%y') as dw_start, 
				date_format(rep.rptglwroke, '%d-%m-%y') as dw_finish,
				date_format(rep.rpmrodat, '%d-%m-%y') as out_w_s, 
				rep.rptotalrmhr as mhr, rep.rptotalrlab as labour, 
				rep.rptotalrcost as material,
		  
				(case when rep.rptotalrlab+rep.rptotalrcost <= 10 then rep.rptotalrlab+rep.rptotalrcost else 0 end) as tod_mm, 
				(case when rep.rptotalrlab+rep.rptotalrcost > 10 and rep.rptotalrlab+rep.rptotalrcost <= 25 then rep.rptotalrlab+rep.rptotalrcost else 0 end)
				as tod_md,
				(case when rep.rptotalrlab+rep.rptotalrcost > 25 then rep.rptotalrlab+rep.rptotalrcost else 0 end) as tod_mj,
				'-' as revenue,
				'-' as remarks
			  from container_process cp
				left join tblvoyage voy on voy.voyid = cp.cpivoyid
				left join container_survey sur on sur.cpid = cp.cpid
				left join container_repair rep on rep.svid = sur.svid
				left join container_repair_detail rep_det on rep_det.svid = rep.svid
				left join tblcontainer con on con.crno = cp.crno
				left join tblcontainer_code cc on cc.cccode = con.cccode
				left join tblsubdepo sd on sd.sdcode=cp.spdepo
				left join tbldepo t on t.dpcode=cp.cpdepo
			  where (rep.rpfictive is null or rep.rpfictive='')
			  ${prcode1}
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "Report Daily Movement In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

    static async rptDamageProgress(req, res, next) {
        let { prcode} = req.query;
		let prcode1    = prcode == "" ? " 1 " : " cp.cpopr ='" + prcode + "' ";
		//let days = (getparam("days","")=="")? '' : "dp.cpitgl >= date_sub(curdate(),interval ".getparam("days","")." day) ";

        try {
			let datas = await container_process.sequelize.query(
				`
				select 
				   opr,
				   sum(ws_20) as ws_20,
				   sum(ws_40) as ws_40,
				   sum(ws_hc) as ws_hc,
				   sum(ws_r20) as ws_r20,
				   sum(ws_r40) as ws_r40,
				   
				   sum(we_20) as we_20,
				   sum(we_40) as we_40,
				   sum(we_hc) as we_hc,
				   sum(we_r20) as we_r20,
				   sum(we_r40) as we_r40,
				   
				   sum(wa_20) as wa_20,
				   sum(wa_40) as wa_40,
				   sum(wa_hc) as wa_hc,
				   sum(wa_r20) as wa_r20,
				   sum(wa_r40) as wa_r40,
				   
				   sum(ww_20) as ww_20,
				   sum(ww_40) as ww_40,
				   sum(ww_hc) as ww_hc,
				   sum(ww_r20) as ww_r20,
				   sum(ww_r40) as ww_r40,
				   
				   sum(wr_20) as wr_20,
				   sum(wr_40) as wr_40,
				   sum(wr_hc) as wr_hc,
				   sum(wr_r20) as wr_r20,
				   sum(wr_r40) as wr_r40,
				   
				   sum(iw_20) as iw_20,
				   sum(iw_40) as iw_40,
				   sum(iw_hc) as iw_hc,
				   sum(iw_r20) as iw_r20,
				   sum(iw_r40) as iw_r40,
				   
				   sum(cr_20) as cr_20,
				   sum(cr_40) as cr_40,
				   sum(cr_hc) as cr_hc,
				   sum(cr_r20) as cr_r20,
				   sum(cr_r40) as cr_r40,
					 
				   sum(ti_20) as ti_20,
				   sum(ti_40) as ti_40,
				   sum(ti_hc) as ti_hc,
				   sum(ti_r20) as ti_r20,
				   sum(ti_r40) as ti_r40
				  from rpt_damage_progress dp 
				  where 1
				  group by opr
				  
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "Report Daily Movement In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

    static async rptDepoInfoMonthly(req, res, next) {
        let { prcode} = req.query;


        try {
			let datas = await container_process.sequelize.query(
				`
				select 
					cp.cpopr as principal,
					month(cp.cpitgl) as dinfo_month,
					count(cp.crno) as total
				from container_process cp
				where year(cp.cpitgl)=year(now())
				group by cp.cpopr, month(cp.cpitgl)
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "Report Daily Movement In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
 
	
	}

    static async rptDepoInfoDaily(req, res, next) {
        let { prcode} = req.query;
        try {
			let datas = await container_process.sequelize.query(
				`
				select 
					cp.cpopr as principal,
					month(cp.cpitgl) as dinfo_month,
					day(cp.cpitgl) as dinfo_daily,
					count(cp.crno) as total
				from container_process cp
				where year(cp.cpitgl)=year(now())
				group by cp.cpopr, month(cp.cpitgl), day(cp.cpitgl)
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "List Container",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

    static async rptLenghtOfStay(req, res, next) {
        let { prcode, date_from, los, clength, ctcode,  condition} = req.query;

		let prcode1     = prcode    == "" ? "" : " cp.cpopr     ='"+ prcode+ "' ";
		let los1        = los       == "" ? "" : " and cp.cpitgl ='" + date_from + "'";
		let datefrom1   = date_from == "" ? "" : " and (datediff(now(), cp.cpitgl) + 1) <= " + los + " ";
		let clength1    = clength   == "" ? "" : " ";
		let ctcode1     = ctcode    == "" ? "" : " and cc.ctcode ='"+ ctcode+"' ";
		let condition1  = condition == "" ? "" : " and left(con.crlastcond,1) ='"+ condition+ "' ";
		

        try {
			let datas = await container_process.sequelize.query(
				`
				select  cp.cpopr, cp.cpdepo, cp.spdepo, sdname,  dpname,
					cp.crno as container_no, cc.cccode as id_code, cc.ctcode as ctype, cc.cclength as clength, cc.ccheight as cheight,
					vesid as ves, cpivoy as voy, date_format(cp.cpidisdat,'%d-%m-%y') as disch_date,
					datediff(now(), cp.cpidisdat) + 1 as dlq, date_format(cp.cpitgl,'%d-%m-%y') as date_in,
					datediff(now(), cp.cpitgl) + 1 as days,
					con.crlastconde as status, cp.cpiremark as remarks,
					cr.retype, cr.retfrom, cr.readdr, cpiorderno
				from container_process cp
					inner join tblcontainer con on con.crcpid = cp.cpid
					left join order_container_repo cr on cr.reorderno=cp.cpiorderno
					left join tblcontainer_code cc on cc.cccode = con.cccode 
					left join container_survey sur on sur.cpid = cp.cpid
					left join tblvoyage voy on voy.voyid = cp.cpivoyid
					left join tblsubdepo s on s.sdcode= cp.spdepo
					left join tbldepo d on d.dpcode= cp.cpdepo
				where 
					${prcode1}
					${datefrom1}
					${clength1}
					${ctcode1}
					${condition1}
					${los1}
					and (cp.cpotgl is null or cp.cpotgl='0000-00-00')
					and con.crlastact<>'OD' and con.crlastact<>'BI' 
					and cp.crno is not null
				order by cpopr, sdname, id_code, cp.cpitgl, con.crlastcond
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "Report Daily Movement In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

    static async rptSummaryContainerType(req, res, next) {
        let { prcode, date_from, date_to,  hour_from, hour_to} = req.query;
		let prcode1    = prcode == "" ? " 1 " : " cp.cpopr ='" + prcode + "' ";
		let datefrom = date_from == "" ? "" : " and cp.cpitgl >='" + date_from + "'";
		let dateto   = hour_from == "" ? "" : " and cp.cpitgl >='" + hour_from + "'";
		let jamFrom    = hour_from == "" ? "" : " and cp.cpijam >='" + hour_from + "'";
		let jamTo      = hour_to == "" ? "" : " and cp.cpijam >='" + hour_to + "'";


        try {
			let datas = await container_process.sequelize.query(
				`
				select cp.cpopr, cpdepo, dep.dpname, cp.crno, cc.ctcode, cc.cclength, cc.ccheight, cp.cpives as vesid,
				cp.cpivoy as voyid, sur.svcond as svcond, sur.svcond as conde,  
				cp.cpitruck, cp.cpidriver, cp.cpideliver, 
				cp.cpitgl ,
				cp.cpijam, cp.cpinopol, cp.cpiremark, cr.retype, cr.retfrom,
				cr.readdr, cpiorderno
				from container_process cp 
					left join tblcontainer con on con.crno = cp.crno
					left join order_container_repo cr on cr.reorderno=cp.cpiorderno
					left join container_survey sur on sur.cpid = cp.cpid
					left join tblcontainer_code cc on cc.cccode = con.cccode
					left join tblvoyage voy on voy.voyid = cp.cpivoyid
					left join tbldepo dep on dep.dpcode = cp.cpdepo
				where
				${prcode1}
				${datefrom}
				${dateto}
				${jamFrom}
				${jamTo}
				and cp.cpopr<>'' and (cp.cpistatus<>'OF' and cp.cpistatus<>'FS' and cp.cpistatus<>'FC') 
				and (cp.crno<>'' or cp.crno is not null ) 
				order by cp.cpitgl 
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "Report Daily Movement In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

    static async rptInventory(req, res, next) {
        let { prcode, clength, ctcode,  condition} = req.query;
		let prcode1     = prcode    == "" ? "" : " cp.cpopr     ='"+ prcode+ "' ";
		let clength1    = clength   == "" ? "" : " ";
		let ctcode1     = ctcode    == "" ? "" : " and cc.ctcode ='"+ ctcode+"' ";
		let condition1  = condition == "" ? "" : " and left(con.crlastcond,1) ='"+ condition+ "' ";
        try {
			let datas = await container_process.sequelize.query(
				`
					select distinct cpdepo, cpopr,  sdname,  dpname, datediff(cp.cpidisdat,str_to_date( '1899-12-30', '%y-%m-%d' ) ) as disch_date,
						cp.crno as container_no, cc.cccode as id_code, cc.ctcode as ctype, cc.cclength as clength, cc.ccheight as cheight,
						con.mtcode1 as mat, vesid as ves,  cpivoy as voy, datediff(cp.cpitgl,str_to_date( '1899-12-30', '%y-%m-%d' ) ) as date_in,
						datediff(now(), cp.cpidisdat) + 1 as dlq, 
						datediff(now(), cp.cpitgl) + 1 as days,
						con.crlastcond as status, cp.cpiremark as remarks,
						cr.retype, cr.retfrom, cr.readdr, cpiorderno
					from container_process cp
						inner join tblcontainer con on con.crcpid = cp.cpid
						left join coins_container_repo cr on cr.reorderno=cp.cpiorderno
						left join tblcontainer_code cc on cc.cccode = con.cccode 
						left join container_survey sur on sur.cpid = cp.cpid
						left join tblvoyage voy on voy.voyid = cp.cpivoyid
						left join tblsubdepo s on s.sdcode= cp.spdepo
						left join tbldepo d on d.dpcode= cp.cpdepo
					where 
						${prcode1}
						${clength1}
						${ctcode1}
						${condition1}
						and (cp.cpotgl is null or cp.cpotgl='0000-00-00')
						and con.crlastact<>'OD' and con.crlastact<>'BI' 
						and cp.crno is not null
					order by cpopr, sdname, id_code, cp.cpitgl, con.crlastcond
					`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "List Container",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

    static async rptInventoryNonAvi(req, res, next) {
		let { prcode, clength, ctcode,  condition} = req.query;
		let prcode1     = prcode    == "" ? "" : " cp.cpopr     ='"+ prcode+ "' ";
		let clength1    = clength   == "" ? "" : " ";
		let ctcode1     = ctcode    == "" ? "" : " and cc.ctcode ='"+ ctcode+"' ";
		let condition1  = condition == "" ? "" : " and left(con.crlastcond,1) ='"+ condition+ "' ";
        try {
			let datas = await container_process.sequelize.query(
				`
					select distinct cpdepo, cpopr,  sdname,  dpname, datediff(cp.cpidisdat,str_to_date( '1899-12-30', '%y-%m-%d' ) ) as disch_date,
						cp.crno as container_no, cc.cccode as id_code, cc.ctcode as ctype, cc.cclength as clength, cc.ccheight as cheight,
						con.mtcode1 as mat, vesid as ves,  cpivoy as voy, datediff(cp.cpitgl,str_to_date( '1899-12-30', '%y-%m-%d' ) ) as date_in,
						datediff(now(), cp.cpidisdat) + 1 as dlq, 
						datediff(now(), cp.cpitgl) + 1 as days,
						con.crlastcond as status, cp.cpiremark as remarks,
						cr.retype, cr.retfrom, cr.readdr, cpiorderno
					from container_process cp
						inner join tblcontainer con on con.crcpid = cp.cpid
						left join coins_container_repo cr on cr.reorderno=cp.cpiorderno
						left join tblcontainer_code cc on cc.cccode = con.cccode 
						left joincontainer_survey sur on sur.cpid = cp.cpid
						left join tblvoyage voy on voy.voyid = cp.cpivoyid
						left join tblsubdepo s on s.sdcode= cp.spdepo
						left join tbldepo d on d.dpcode= cp.cpdepo
					where 
						${prcode1}
						${clength1}
						${ctcode1}
						${condition1}
						and (cp.cpotgl is null)
						and con.crlastact<>'OD' and con.crlastact<>'BI' 
						and cp.crno is not null
					order by cpopr, sdname, id_code, cp.cpitgl, con.crlastcond
					`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "List Container",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

    static async rptStatusReport(req, res, next) {
        let { prcode, date_from, date_to,  hour_from, hour_to} = req.query;
		let prcode1    = prcode == "" ? " 1 " : " cp.cpopr ='" + prcode + "' ";
		let datefrom = date_from == "" ? "" : " and cp.cpitgl >='" + date_from + "'";
		let dateto   = hour_from == "" ? "" : " and cp.cpitgl >='" + hour_from + "'";

		let jamFrom    = hour_from == "" ? "" : " and cp.cpijam >='" + hour_from + "'";
		let jamTo      = hour_to == "" ? "" : " and cp.cpijam >='" + hour_to + "'";


        try {
			let datas = await container_process.sequelize.query(
				`
				select cp.cpopr, cpdepo, dep.dpname, cp.crno, cc.ctcode, cc.cclength, cc.ccheight, cp.cpives as vesid,
				cp.cpivoy as voyid, sur.svcond as svcond, sur.svcond as conde,  
				cp.cpitruck, cp.cpidriver, cp.cpideliver, 
				cp.cpitgl ,
				cp.cpijam, cp.cpinopol, cp.cpiremark, cr.retype, cr.retfrom,
				cr.readdr, cpiorderno
				from container_process cp 
					left join tblcontainer con on con.crno = cp.crno
					left join order_container_repo cr on cr.reorderno=cp.cpiorderno
					left join container_survey sur on sur.cpid = cp.cpid
					left join tblcontainer_code cc on cc.cccode = con.cccode
					left join tblvoyage voy on voy.voyid = cp.cpivoyid
					left join tbldepo dep on dep.dpcode = cp.cpdepo
				where
				${prcode1}
				${datefrom}
				${dateto}
				${jamFrom}
				${jamTo}
				and cp.cpopr<>'' and (cp.cpistatus<>'OF' and cp.cpistatus<>'FS' and cp.cpistatus<>'FC') 
				and (cp.crno<>'' or cp.crno is not null ) 
				order by cp.cpitgl 
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "Report Daily Movement In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

    static async billingStorage(req, res, next) {
        let { prcode, clength, ctcode, condition } = req.query;
        try {
			let datas = await container_process.sequelize.query(
				`
				SELECT 
					cpid, crno, cpdepo, spdepo, cpcust, cpcust1, cpopr, cpopr1, 
					cpichrgbb, cpipaidbb, cpicurr, cpirate, cpivbb, cpilofopr, cpiinterdate, 
					cpiinterno, cpiorderno, cpiprano, cpireceptno, cpipratgl, cpitgl, onhiredate, 
					offhiredate, manufdate, cpilocon, cpolocon, cpijam, cpistatus, cpideliver, 
					cpidisdat, cpidish, cpidishjam, cpieir, cpiterm, cpife, cpicargo, cpiprin, cpidpp, 
					cpidppinout, cpiseal, cpives, cpitruck, cpinopol, cpishold, cpiremark, cpiremark1, 
					cpiflgprt, cpirefin, cpicrton, cpicrtby, cpimdfon, cpimdfby, cpochrgbm, cpopaidbm, 
					cpocurr, cporate, cpovbm, cpolonopr, cpoorderno, cpoprano, cporeceptno, cpopratgl, 
					cpotgl, cpojam, cpostatus, cporeceiv, cpoload, cpoloaddat, cpoloadjam, cpoterm, cpofe, 
					cpocargo, cpoprin, cpodpp, cpodppinout, cposeal, cpoves, cpotruck, cponopol, cporemark, 
					cpoflgprt, cpoeir, cporefout, cpocrton, cpocrtby, cpomdfon, cpomdfby, cpivoy, cpovoy, 
					cpiceir, cpoceir, cpholdon, cpholdby, cpreleaseon, cpreleaby, dpcode, sdcode, cpidriver, 
					cpodriver, cpivoyid, cpovoyid, cpodesti, cpinotes, cponotes, svsurdat, syid, liftoncharge, 
					liftoffcharge, gtcond, wastuff, wastrip, securityinid, securityinname, securityindatetime, 
					securityoutid, securityoutname, securityoutdatetime 
				FROM container_process 
				WHERE 1
				LIMIT 1,5
				`,
				{
					type: container_process.SELECT,
				}
			);
			baseResponse({
				message: "List Container",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

    static async billingCleaning(req, res, next) {
        let { prcode, clength, ctcode, condition } = req.query;
        try {
			let datas = await container_process.sequelize.query(
				`
				SELECT 
					cpid, crno, cpdepo, spdepo, cpcust, cpcust1, cpopr, cpopr1, 
					cpichrgbb, cpipaidbb, cpicurr, cpirate, cpivbb, cpilofopr, cpiinterdate, 
					cpiinterno, cpiorderno, cpiprano, cpireceptno, cpipratgl, cpitgl, onhiredate, 
					offhiredate, manufdate, cpilocon, cpolocon, cpijam, cpistatus, cpideliver, 
					cpidisdat, cpidish, cpidishjam, cpieir, cpiterm, cpife, cpicargo, cpiprin, cpidpp, 
					cpidppinout, cpiseal, cpives, cpitruck, cpinopol, cpishold, cpiremark, cpiremark1, 
					cpiflgprt, cpirefin, cpicrton, cpicrtby, cpimdfon, cpimdfby, cpochrgbm, cpopaidbm, 
					cpocurr, cporate, cpovbm, cpolonopr, cpoorderno, cpoprano, cporeceptno, cpopratgl, 
					cpotgl, cpojam, cpostatus, cporeceiv, cpoload, cpoloaddat, cpoloadjam, cpoterm, cpofe, 
					cpocargo, cpoprin, cpodpp, cpodppinout, cposeal, cpoves, cpotruck, cponopol, cporemark, 
					cpoflgprt, cpoeir, cporefout, cpocrton, cpocrtby, cpomdfon, cpomdfby, cpivoy, cpovoy, 
					cpiceir, cpoceir, cpholdon, cpholdby, cpreleaseon, cpreleaby, dpcode, sdcode, cpidriver, 
					cpodriver, cpivoyid, cpovoyid, cpodesti, cpinotes, cponotes, svsurdat, syid, liftoncharge, 
					liftoffcharge, gtcond, wastuff, wastrip, securityinid, securityinname, securityindatetime, 
					securityoutid, securityoutname, securityoutdatetime 
				FROM container_process 
				WHERE 1
				LIMIT 1,5
				`,
				{
					type: container_process.SELECT,
				}
			);
			baseResponse({
				message: "List Container",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }
    
    static async billingRepair(req, res, next) {
        let { prcode, clength, ctcode, condition } = req.query;
        try {
			let datas = await container_process.sequelize.query(
				`
				SELECT 
					cpid, crno, cpdepo, spdepo, cpcust, cpcust1, cpopr, cpopr1, 
					cpichrgbb, cpipaidbb, cpicurr, cpirate, cpivbb, cpilofopr, cpiinterdate, 
					cpiinterno, cpiorderno, cpiprano, cpireceptno, cpipratgl, cpitgl, onhiredate, 
					offhiredate, manufdate, cpilocon, cpolocon, cpijam, cpistatus, cpideliver, 
					cpidisdat, cpidish, cpidishjam, cpieir, cpiterm, cpife, cpicargo, cpiprin, cpidpp, 
					cpidppinout, cpiseal, cpives, cpitruck, cpinopol, cpishold, cpiremark, cpiremark1, 
					cpiflgprt, cpirefin, cpicrton, cpicrtby, cpimdfon, cpimdfby, cpochrgbm, cpopaidbm, 
					cpocurr, cporate, cpovbm, cpolonopr, cpoorderno, cpoprano, cporeceptno, cpopratgl, 
					cpotgl, cpojam, cpostatus, cporeceiv, cpoload, cpoloaddat, cpoloadjam, cpoterm, cpofe, 
					cpocargo, cpoprin, cpodpp, cpodppinout, cposeal, cpoves, cpotruck, cponopol, cporemark, 
					cpoflgprt, cpoeir, cporefout, cpocrton, cpocrtby, cpomdfon, cpomdfby, cpivoy, cpovoy, 
					cpiceir, cpoceir, cpholdon, cpholdby, cpreleaseon, cpreleaby, dpcode, sdcode, cpidriver, 
					cpodriver, cpivoyid, cpovoyid, cpodesti, cpinotes, cponotes, svsurdat, syid, liftoncharge, 
					liftoffcharge, gtcond, wastuff, wastrip, securityinid, securityinname, securityindatetime, 
					securityoutid, securityoutname, securityoutdatetime 
				FROM container_process 
				WHERE 1
				LIMIT 1,5
				`,
				{
					type: container_process.SELECT,
				}
			);
			baseResponse({
				message: "List Container",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }
	static async billingReposition(req, res, next) {
        let { prcode, clength, ctcode, condition } = req.query;
        try {
			let datas = await container_process.sequelize.query(
				`
				SELECT 
					cpid, crno, cpdepo, spdepo, cpcust, cpcust1, cpopr, cpopr1, 
					cpichrgbb, cpipaidbb, cpicurr, cpirate, cpivbb, cpilofopr, cpiinterdate, 
					cpiinterno, cpiorderno, cpiprano, cpireceptno, cpipratgl, cpitgl, onhiredate, 
					offhiredate, manufdate, cpilocon, cpolocon, cpijam, cpistatus, cpideliver, 
					cpidisdat, cpidish, cpidishjam, cpieir, cpiterm, cpife, cpicargo, cpiprin, cpidpp, 
					cpidppinout, cpiseal, cpives, cpitruck, cpinopol, cpishold, cpiremark, cpiremark1, 
					cpiflgprt, cpirefin, cpicrton, cpicrtby, cpimdfon, cpimdfby, cpochrgbm, cpopaidbm, 
					cpocurr, cporate, cpovbm, cpolonopr, cpoorderno, cpoprano, cporeceptno, cpopratgl, 
					cpotgl, cpojam, cpostatus, cporeceiv, cpoload, cpoloaddat, cpoloadjam, cpoterm, cpofe, 
					cpocargo, cpoprin, cpodpp, cpodppinout, cposeal, cpoves, cpotruck, cponopol, cporemark, 
					cpoflgprt, cpoeir, cporefout, cpocrton, cpocrtby, cpomdfon, cpomdfby, cpivoy, cpovoy, 
					cpiceir, cpoceir, cpholdon, cpholdby, cpreleaseon, cpreleaby, dpcode, sdcode, cpidriver, 
					cpodriver, cpivoyid, cpovoyid, cpodesti, cpinotes, cponotes, svsurdat, syid, liftoncharge, 
					liftoffcharge, gtcond, wastuff, wastrip, securityinid, securityinname, securityindatetime, 
					securityoutid, securityoutname, securityoutdatetime 
				FROM container_process 
				WHERE 1
				LIMIT 1,5
				`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "List Container",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }

	static async laporanBongkar(req, res, next) {
		let { cpives, cpitgl1, cpitgl2, cpideliver } = req.query;
		let cpives1     = cpives     == "" ? "" : "  and cp.cpives= '"+cpives+"' " ;


		try {
			let datas = await container_process.sequelize.query(
				`
					SELECT  cp.cpives ,cp.cpivoyid,cp.cpirefin,
							cp.crno, cn.cccode,cc.ctcode, cc.cclength, cc.ccheight,
							cp.cpitgl, cp.cpijam, cp.cpopr,cp.cpideliver
					FROM container_process cp
							 left join tblcontainer       cn on cp.crno=cn.crno
							 left join tblcontainer_code  cc on cn.cccode= cc.cccode
					WHERE 1
					  ${cpives1}
					  and cpitgl BETWEEN  '${cpitgl1}' and '${cpitgl2}'
					  and cp.cpideliver = '${cpideliver}'
					 order by cp.cpives ,cp.cpivoyid,cp.cpirefin, cp.cpitgl, cp.cpijam	
					`
				,
				{
					type: container_process.SELECT,
				}
			);

			let resultData    = datas[0];

			baseResponse({
				message: "Laporan Bongkar",
				data: { resultData },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async laporanMuat(req, res, next) {
		let { cpives, cpitgl1, cpitgl2, cporeceiv } = req.query;
		let cpives1     = cpives     == "" ? "" : "  and cp.cpoves= '"+cpives+"' " ;
		try {
			let datas = await container_process.sequelize.query(
				`
					SELECT  cp.cpoves ,cp.cpovoyid,cp.cporefout,
							cp.crno, cn.cccode,cc.ctcode, cc.cclength, cc.ccheight,
							cp.cpotgl, cp.cpojam, cp.cpopr1 cpopr,cp.cporeceiv
					FROM container_process cp
							 left join tblcontainer       cn on cp.crno=cn.crno
							 left join tblcontainer_code  cc on cn.cccode= cc.cccode
					WHERE 1
					  ${cpives1}
					  and cpotgl BETWEEN  '${cpitgl1}' and '${cpitgl2}'
					  and cp.cporeceiv = '${cporeceiv}'
					order by cp.cpoves ,cp.cpovoyid,cp.cporefout, cp.cpotgl, cp.cpojam
				`,
				{
					type: container_process.SELECT,
				}
			);

			let resultData    = datas[0];

			baseResponse({
				message: "Laporan Muat",
				data: { resultData },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async reportSecurity(req, res, next) {
		let { tgl1, tgl2} = req.query;
		try {
			let datas = await container_process.sequelize.query(
				`
					SELECT sp.cpid,  cp.crno,sp.securityinid, sp.securityname, sp.securitydatetime ,
						   (case
								when sp.securitytype = 1 then 'IN'
								when sp.securitytype = 2 then 'OUT'
							   end) as gate,
						   (case
								when sp.securitytype = 1 then cp.cpinopol
								when sp.securitytype = 2 then (
									case
										when (cp.cponopol is null or cp.cponopol  ="") then cp.cpinopol
										else cp.cponopol
										end	)
							   end) as nopol,
						   (case
								when sp.securitytype = 1 then ''
								when sp.securitytype = 2 then cposeal
							   end) as seal
					FROM security_process sp
							 left join container_process cp on cp.cpid = sp.cpid
					where DATE_FORMAT(sp.securitydatetime, '%Y-%m-%d')  between '${tgl1}' and '${tgl2}'
					order by sp.cpid,sp.securitydatetime  asc
				`,
				{
					type: container_process.SELECT,
				}
			);

			let resultData    = datas[0];

			baseResponse({
				message: "Report Security",
				data: { resultData },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async rptKwitansi(req, res, next){
		let { tgl1, tgl2} = req.query;
		try {
			let datas = await container_process.sequelize.query(
				`
					SELECT DISTINCT a.cpiorderno, c.cpopr, c.cpcust, a.cpidish, a.cpidisdat, a.liftoffcharge,
									a.cpdepo, a.cpipratgl,a.praid, a.cpirefin, a.cpijam, a.cpivoyid, a.cpives, a.cpicargo,
									a.cpideliver, a.cpilunas, a.totalcharge, b.cpireceptno,
									b.tot_lolo, b.biaya_cleaning, b.biaya_adm,
									b.total_pajak, b.materai, b.total_tagihan, b.totbiaya_lain, b.totpph23, b.receptdate
					FROM order_pra a , order_pra_recept b, order_pra_container c
					WHERE 1 and a.praid = b.praid and  a.praid = c.praid
					  and b.cpireceptno != '-' and b.receptdate BETWEEN '${tgl1}' AND '${tgl2}'
					order by cpiorderno
					`,
				{
					type: container_process.SELECT,
				}
			);

			let resultData    = datas[0];
			baseResponse({
				message: "Report Kwitansi",
				data: { resultData },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

}

module.exports = ReportsController;