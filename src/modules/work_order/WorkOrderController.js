"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class WorkOrderController {
	static async list(req, res, next) {

        let {limit, offset} = req.body;
        let $limit = (limit == "")?`` :`limit ${limit}`;
        let $offset = (offset == "")?`` :`offset ${offset}`;

		try {
			let datas = await container_process.sequelize.query(
				`Select WO.WONO,WO.WOOPR,WO.WODATE,RP.RPCRNO,CP.CPOPR,CP.CPID FROM
        container_process CP INNER JOIN tblcontainer CON ON
        CP.CPID = CON.CRCPID
           INNER JOIN container_survey SV ON
          SV.CPID = CP.CPID
           INNER JOIN  container_repair RP ON
          RP.SVID = SV.SVID
           INNER JOIN container_cfs_work_order WO ON
          WO.WONO = RP.WONO

       WHERE SV.TYPE='2' AND CON.CRLASTACTE in('WW','IW','RP','CR','OW','CP','WR') 
       AND LEFT(WO.WONO,2)='WE' ${$limit} ${$offset}
            `, 
            {
                type: container_process.SELECT
            }
            );
            
			baseResponse({ message: "List Work Order", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = WorkOrderController;
