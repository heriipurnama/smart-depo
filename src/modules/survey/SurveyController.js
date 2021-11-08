"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_survey } = require("../../db/models");

class SurveyController {
	static async list(req, res, next) {
		let { limit, offset } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;

		try {
			let datas = await container_survey.sequelize.query(
				`select SVY.SVID,CON.CRNO,PR.PRCODE, 
                CASE CP.CPITGL WHEN DATE_FORMAT(CP.CPITGL,'%d/%m/%Y')='00/00/0000' THEN '' ELSE DATE_FORMAT(CP.CPITGL,'%d/%m/%Y') END AS CPITGL,
                DATE_FORMAT(SVY.SVSURDAT,'%d/%m/%Y') as SVSURDAT,SVY.SVCOND
                from tblcontainer CON 
                INNER JOIN container_process CP ON CON.CRCPID = CP.CPID
                INNER JOIN container_survey SVY ON CP.CPID=SVY.CPID
                LEFT JOIN tblprincipal PR ON PR.PRCODE = CP.CPOPR
                LEFT JOIN tbldebitur DEB ON PR.CUCODE = DEB.CUCODE
                LEFT JOIN tblcontainer_code CC ON CON.CCCODE = CC.CCCODE
                LEFT JOIN tblcontainer_leasing CL ON CL.LEORDERNO=CP.CPIPRANO
                LEFT JOIN tblmaterial MAT ON CON.MTCODE=MAT.MTCODE
                LEFT JOIN tbldepo DP ON CP.DPCODE=DP.DPCODE
                LEFT JOIN tblsubdepo SD ON CP.SDCODE = SD.SDCODE WHERE CON.CRLASTACT = 'WE' 
                ORDER BY SVY.SVID DESC
                LIMIT ${limits} OFFSET ${offsets}
                `,
				{
					type: container_survey.SELECT,
				}
			);

			let TotalDatas = await container_survey.sequelize.query(
				`SELECT count(*) As Total
				FROM tblcontainer CON 
                INNER JOIN container_process CP ON CON.CRCPID = CP.CPID
                INNER JOIN container_survey SVY ON CP.CPID=SVY.CPID
                LEFT JOIN tblprincipal PR ON PR.PRCODE = CP.CPOPR
                LEFT JOIN tbldebitur DEB ON PR.CUCODE = DEB.CUCODE
                LEFT JOIN tblcontainer_code CC ON CON.CCCODE = CC.CCCODE
                LEFT JOIN tblcontainer_leasing CL ON CL.LEORDERNO=CP.CPIPRANO
                LEFT JOIN tblmaterial MAT ON CON.MTCODE=MAT.MTCODE
                LEFT JOIN tbldepo DP ON CP.DPCODE=DP.DPCODE
                LEFT JOIN tblsubdepo SD ON CP.SDCODE = SD.SDCODE WHERE CON.CRLASTACT = 'WE' `,
				{
					type: container_survey.SELECT,
				}
			);

			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List Survey",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = SurveyController;
