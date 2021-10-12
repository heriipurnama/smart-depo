"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_survey } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class SurveyController {

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
            let datas = await container_survey.sequelize.query(`select SVY.SVID,CON.CRNO,PR.PRCODE, 
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
                `, 
                {
                    type: container_survey.SELECT
                }
            );
            
			baseResponse({ message: "List Gate Out", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = SurveyController;

// $HTMLGridList  = "SurveyGrid";
// $TableName1 = "tblcontainer";
// $TableName2 = "tblsurveyor";
// $TableName3 = "tblcontainer_transaction";
// $TableName4 = "container_survey";
// $TableName5 = "tblprincipal";
// $TableName6 = "container_process";
// $TableName7 = "container_repair";
// $TableName8 = "container_repair_detail";



// $SQL = "
//     SELECT SVY.SVID,CON.CRNO,PR.PRCODE,CASE WHEN DATE_FORMAT(CP.CPITGL,'%d/%m/%Y')='00/00/0000' THEN '' ELSE DATE_FORMAT(CP.CPITGL,'%d/%m/%Y') END AS CPITGL,
//      DATE_FORMAT(SVY.SVSURDAT,'%d/%m/%Y') as SVSURDAT,SVY.SVCOND 
//      FROM
//     $DBCoins.tblcontainer CON INNER JOIN $DBCoins.container_container_process CP ON CON.CRCPID = CP.CPID

//     INNER JOIN $DBCoins.container_survey SVY ON CP.CPID=SVY.CPID

//     LEFT JOIN $DBCoins.tblprincipal PR ON PR.PRCODE = CP.CPOPR

//     LEFT JOIN $DBGeneral.tbldebitur DEB ON PR.CUCODE = DEB.CUCODE

//     LEFT JOIN $DBCoins.tblcontainer_code CC ON CON.CCCODE = CC.CCCODE

//     LEFT JOIN $DBCoins.tblcontainer_leasing CL ON CL.LEORDERNO=CP.CPIPRANO

//     LEFT JOIN $DBCoins.tblmaterial MAT ON CON.MTCODE=MAT.MTCODE

//     LEFT JOIN $DBCoins.tbldepo DP ON CP.DPCODE=DP.DPCODE
//     LEFT JOIN $DBCoins.tblsubdepo SD ON CP.SDCODE = SD.SDCODE WHERE CON.CRLASTACT = 'WE'

//     ";
