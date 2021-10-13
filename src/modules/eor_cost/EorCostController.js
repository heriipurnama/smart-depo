"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_repair } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class EorCostController {

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
            let datas = await container_repair.sequelize.query(`SELECT SUM(rd.RDTOTALA) AS TOTAL
                FROM container_repair rp
                INNER JOIN container_repair_detail rd ON rp.SVID = rd.SVID and rp.RPVER=rd.RDNO
                INNER JOIN tblrepair_method rm ON rd.RDREPMTD  = rm.RMCODE  
                INNER JOIN container_survey sv ON sv.SVID = rp.SVID
                INNER JOIN tblcurrency curr ON rd.RDCURR = curr.tucode
                WHERE rp.RPCRNO = tblcontainer.CRNO and rd.SVID= container_repair.SVID and rd.RDNO= container_repair.RPVER and rd.RDAPP=1 and rd.RDCURR='002' 
                `, 
                {
                    type: container_repair.SELECT
                }
            );
            
			baseResponse({ message: "List Eor Cost", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = EorCostController;