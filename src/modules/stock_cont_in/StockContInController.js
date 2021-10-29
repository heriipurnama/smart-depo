"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");

class StockContInController {
	static async list(req, res, next) {
		//Date == YYYY-MM-DD
		let { prcode, date, hour_from, hour_to, offset, limit } = req.body;
		let lmt = limit == "" ? "" : ` limit ${limit}`;
		let ofs = offset == "" ? "" : ` offset ${offset}`;
		let jamFrom = "",
			jamTo = "";
		if (hour_from) {
			jamFrom = "and cp.cpojam>='" + hour_from + "'";
		}

		if (hour_to) {
			jamTo = "and cp.cpojam>='" + hour_to + "'";
		}

		try {
			let datas = await container_process.sequelize.query(
				`select 
                con.crlastact as status, 
                case when cc.cclength=20 then count(cp.crno) else 0 end as size_20,
                case when cc.cclength=40 and cc.cclength<>9.6 then count(cp.crno) else 0 end as std,
                case when (cc.cclength=40 and cc.ccheight=9.6) or cc.cclength=45
                    then count(cp.crno) else 0 end as hc
            from container_process cp 
                left join tblcontainer con on con.crno = cp.crno
                left join container_survey sur on sur.cpid = cp.cpid
                left join tblcontainer_code cc on cc.cccode = con.cccode
                left join tblvoyage voy on voy.voyid = cp.cpivoyid
            where cp.spdepo=".." 
                and cp.cpopr='${prcode}'   
                and cp.cpitgl='${date}'
                ${jamFrom}
                ${jamTo} 
                and cp.cpistatus<>'OF'
                and sur.svtype='IN'
            group by con.crlastact cc.cclength, cc.ccheight ${lmt} ${ofs}`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "List Status Stock Container In",
				data: { datas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = StockContInController;
