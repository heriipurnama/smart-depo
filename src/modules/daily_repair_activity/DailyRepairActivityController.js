"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class DailyRepairActivityController {
	static async list(req, res, next) {
		//Date == YYYY-MM-DD
		let { date, prcode, limit, offset } = req.body;
		let opr = prcode == "" ? "" : "cp.cpopr='" + prcode + "' and ";
		let $limit = limit == "" ? "" : ` limit ${limit}`;
		let $offset = offset == "" ? "" : ` offset ${offset}`;

		try {
			let datas = await container_process.sequelize.query(
				`select  
            cp.cpdepo, cp.cpopr, t.dpcode, t.dpname as dpname,
            cp.cpcust as cust, cp.cpopr as opr, cp.crno as container,
            case when cc.cclength=20 then 1 else 0 end as size_20,
            case when cc.cclength=40 then 1 else 0 end as size_40,
            cc.ctcode as ctype, 
            date_format(rep.rptglappvpr, '%d-%m-%y') as appv, 
            date_format(rep.rpmridat, '%d-%m-%y') as in_w_s,
            date_format(rep.rpdrepair, '%d-%m-%y') as dw_start, 
            date_format(rep.rptglwroke, '%d-%m-%y') as dw_finish,
            date_format(rep.rpmrodat, '%d-%m-%y') as out_w_s, 
            sum(rep_det.rdmhra) as mhr, sum(rep_det.rdlaba) as labour, 
            case when rep.rptotalrmhr <= 10 then rep.rptotalrmhr else 0 end as tod_mm, 
            case when rep.rptotalrmhr > 10 and rep.rptotalrmhr <= 25 then rep.rptotalrmhr else 0 end as tod_md,
            case when rep.rptotalrmhr > 25 then rep.rptotalrmhr else 0 end as tod_mj,
            '-' as revenue,
            '-' as remarks
            from container_process cp
                left join tblvoyage voy on voy.voyid = cp.cpivoyid
                left join container_survey sur on sur.cpid = cp.cpid
                left join container_repair rep on rep.svid = sur.svid
                left join container_repair_detail rep_det on rep_det.svid = rep.svid
                left join tblcontainer con on con.crno = cp.crno
                left join tblcontainer_code cc on cc.cccode = con.cccode
                left join tbldepo t on t.dpcode=cp.cpdepo
            where  ${opr}
                (	(date_format(rep.rpmrodat, '%y-%m-%d')='${date}' and
                    date_format(rep.rpclodat, '%y-%m-%d')='0000-00-00'
                        )			
                    or 
                    (date_format(rep.rpclodat, '%y-%m-%d')='${date}' and
                    date_format(rep.rpmrodat, '%y-%m-%d')<>'0000-00-00'
                        )
                    )
                and (rep.rpfictive is null or rep.rpfictive='')
            group by
                cust, cp.cpdepo, cp.cpopr, cp.crno, cc.cclength, cc.ctcode, appv, rep.rpmridat,
                rep.rpdrepair, rep.rptglwroke, rep.rpmrodat, rep.rptotalrmhr,t.dpcode, t.dpname
            ${$limit} ${$offset}`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({ message: "List Daily Repair Activity", data: { datas } })(
				res,
				200
			);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = DailyRepairActivityController;
