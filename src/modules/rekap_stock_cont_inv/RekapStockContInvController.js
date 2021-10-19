"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class RekapStockContInvController {

	static async list(req, res, next) {
        let {prcode, clength, ctcode, condition, start, rows} = req.body;
        let $prcode = (prcode=="")? `` : ` cp.cpopr='`+prcode+`' and`;
        let $clength = (clength=="")? `` : ` cc.cclength='`+clength+`' and`;
        let $ctcode = (ctcode=="")? `` : ` cc.ctcode='`+ctcode+`' and`;
        let $condition = (condition=="")? `` : ` con.crlastcond='`+condition+`' and`;

		try {
            let datas = await container_process.sequelize.query(`select 
                    con.crlastcond as conditions,
                    cc.ctcode as ctype,
                    case when cc.cclength=20 then count(cp.crno) end as size_20,
                    case when cc.cclength=40 and cc.ccheight<>9.6 then count(cp.crno) end as std,
                    case when (cc.cclength=40 and cc.ccheight=9.6) or cc.cclength=45 then count(cp.crno) end as hc
                from container_process cp 
                    left join tblcontainer con on con.crno = cp.crno
                    left join container_survey sur on sur.cpid = cp.cpid
                    inner join tblcontainer_code cc on cc.cccode = con.cccode 
                    inner join tblvoyage voy on voy.voyid = cp.cpivoyid
                where  
                    ${$prcode}  
                    ${$clength} 
                    ${$ctcode}
                    ${$condition} 
                    (cp.cpotgl is null or cp.cpotgl='0000-00-00')
                group by conditions, ctype`, 
                {
                    type: container_process.SELECT
                }
                );
                
                baseResponse({ message: "List Rekap Stock Container Inventory", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = RekapStockContInvController;