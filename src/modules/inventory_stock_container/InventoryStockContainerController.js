"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container } = require("../../db/models");

class InventoryStockContainerController {
	static async list(req, res, next) {
		let { prcode, clength, ctcode, condition, limit, offset } = req.body;
		let $prcode = prcode == "" ? "" : "cp.cpopr='" + prcode + "' and";
		let $clength = clength == "" ? "" : " cc.cclength='" + clength + "' and";
		let $ctcode = ctcode == "" ? "" : " cc.ctcode='" + ctcode + "' and";
		let $condition =
			condition == "" ? "" : " left con.crlastcond='" + condition + "' and";
		let $limit = limit == "" ? "" : ` limit ${limit}`;
		let $offset = offset == "" ? "" : ` offset ${offset}`;

		try {
			let datas = await container.sequelize.query(
				`select con.crlastcond as conditions,
                ANY_VALUE(case when cc.cclength = 20 then count(cp.crno) end) as size_20,
                ANY_VALUE(case when cc.cclength = 40 and cc.ccheight <> 9.6 then count(cp.crno) end) as std,
                ANY_VALUE(case when (cc.cclength = 40 and cc.ccheight = 9.6) or cc.cclength = 45 then count(cp.crno) end) as hc
            from tblcontainer con
                left join container_process cp on con.crcpid = cp.cpid
                left join container_survey sur on sur.cpid = cp.cpid
                left join tblcontainer_code cc on cc.ctcode = con.mtcode
                left join tblvoyage voy on voy.voyid = cp.cpivoyid
            where
                ${$prcode}  
                ${$clength}
                ${$ctcode}
                ${$condition}
                (cp.cpotgl= null
                or cp.cpotgl='0000-00-00')
                group by conditions
            ${$limit} ${$offset}`,
				{
					type: container.SELECT,
				}
			);

			baseResponse({
				message: "List Inventories Stock Container",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}
module.exports = InventoryStockContainerController;
