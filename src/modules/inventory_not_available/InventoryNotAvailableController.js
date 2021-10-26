"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class InventoryNotAvailableController {

	static async list(req, res, next) {
		let {prcode, limit, offset} = req.body;
		let $limit = (limit=="")? `` : ` limit ${limit}`;
        let $offset = (offset=="")? `` : ` offset ${offset}`;

		try {
            let datas = await container_process.sequelize.query(`select 
			distinct 
			cp.crno as container_no,
			cc.ctcode as ctype,
			cp.cpideliver as deliverer,
			case when cc.cclength=20 then 1 else 0 end as size_20,
			case when cc.cclength=40 and cc.ccheight < 9 then 1 else 0 end as size_40,
			case when cc.ccheight >= 9 or cc.cclength=45 then 1 else 0 end as size_hc,
			date_format(cp.cpitgl,'%d-%m-%y') as in_depo_date,
			re.rptotalrcost+re.rptotalrlab as est_of_repair,
			date_format(re.rptglappvpr,'%d-%m-%y') as approval_date,
			re.rpnotesa as remarks, con.crlastact
		from container_process cp
			left join tblcontainer con on cp.cpid = con.crcpid
			left join tblcontainer_code cc on cc.cccode = con.cccode
			left join container_survey sur on sur.cpid = cp.cpid
			left join container_repair re on re.svid=sur.svid
		where  
			cp.cpopr='${prcode}' 
			and (con.crlastact='WA' or con.crlastact='WR' or con.crlastact='WS')
			and case when (con.crlastact='WA' or con.crlastact='WR') then 
					(sur.type='1' and left(con.crlastcond,1)='D') 
				else 1 end
			and cp.crno is not null
			and cc.ctcode is not null 
			and case when (con.crlastact='WA' or con.crlastact='WR') then
					concat(cp.crno, rpver) in (select concat(rpcrno, max(rpver)) from container_repair group by rpcrno)
				else 1 end
				order by con.crlastact, cp.crno,size_20, size_40, size_hc, in_depo_date, approval_date, est_of_repair, remarks 
				${$limit} ${$offset}`, 
            {
                type: container_process.SELECT
            }
            );
            
            baseResponse({ message: "List Inventory Not Available", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = InventoryNotAvailableController;