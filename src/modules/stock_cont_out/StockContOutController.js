"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class SumContTypeController {

	static async list(req, res, next) {
        //date = YYYY-MM-DD
        let {prcode, date, hour_from, hour_to, limit, offset} = req.body;
        let jamFrom =``, jamTo =``;
        let lmt = (limit == ""?``:` limit ${limit}`);
        let ofs = (offset == ""?``:` offset ${offset}`);
        if (hour_from){
            jamFrom=`and cp.cpojam>='`+hour_from+`'`;
        }

        if (hour_to){
            jamTo=`and cp.cpojam>='`+hour_to+`'`;
        }

		try {
        let datas = await container_process.sequelize.query(`select 
        con.crlastact as status, 
        case when cc.cclength=20 then count(cp.crno) else 0 end as size_20,
        case when cc.cclength=40 and cc.cclength<>9.6 then count(cp.crno) else 0 end as std,
        case when (cc.cclength=40 and cc.ccheight=9.6) or cc.cclength=45 then count(cp.crno) else 0 end as hc
        from container_process cp
            left join tblvoyage voy on voy.voyid = cp.cpovoyid
            left join container_survey sur on sur.cpid = cp.cpid
            left join tblcontainer con on con.crno = cp.crno
            left join tblcontainer_code cc on cc.cccode = con.cccode 
        where cp.cpopr1='${prcode}' 
            and cp.cpotgl='${date}' 
            ${jamFrom} 
            ${jamTo} 
            and cp.cpistatus<>'ON'
        group by con.crlastact,  cp.sdcode, cp.cpopr1, cp.cpotgl, cp.cpistatus, cc.ccheight, cc.cclength
        ${lmt} ${ofs}`, 
            {
                type: container_process.SELECT
            }
            );
            
			baseResponse({ message: "List Status Stock Container Out", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = SumContTypeController;