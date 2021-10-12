"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container, container_process, principal, container_repair, container_survey 
        } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class GateOutController {

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
			let { count, rows: datas } = await container.findAndCountAll({
				offset: start,
                limit: rows,
                include:[
                    {
                        model:container_process,
                        as : "container_process",
                        attributes: ["cpid", "cpotgl", "cpopr1","cpoorderno","cpoeir"],
                        required: true
                    }
                ],
                where: { crlastact : "OD" },
			});
			baseResponse({ message: "List Gate Out", data: { datas, total:datas, count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = GateOutController;

// $HTMLGridList    = "GateOutGrid";
// $TableName     = "tblcontainer";
// $TableName2   = "container_process";
// $TableName3    = "tblprincipal";
// $TableName4    = "tblcontainer_leasing";
// $TableName5    = "tblsurveyor";
// $TableName6    = "container_survey";
// $TableName7    = "container_repair";

// $SQL = "SELECT $TableName.CRNO,$TableName2.CPID,$TableName2.CPOTGL,$TableName2.CPOPR1,
//                $TableName2.CPOORDERNO,$TableName2.CPOEIR 
//         FROM $TableName
//     INNER JOIN $TableName2 ON $TableName.CRCPID = $TableName2.CPID
//     INNER JOIN $TableName6 ON $TableName6.CPID = $TableName2.CPID
//     WHERE $TableName.CRLASTACT='OD'";
