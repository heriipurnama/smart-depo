"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");

class StockContInventoryController {
	static async list(req, res, next) {
		let { prcode, clength, ctcode, condition, limit, offset } = req.body;
		let $prcode = prcode == "" ? "" : " cp.cpopr='" + prcode + "' and";
		let $clength = clength == "" ? "" : " cc.cclength='" + clength + "' and";
		let $ctcode = ctcode == "" ? "" : " cc.ctcode='" + ctcode + "' and";
		let $condition =
			condition == "" ? "" : " con.crlastcond='" + condition + "' and";
		let $limit = limit == "" ? "" : ` limit ${limit}`;
		let $offset = offset == "" ? "" : ` offset ${offset}`;

		try {
			let datas = await container_process.sequelize.query(
				`select 
                con.crlastact as conditions,
                case when cc.cclength=20 then count(cp.crno) end as size_20,
                case when cc.cclength=40 and cc.ccheight<>9.6 then count(cp.crno) end as std,
                case when (cc.cclength=40 and cc.ccheight=9.6) or cc.cclength=45 then count(cp.crno) end as hc,
                cpopr, cpdepo
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
            group by cpopr, cpdepo, con.crlastact, cc.cclength, cc.ccheight ${$limit} ${$offset}`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "List Status Stock Container Inventory",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = StockContInventoryController;
