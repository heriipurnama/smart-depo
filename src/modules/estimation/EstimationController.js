"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class SurveyController {

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
            let datas = await container_process.sequelize.query(`SELECT rp.RPVER,pr.PRCODE,rp.RPCRNO,surv.SVID,DATE_FORMAT( surv.SVSURDAT, '%d/%m/%Y' ) AS SVSURDAT,DATE_FORMAT( cp.CPITGL, '%d/%m/%Y' ) AS CPITGL,rp.RPNOEST, surv.SVCOND, DATE_FORMAT( rp.RPTGLEST,'%d/%m/%Y') as RPTGLEST
                FROM 
                container_process cp INNER JOIN tblcontainer con ON
                cp.CRNO = con.CRNO
                INNER JOIN container_survey surv ON
                surv.CPID = cp.CPID
                INNER JOIN container_repair rp ON
                rp.SVID = surv.SVID
                LEFT JOIN tblprincipal pr ON
                pr.PRCODE = cp.CPOPR Where surv.TYPE='1' ORDER BY rp.RPNOEST desc
                `, 
                {
                    type: container_process.SELECT
                }
            );
            
			baseResponse({ message: "List Estimation", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = SurveyController;