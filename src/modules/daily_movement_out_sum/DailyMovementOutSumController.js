"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class DailyMovementOutSumController {

	static async list(req, res, next) {
        //Date == YYYY-MM-DD
        let {date, date2, prcode, hour_from, hour_to, limit, offset} = req.body;
        let $prcode = (prcode=="")? `` : ` and cp.cpopr1='`+prcode+`' and`;
        let $hourFrom = (hour_from=="")? `` : ` and cp.cpojam>='`+hour_from+`' and`;
        let $hourTo = (hour_to=="")? `` : ` and cp.cpojam<='`+hour_to+`' and`;
        let $limit = (limit=="")? `` : ` limit ${limit}`;
        let $offset = (offset=="")? `` : ` offset ${offset}`;
        if (date){ 
            $date=` and year(cp.cpotgl) = right('`+date+`',4) and date_format(cp.cpotgl,'%d/%m/%y') >= '`+date+`' `;
        }else {
            $date= ` and cp.cpotgl='`+date+`' `;
        }

        if (date2){ 
            $date2 =` and date_format(cp.cpotgl,'%d/%m/%y') <= '`+date2+`"' `;
        }else {
            $date2 = ` and cp.cpotgl='`+date2+`' `;
        }

		try {
            let datas = await container_process.sequelize.query(`select cp.cpopr1, dep.dpname,
                cc.ctcode as type, 
                cc.cclength as cclength, 
                cc.ccheight as ccheight, 
                count(cp.crno) as box,
                case when left(con.crlastcond,1) ='A' then count(cp.crno) else 0 end as av, 
                case when left(con.crlastcond,1) ='D' then count(cp.crno) else 0 end as dmg,
                case when con.crlastcond is null then count(cp.crno) else 0 end as w_s
            from container_process cp
                left join container_survey sur on sur.cpid = cp.cpid
                left join tblcontainer con on con.crno = cp.crno
                left join tblcontainer_code cc on cc.cccode = con.cccode
                left join tbldepo dep on dep.dpcode = cp.cpdepo
            where 
                (cp.crno<>'' or cp.crno is not null )
                and (cp.cpostatus<>'ON' and cp.cpostatus<>'ns' and cp.cpostatus<>'nc' or cp.cpostatus is null)
                and cp.cpopr1 is not null
                ${$prcode}
                ${$hourFrom}
                ${$hourTo}
                ${$date}
                ${$date2}
            group by cc.ctcode, cp.cpopr1, cc.cclength, cc.ccheight, dep.dpname, con.crlastcond
            ${$limit} ${$offset}`, 
            {
                type: container_process.SELECT
            }
            );
            
            baseResponse({ message: "List Daily Movement Out Sum", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = DailyMovementOutSumController;