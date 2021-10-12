"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class ApprovalController {

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
        let datas = await container_process.sequelize.query(`SELECT con.CRNO,rp.RPVER,con.CRLASTACT,surv.SVID,pr.PRCODE, DATE_FORMAT( cp.CPITGL, '%d/%m/%Y' ) AS CPITGL, DATE_FORMAT( surv.SVSURDAT, '%d/%m/%Y' ) AS SVSURDAT, surv.SVCOND, cp.CPIEIR, rp.RPVER, rp.RPSTSAPPV,DATE_FORMAT( rp.RPTGLAPPVPR,'%d/%m/%Y') as RPTGLAPPVPR,rp.RPNOEST 
            FROM container_process cp INNER JOIN tblcontainer con ON
            cp.CPID = con.CRCPID
            INNER JOIN container_survey surv ON
                surv.CPID = cp.CPID
            INNER JOIN container_repair rp ON
                rp.SVID = surv.SVID
            LEFT JOIN tblprincipal pr ON
                pr.PRCODE = cp.CPOPR
            Where surv.TYPE='1' AND con.CRLASTACT in('WA','WW','IW','RP','CR','OW','CP','WR') and rp.RPFINALEST='1' ORDER BY surv.SVSURDAT desc 
            `, 
            {
                type: container_process.SELECT
            }
            );
            
			baseResponse({ message: "List Approval", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = ApprovalController;