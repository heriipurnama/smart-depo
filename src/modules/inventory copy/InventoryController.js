"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");

class InventoryController {
	static async list(req, res, next) {
		let { prcode, clength, ctcode, condition, sdcode, limit, offset } =
			req.body;
		let $sdcode = sdcode == "" ? "" : " cp.cpdepo='" + sdcode + "' and";
		let $prcode = prcode == "" ? "" : " cp.cpopr='" + prcode + "' and";
		let $clength =
			clength == ""
				? ""
				: clength == "hc"
					? "(cc.ccheight > '9' or cc.cclength='45' ) and "
					: "(cc.cclength='" + clength + "' and cc.ccheight < '9' ) and ";
		let $ctcode = ctcode == "" ? "" : " cc.ctcode='" + ctcode + "' and";
		let $condition =
			condition == ""
				? ""
				: " left(con.crlastcond,1) =left('" + condition + "',1) and";
		let $limit = limit == "" ? "" : ` limit ${limit}`;
		let $offset = offset == "" ? "" : ` offset ${offset}`;

		try {
			let datas = await container_process.sequelize.query(
				`select distinct cpdepo, cpopr, dpname,
                cp.crno as container_no, cc.cccode as id_code, cc.ctcode as ctype, cc.cclength as clength, cc.ccheight as cheight,
                vesid as ves, cpivoy as voy, date_format(cp.cpidisdat,'%d-%m-%y') as disch_date,
                datediff(now(), cp.cpidisdat) + 1 as dlq, date_format(cp.cpitgl,'%d-%m-%y') as date_in, 
                datediff(now(), cp.cpitgl) + 1 as days,
                con.crlastcond as status, cp.cpiremark as remarks,
                cr.retype, cr.retfrom, cr.readdr, cpiorderno
            from container_process cp
                inner join tblcontainer con on con.crcpid = cp.cpid
                left join order_container_repo cr on cr.reorderno=cp.cpiorderno
                left join tblcontainer_code cc on cc.cccode = con.cccode 
                left join tblvoyage voy on voy.voyid = cp.cpivoyid
                left join tbldepo d on d.dpcode= cp.cpdepo
            where 
                ${$sdcode} 
                ${$prcode}  
                ${$clength}
                ${$ctcode}
                ${$condition}
                (cp.cpotgl is null or cp.cpotgl='0000-00-00') 
                and con.crlastact<>'OD' and con.crlastact<>'BI' 
                and cp.crno is not null
            order by cpopr, dpname, id_code, days, con.crlastcond
            ${$limit} ${$offset}`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({ message: "List Inventories", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = InventoryController;
