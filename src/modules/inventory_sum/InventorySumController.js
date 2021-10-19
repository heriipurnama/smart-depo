"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class InventorySumController {

	static async list(req, res, next) {
        let {prcode, clength, ctcode, condition, sdcode, start, rows} = req.body;
        let $sdcode = (sdcode=="")? `` : ` cp.cpdepo='`+sdcode+`' and`;
        let $prcode = (prcode=="")? `` : ` cp.cpopr='`+prcode+`' and`;
        let $clength = (clength=="")? `` : ((clength=="hc")? `(cc.ccheight > '9' or cc.cclength='45' ) and ` : `(cc.cclength='`+clength+`' and cc.ccheight < '9' ) and `);
        let $ctcode = (ctcode=="")? `` : ` cc.ctcode='`+ctcode+`' and`;
        let $condition = (condition=="")? `` : ` left(con.crlastcond,1) =left('`+condition+`',1) and`;

		try {
            let datas = await container_process.sequelize.query(`select sdname as cpdepo,  dpname, cpopr, 
                cc.ctcode as ctype, cc.cclength as clength, cc.ccheight as cheight, 
                sum(case when cc.cclength=20 then 1 else 1 end) as box,
                sum(case when cc.cclength=20 then 1 else 2 end) as box_teus,
                sum(case when left(con.crlastcond,1)='A' then 1 else 0 end) as av,
                sum(case when left(con.crlastcond,1)='A' then (case when cc.cclength=20 then 1 else 2 end) else 0 end) as av_teus,
                sum(case when left(con.crlastcond,1)='D' then 1 else 0 end) as dmg,
                sum(case when left(con.crlastcond,1)='D' then (case when cc.cclength=20 then 1 else 2 end) else 0 end) as dmg_teus,
                sum(case when con.crlastact ='WS' then 1 else 0 end) as w_s,
                sum(case when con.crlastact ='WS' then (case when cc.cclength=20 then 1 else 2 end) else 0 end) as w_s_teus
            from container_process cp
                inner join tblcontainer con on con.crcpid = cp.cpid
                left join tblcontainer_code cc on cc.cccode = con.cccode 
                left join tblsubdepo sd on sd.sdcode=cp.spdepo
                left join tbldepo d on d.dpcode=cp.cpdepo
            where  
                ${$sdcode}  
                ${$prcode}  
                ${$clength} 
                ${$ctcode}
                ${$condition} 
                (cp.cpotgl is null or cp.cpotgl='0000-00-00')
                and con.crlastact<>'OD' and con.crlastact<>'BI'
                and cp.crno is not null
            group by cpopr, sdname, ctype, clength, cheight`, 
            {
                type: container_process.SELECT
            }
            );
            
            baseResponse({ message: "List Inventory Sum", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = InventorySumController;