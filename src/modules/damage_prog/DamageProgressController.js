"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");

class DamageProgressController {
	static async list(req, res, next) {
		//Date == YYYY-MM-DD
		let { day } = req.body;
		let $where;
		let $days =
			day == ""
				? ""
				: "dp.cpitgl >= date_sub(curdate(),interval " + day + " day) ";
		if ($days) {
			$where = `where and ${$days}`;
		} else if ($days == "") {
			$where = " where ";
			// eslint-disable-next-line no-dupe-else-if
		} else if ($days > "" && $days) {
			$where = ` where ${$days}`;
		}

		try {
			let datas = await container_process.sequelize.query(
				`select opr,
                sum(ws_20) as ws_20,
                sum(ws_40) as ws_40,
                sum(ws_hc) as ws_hc,
                sum(ws_r20) as ws_r20,
                sum(ws_r40) as ws_r40,
                
                sum(we_20) as we_20,
                sum(we_40) as we_40,
                sum(we_hc) as we_hc,
                sum(we_r20) as we_r20,
                sum(we_r40) as we_r40,
                
                sum(wa_20) as wa_20,
                sum(wa_40) as wa_40,
                sum(wa_hc) as wa_hc,
                sum(wa_r20) as wa_r20,
                sum(wa_r40) as wa_r40,
                
                sum(ww_20) as ww_20,
                sum(ww_40) as ww_40,
                sum(ww_hc) as ww_hc,
                sum(ww_r20) as ww_r20,
                sum(ww_r40) as ww_r40,
                
                sum(wr_20) as wr_20,
                sum(wr_40) as wr_40,
                sum(wr_hc) as wr_hc,
                sum(wr_r20) as wr_r20,
                sum(wr_r40) as wr_r40,
                
                sum(iw_20) as iw_20,
                sum(iw_40) as iw_40,
                sum(iw_hc) as iw_hc,
                sum(iw_r20) as iw_r20,
                sum(iw_r40) as iw_r40,
                
                sum(cr_20) as cr_20,
                sum(cr_40) as cr_40,
                sum(cr_hc) as cr_hc,
                sum(cr_r20) as cr_r20,
                sum(cr_r40) as cr_r40,
                        
                sum(ti_20) as ti_20,
                sum(ti_40) as ti_40,
                sum(ti_hc) as ti_hc,
                sum(ti_r20) as ti_r20,
                sum(ti_r40) as ti_r40
            from rpt_damage_progress dp	
            ${$where}
            group by opr`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({ message: "List Damage Progress", data: { datas } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = DamageProgressController;
