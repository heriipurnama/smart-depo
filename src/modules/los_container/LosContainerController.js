"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class LosContainerController {

	static async list(req, res, next) {
        let {prcode, clength, ctcode, condition, los, limit, offset} = req.body;
        let $prcode = (prcode=="")? `` : ` cp.cpopr='`+prcode+`' and`;
        let $los = (los=="")? `` : `(datediff(now(), cp.cpitgl) + 1 ) >=`+los+` and `;
        let $clength = (clength=="")? `` : ((clength=="hc")? `(cc.ccheight > '9' or cc.cclength='45' ) and ` : `(cc.cclength='`+clength+`' and cc.ccheight < '9' ) and `);
        let $ctcode = (ctcode=="")? `` : ` cc.ctcode='`+ctcode+`' and`;
        let $condition = (condition=="")? `` : ` left(con.crlastcond,1) =left('`+condition+`',1) and`;
        let $limit = (limit=="")? `` : ` limit ${limit}`;
        let $offset = (offset=="")? `` : ` offset ${offset}`;

		try {
            let datas = await container_process.sequelize.query(`select 
                    distinct dep.dpname, cp.cpives as ves_voy, 
                    cp.crno as cno, 
                    cc.ctcode as ctype, 
                    cc.cclength as clength, 
                    cc.ccheight as cheight, 
                    cp.cpitgl as in_depo, 
                    datediff(now(), cp.cpitgl) + 1 as days,
                    con.crlastcond as cond, 
                    con.crlastact as cstatus, 
                    cp.cpiremark as remarks, cpopr
                from container_process cp
                    left join tblcontainer con on con.crno = cp.crno
                    left join tblcontainer_code cc on cc.cccode = con.cccode
                    left join tblvoyage voy on voy.voyid = cp.cpivoyid
                    left join tbldepo dep on dep.dpcode = cp.cpdepo
                where 
                    ${$prcode} 
                    ${$los} 
                    ${$clength} 
                    ${$ctcode} 
                    ${$condition} 
                    cp.cpotgl is null
                    and cp.crno is not null
                    and con.crlastact<>'BI'
                order by cpopr ${$limit} ${$offset}`, 
                {
                    type: container_process.SELECT
                }
                );
                
                baseResponse({ message: "List Length Of Stay Container", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = LosContainerController;