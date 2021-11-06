"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");

class DailyMovementInMscController {
	static async list(req, res, next) {
		//Date == YYYY-MM-DD
		let { date, prcode, hour_from, hour_to, limit, offset } = req.body;
		let jamFrom = hour_from == "" ? "" : " and cp.cpojam >='" + hour_from + "'";
		let jamTo = hour_to == "" ? "" : " and cp.cpojam >='" + hour_to + "'";
		let $limit = limit == "" ? "" : ` limit ${limit}`;
		let $offset = offset == "" ? "" : ` offset ${offset}`;

		try {
			let datas = await container_process.sequelize.query(
				`select cp.cpdepo, cp.cpopr, cp.crno as prefix,
                mid(cp.crno, 5, 6) as serial_no, right (cp.crno, 1) as cd, cc.cclength, cc.ctcode,
                sur.svcond, con.crweightk, date_format(con.crmandat, '%d-%m-%y') as crmandat,
                date_format(cp.cpitgl, '%d-%m-%y') as cpitgl, cp.cpijam, voy.vesid as cpives, voy.voyid as cpivoy, cp.cpideliver,
                cp.cpinopol, cp.cpirefin, con.crcsc
            from container_process cp
                left join tblcontainer con on con.crno = cp.crno
                left join container_survey sur on sur.cpid = cp.cpid
                left join tblcontainer_code cc on cc.cccode = con.cccode
                left join tblvoyage voy on voy.voyid = cp.cpivoyid
            where cp.cpopr1='${prcode}' 
                and cp.cpotgl='${date}' 
                ${jamFrom}
                ${jamTo}
                and(cp.cpistatus<>'OF')
                ${$limit} ${$offset}`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({ message: "List Daily Movement In MSC", data: { datas } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = DailyMovementInMscController;
