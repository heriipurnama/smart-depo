"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class SumContTypeController {

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
        let datas = await container_process.sequelize.query(`select 
        case when con.crlastcond is null then 'waiting survey' else 
            case when con.crlastcond in ('AC','AU','AX') then 'available' else 'damage' end end as crlastcond, 
        case when cc.cclength=20 and cc.ccheight < 9 and cc.ctcode<>'rf' then count(cp.crno) end as c20,
        case when cc.cclength=40 and cc.ccheight < 9 and cc.ctcode<>'rf' then count(cp.crno) end as c40,
        case when cc.ccheight > 9 or cc.cclength=45 then count(cp.crno) end as chc,
        case when cc.cclength=20 and cc.ccheight < 9 and cc.ctcode='rf' then count(cp.crno) end as cr20,
        case when cc.cclength=40 and cc.ccheight < 9 and cc.ctcode='rf' then count(cp.crno) end  as r40,
        cc.cccode as ctype
    from container_process cp 
        inner join tblcontainer con on con.crcpid = cp.cpid
        left join tblcontainer_code cc on cc.cccode = con.cccode 
    where  
        cp.cpopr='".getparam("prcode","")."'
        and (cp.cpotgl is null or cp.cpotgl='0000-00-00') 
        and con.crlastact<>'OD' and con.crlastact<>'BI' 
        and cp.crno is not null
    group by case when con.crlastcond in ('AC','AU','AX') then 'available' else 
        case when con.crlastcond in ('DN','DJ') then 'damage' else 'waiting survey' end end, ctype`, 
            {
                type: container_process.SELECT
            }
            );
            
			baseResponse({ message: "List Summary Per Container Type", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = SumContTypeController;