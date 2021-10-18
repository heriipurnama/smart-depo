"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class DailyMovementOutMscController {

	static async list(req, res, next) {
        //Date == YYYY-MM-DD
        let {date, prcode, hour_from, hour_to, start, rows} = req.body;
        let jamFrom = (hour_from=="")? `` : ` and cp.cpojam >='`+hour_from+`'`;
        let jamTo = (hour_to=="")? `` : ` and cp.cpojam >='`+hour_to+`'`;

		try {
            let datas = await container_process.sequelize.query(`select  cp.crno as prefix, mid(cp.crno,5,6) as serial_no, right(cp.crno,1) as cd, cc.cclength as size, cc.ctcode as cd_type, 
                case when svtype='IN' then sur.svcond end as in_cond, con.crweightk as payload, con.crmandat as date_mnfg,
                cp.cpitgl date_in, cp.cpives +' - '+ cp.cpivoy as ex_ves_voy, cp.cporefout as ro_date, cp.cpotgl as date_out,
                cp.cpojam as time_out, cp.cporeceiv as emkl, cp.cpoves +' - '+ cp.cpovoy as next_ves_voy, cp.cpodesti as dest,
                cp.cponopol as truck_no, case when svtype='OU' then sur.svcond end as  out_cond, cp.cposeal as seal_no
            from container_process cp
                left join tblvoyage voy on voy.voyid = cp.cpivoyid
                left join container_survey sur on sur.cpid = cp.cpid
                left join tblcontainer con on con.crno = cp.crno
                left join tblcontainer_code cc on cc.cccode = con.cccode
            where cp.spdepo= 
                and cp.cpopr1='${prcode}' 
                and cp.cpotgl='${date}' 
                ${jamFrom}
                ${jamTo }
                and(cp.cpistatus<>'ON' or  cp.cpistatus is null)`, 
            {
                type: container_process.SELECT
            }
            );
            
            baseResponse({ message: "List Daily Movement Out MSC", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = DailyMovementOutMscController;