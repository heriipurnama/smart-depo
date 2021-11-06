"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");

class InventoryContainerInController {
	static async list(req, res, next) {
		let { prcode, clength, ctcode, condition, limit, offset } = req.body;
		let $prcode = prcode == "" ? "" : "cp.cpopr='" + prcode + "' and";
		let $clength = clength == "" ? "" : " cc.cclength='" + clength + "' and";
		let $ctcode = ctcode == "" ? "" : " cc.ctcode='" + ctcode + "' and";
		let $condition =
			condition == "" ? "" : " con.crlastcond='" + condition + "' and";
		let $limit = limit == "" ? "" : ` limit ${limit}`;
		let $offset = offset == "" ? "" : ` offset ${offset}`;

		try {
			let datas = await container_process.sequelize.query(
				`select sur.svcond                                                           as conditions,
                ANY_VALUE(case when cc.cclength = 20 then count(cp.crno) else 0 end) as size_20,
                ANY_VALUE(case when cc.cclength = 40 and cc.ccheight <> 9.6 then count(cp.crno) else 0 end)                                            as std,
                ANY_VALUE(case when (cc.cclength = 40 and cc.ccheight = 9.6) or cc.cclength = 45 then count(cp.crno) else 0 end)                                            as hc
            from container_process cp
                left join container_survey sur on sur.cpid = cp.cpid
                left join tblcontainer con on con.crno = cp.crno
                left join tblcontainer_code cc on cc.cccode = con.cccode
            where 
                ${$prcode}  
                ${$clength}
                ${$ctcode}
                ${$condition}
                cp.cpotgl is null
                and sur.svtype='IN'
                group by sur.svcond
            ${$limit} ${$offset}`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "List Inventories Container In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}
module.exports = InventoryContainerInController;
