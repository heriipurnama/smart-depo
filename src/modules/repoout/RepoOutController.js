"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class RepoOutController {

	static async list(req, res, next) {
		let {start, rows} = req.body;
		try {
        let datas = await container_process.sequelize.query(`SELECT container_process.CPID,tblcontainer.CRNO,
            CASE WHEN container_process.CPIPRANO IS NULL THEN container_process.CPIORDERNO ELSE container_process.CPIPRANO END AS CPIPRANO,
            tblvoyage.VOYNO,container_process.CPIPRATGL,container_process.CPOPR,tblvoyage.VESID,
            container_process.CPIVOY,container_process.CPITERM,container_repo.REBILL,container_repo.RETYPE,tblrepo_tariffdetail.RTID
            FROM container_process
            INNER JOIN container_repo ON container_process.CPIORDERNO = container_repo.REORDERNO
            LEFT JOIN tblcontainer ON tblcontainer.CRNO = container_process.CRNO
            LEFT JOIN tblprincipal ON tblprincipal.PRCODE = container_process.CPOPR
            LEFT JOIN tblrepo_tariff ON tblrepo_tariff.RTNO = tblprincipal.PRREPONO
            LEFT JOIN tblrepo_tariffdetail ON tblrepo_tariff.PRCODE = tblrepo_tariffdetail.PRCODE
            LEFT JOIN tblvessel ON tblvessel.VESID = container_process.CPIVES
            LEFT JOIN tblvoyage ON tblvoyage.VESID = tblvessel.VESID
            WHERE $type like 'RO%'
            `, 
            {
                type: container_process.SELECT
            }
            );
            
			baseResponse({ message: "List Repo Out", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = RepoOutController;