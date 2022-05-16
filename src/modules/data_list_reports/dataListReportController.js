"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");

class dataListReportController {
	static async listGateOut(req, res, next) {
		let { limit, offset, search } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` and tblcontainer.CRNO LIKE '%${search}%' ` : ` and tblcontainer.CRNO LIKE '%%' `;

		try {
			let datas = await container_process.sequelize.query(
				`SELECT tblcontainer.CRNO,container_process.CPID,container_process.CPOTGL,container_process.CPOPR1,
                    container_process.CPOORDERNO,container_process.CPOEIR 
                 FROM tblcontainer
                 INNER JOIN container_process ON tblcontainer.CRCPID = container_process.CPID
                 INNER JOIN container_survey ON container_survey.CPID = container_process.CPID
                 WHERE tblcontainer.CRLASTACT='OD' ${searchs} ORDER BY container_process.cpoeir desc LIMIT ${limits} OFFSET ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);
			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
				FROM tblcontainer
				INNER JOIN container_process ON tblcontainer.CRCPID = container_process.CPID
				INNER JOIN container_survey ON container_survey.CPID = container_process.CPID
				WHERE tblcontainer.CRLASTACT='OD'`,
				{
					type: container_process.SELECT,
				}
			);

			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];
			baseResponse({
				message: "List Inventories",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
	static async listSurvey(req, res, next) {
		let { limit, offset, search } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` and CON.CRNO LIKE '%${search}%' ` : ` and CON.CRNO LIKE '%%' `;

		try {
			let datas = await container_process.sequelize.query(
				`SELECT SVY.SVID,CON.CRNO,PR.PRCODE,CP.CPIORDERNO, CP.CPID, SVY.bid, CR.rpid,
						CASE WHEN DATE_FORMAT(CP.CPITGL,'%d/%m/%Y')='00/00/0000'
						THEN '' ELSE DATE_FORMAT(CP.CPITGL,'%d/%m/%Y') END AS CPITGL,DATE_FORMAT(SVY.SVSURDAT,'%d/%m/%Y') as SVSURDAT,
						SVY.SVCOND FROM tblcontainer CON INNER JOIN container_process CP ON CON.CRCPID = CP.CPID
									  INNER JOIN container_survey SVY ON CP.CPID=SVY.CPID
									  LEFT JOIN tblprincipal PR ON PR.PRCODE = CP.CPOPR
									  LEFT JOIN tbldebitur DEB ON PR.CUCODE = DEB.CUCODE
									  LEFT JOIN tblcontainer_code CC ON CON.CCCODE = CC.CCCODE
									  LEFT JOIN tblmaterial MAT ON CON.MTCODE=MAT.MTCODE
									  LEFT JOIN tbldepo DP ON CP.DPCODE=DP.DPCODE
									  LEFT JOIN tblsubdepo SD ON CP.SDCODE = SD.SDCODE
									  LEFT JOIN container_repair CR ON SVY.SVID = CR.SVID
				 	WHERE (CON.CRLASTACT = 'WE' OR  CON.CRLASTACT = 'BI') ${searchs} ORDER BY SVY.SVID DESC
					 LIMIT ${limits} OFFSET ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);
			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total FROM
					 tblcontainer CON INNER JOIN container_process CP ON CON.CRCPID = CP.CPID
									  INNER JOIN container_survey SVY ON CP.CPID=SVY.CPID
									  LEFT JOIN tblprincipal PR ON PR.PRCODE = CP.CPOPR
									  LEFT JOIN tbldebitur DEB ON PR.CUCODE = DEB.CUCODE
									  LEFT JOIN tblcontainer_code CC ON CON.CCCODE = CC.CCCODE
									  LEFT JOIN tblmaterial MAT ON CON.MTCODE=MAT.MTCODE
									  LEFT JOIN tbldepo DP ON CP.DPCODE=DP.DPCODE
									  LEFT JOIN tblsubdepo SD ON CP.SDCODE = SD.SDCODE
				 	 WHERE CON.CRLASTACT = 'WE' OR  CON.CRLASTACT = 'BI' `,
				{
					type: container_process.SELECT,
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
	static async listEstimation(req, res, next) {
		let { limit, offset, search } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` and con.CRNO LIKE '%${search}%' ` : ` and con.CRNO LIKE '%%' `;

		try {
			let datas = await container_process.sequelize.query(
				`SELECT rp.RPVER,pr.PRCODE,rp.RPCRNO,surv.SVID,DATE_FORMAT( surv.SVSURDAT, '%d/%m/%Y' ) AS SVSURDAT,
                DATE_FORMAT( cp.CPITGL, '%d/%m/%Y' ) AS CPITGL,rp.RPNOEST, surv.SVCOND,
                 DATE_FORMAT( rp.RPTGLEST,'%d/%m/%Y') as RPTGLEST
                FROM 
                 container_process cp INNER JOIN tblcontainer con ON
                  cp.CRNO = con.CRNO
                  INNER JOIN container_survey surv ON
                  surv.CPID = cp.CPID
                  INNER JOIN container_repair rp ON
                  rp.SVID = surv.SVID
                  LEFT JOIN tblprincipal pr ON
                  pr.PRCODE = cp.CPOPR Where surv.TYPE='1' ${searchs} and con.crlastact ='WA'
				  ORDER BY rp.SVID desc LIMIT ${limits} OFFSET ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);
			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
                FROM 
                 container_process cp INNER JOIN tblcontainer con ON
                  cp.CRNO = con.CRNO
                  INNER JOIN container_survey surv ON
                  surv.CPID = cp.CPID
                  INNER JOIN container_repair rp ON
                  rp.SVID = surv.SVID
                  LEFT JOIN tblprincipal pr ON
                  pr.PRCODE = cp.CPOPR Where surv.TYPE='1' and con.crlastact ='WA'`,
				{
					type: container_process.SELECT,
				}
			);
			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List Estimation",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
	static async listApproval(req, res, next) {
		let { limit, offset, search } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` and con.CRNO LIKE '%${search}%' ` : ` and con.CRNO LIKE '%%' `;

		try {
			let datas = await container_process.sequelize.query(
				`  SELECT con.CRNO,rp.RPVER,con.CRLASTACT,surv.SVID,pr.PRCODE, 
                DATE_FORMAT( cp.CPITGL, '%d/%m/%Y' ) AS CPITGL, DATE_FORMAT( surv.SVSURDAT, '%d/%m/%Y' ) AS SVSURDAT,
                 surv.SVCOND, cp.CPIEIR, rp.RPVER, rp.RPSTSAPPV,DATE_FORMAT( rp.RPTGLAPPVPR,'%d/%m/%Y') as RPTGLAPPVPR,
                 rp.RPNOEST 
                FROM container_process cp INNER JOIN tblcontainer con ON
               cp.CPID = con.CRCPID
               INNER JOIN container_survey surv ON
                 surv.CPID = cp.CPID
               INNER JOIN container_repair rp ON
                 rp.SVID = surv.SVID
               LEFT JOIN tblprincipal pr ON
                 pr.PRCODE = cp.CPOPR
               Where surv.TYPE='1' 
--                  AND con.CRLASTACT in('WA','WW','IW','RP','CR','OW','CP','WR')
				 AND con.CRLASTACT ='WW'
                 and rp.RPFINALEST='1' and rp.RPTGLAPPVPR is NOT null 
                ${searchs} ORDER BY rp.SVID desc LIMIT ${limits} OFFSET ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);
			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
				FROM container_process cp INNER JOIN tblcontainer con ON
				cp.CPID = con.CRCPID
				INNER JOIN container_survey surv ON
				  surv.CPID = cp.CPID
				INNER JOIN container_repair rp ON
				  rp.SVID = surv.SVID
				LEFT JOIN tblprincipal pr ON
				  pr.PRCODE = cp.CPOPR
				Where surv.TYPE='1' AND con.CRLASTACT in('WA','WW','IW','RP','CR','OW','CP','WR') and rp.RPFINALEST='1' and rp.RPTGLAPPVPR is NOT null
				ORDER BY rp.SVID desc`,
				{
					type: container_process.SELECT,
				}
			);
			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List Approvals",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
	static async listWO(req, res, next) {
		let { limit, offset } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;

		try {
			let datas = await container_process.sequelize.query(
				`  Select WO.WONO,WO.WOOPR,WO.WODATE,RP.RPCRNO,CP.CPOPR,CP.CPID 
				FROM
                container_process CP INNER JOIN tblcontainer CON ON
                CP.CPID = CON.CRCPID
                   INNER JOIN container_survey SV ON
                  SV.CPID = CP.CPID
                   INNER JOIN  container_repair RP ON
                  RP.SVID = SV.SVID
                   INNER JOIN container_cfs_work_order WO ON
                  WO.WONO = RP.WONO
               WHERE SV.TYPE='2' AND CON.CRLASTACTE in('WW','IW','RP','CR','OW','CP','WR') AND LEFT(WO.WONO,2)='WE' 
               GROUP BY WO.WONO,WO.WOOPR,WO.WODATE,RP.RPCRNO,CP.CPOPR,CP.CPID 
               ORDER BY WO.WODATE desc,WO.WONO desc LIMIT ${limits} OFFSET ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);
			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
                FROM 
                container_process CP INNER JOIN tblcontainer CON ON
                CP.CPID = CON.CRCPID
                   INNER JOIN container_survey SV ON
                  SV.CPID = CP.CPID
                   INNER JOIN  container_repair RP ON
                  RP.SVID = SV.SVID
                   INNER JOIN container_cfs_work_order WO ON
                  WO.WONO = RP.WONO
               WHERE SV.TYPE='2' AND CON.CRLASTACTE in('WW','IW','RP','CR','OW','CP','WR') AND LEFT(WO.WONO,2)='WE' 
               GROUP BY WO.WONO,WO.WOOPR,WO.WODATE,RP.RPCRNO,CP.CPOPR,CP.CPID `,
				{
					type: container_process.SELECT,
				}
			);
			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List WO",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
	static async listMnR(req, res, next) {
		let { limit, offset } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;

		try {
			let datas = await container_process.sequelize.query(
				`SELECT tblcontainer.CRNO,container_repair.SVID,container_repair.RPTGLAPPVPR,container_repair.RPVER,tblcontainer_code.CTCODE,tblcontainer_code.CCLENGTH,tblcontainer_code.CCHEIGHT,container_process.CPITGL,container_survey.SVCOND 
				FROM 
                    container_process INNER JOIN tblcontainer ON container_process.CPID = tblcontainer.CRCPID
                    INNER JOIN container_survey ON container_survey.CPID = container_process.CPID
                    INNER JOIN container_repair ON container_repair.SVID = container_survey.SVID
                    LEFT JOIN tblcontainer_code ON tblcontainer.CCCODE = tblcontainer_code.CCCODE
                     WHERE tblcontainer.CRLASTACT='WW' AND container_process.CPOPR='".trim($_GET["PRCODE"])."' AND
                      container_repair.RPFINALEST='1' AND container_survey.TYPE='1' 
					  ORDER BY container_repair.RPTGLAPPVPR desc,tblcontainer.CRNO  
					  LIMIT ${limits} OFFSET ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);
			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
				FROM 
                    container_process INNER JOIN tblcontainer ON container_process.CPID = tblcontainer.CRCPID
                    INNER JOIN container_survey ON container_survey.CPID = container_process.CPID
                    INNER JOIN container_repair ON container_repair.SVID = container_survey.SVID
                    LEFT JOIN tblcontainer_code ON tblcontainer.CCCODE = tblcontainer_code.CCCODE
                     WHERE tblcontainer.CRLASTACT='WW' AND container_process.CPOPR='".trim($_GET["PRCODE"])."' AND
                      container_repair.RPFINALEST='1' AND container_survey.TYPE='1' 
					  ORDER BY container_repair.RPTGLAPPVPR desc,tblcontainer.CRNO `,
				{
					type: container_process.SELECT,
				}
			);
			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List WO",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
	static async listRepoIn(req, res, next) {
		let { limit, offset } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;

		try {
			let datas = await container_process.sequelize.query(
				`SELECT container_process.CPID,tblcontainer.CRNO,
                CASE WHEN container_process.CPIPRANO IS NULL THEN container_process.CPIORDERNO ELSE container_process.CPIPRANO END AS CPIPRANO,
          tblvoyage.VOYNO,container_process.CPIPRATGL,container_process.CPOPR,tblvoyage.VESID,
                container_process.CPIVOY,container_process.CPITERM,order_container_repo.REBILL,order_container_repo.RETYPE,
                tblrepo_tariffdetail.RTID
         FROM container_process
     INNER JOIN order_container_repo ON container_process.CPIORDERNO = order_container_repo.REORDERNO
     LEFT JOIN tblcontainer ON tblcontainer.CRNO = container_process.CRNO
     LEFT JOIN tblprincipal ON tblprincipal.PRCODE = container_process.CPOPR
     LEFT JOIN tblrepo_tariff ON tblrepo_tariff.RTNO = tblprincipal.PRREPONO
           LEFT JOIN tblrepo_tariffdetail ON tblrepo_tariff.PRCODE = tblrepo_tariffdetail.PRCODE
     LEFT JOIN tblvessel ON tblvessel.VESID = container_process.CPIVES
       LEFT JOIN tblvoyage ON tblvoyage.VESID = tblvessel.VESID
     WHERE container_process.CPIORDERNO like 'RI%' LIMIT ${limits} OFFSET ${offsets}`,
				{
					type: container_process.SELECT,
				}
			);
			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
				FROM container_process
				INNER JOIN order_container_repo ON container_process.CPIORDERNO = order_container_repo.REORDERNO
				LEFT JOIN tblcontainer ON tblcontainer.CRNO = container_process.CRNO
				LEFT JOIN tblprincipal ON tblprincipal.PRCODE = container_process.CPOPR
				LEFT JOIN tblrepo_tariff ON tblrepo_tariff.RTNO = tblprincipal.PRREPONO
					  LEFT JOIN tblrepo_tariffdetail ON tblrepo_tariff.PRCODE = tblrepo_tariffdetail.PRCODE
				LEFT JOIN tblvessel ON tblvessel.VESID = container_process.CPIVES
				  LEFT JOIN tblvoyage ON tblvoyage.VESID = tblvessel.VESID
				WHERE container_process.CPIORDERNO like 'RI%'`,
				{
					type: container_process.SELECT,
				}
			);
			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];
			baseResponse({
				message: "List Repo IN",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
	static async listRepoOut(req, res, next) {
		let { limit, offset } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;

		try {
			let datas = await container_process.sequelize.query(
				`SELECT container_process.CPID,tblcontainer.CRNO,
                CASE WHEN container_process.CPIPRANO IS NULL THEN container_process.CPIORDERNO ELSE container_process.CPIPRANO END AS CPIPRANO,
          tblvoyage.VOYNO,container_process.CPIPRATGL,container_process.CPOPR,tblvoyage.VESID,
                container_process.CPIVOY,container_process.CPITERM,order_container_repo.REBILL,order_container_repo.RETYPE,tblrepo_tariffdetail.RTID
         FROM container_process
     INNER JOIN order_container_repo ON container_process.CPIORDERNO = order_container_repo.REORDERNO
     LEFT JOIN tblcontainer ON tblcontainer.CRNO = container_process.CRNO
     LEFT JOIN tblprincipal ON tblprincipal.PRCODE = container_process.CPOPR
     LEFT JOIN tblrepo_tariff ON tblrepo_tariff.RTNO = tblprincipal.PRREPONO
           LEFT JOIN tblrepo_tariffdetail ON tblrepo_tariff.PRCODE = tblrepo_tariffdetail.PRCODE
     LEFT JOIN tblvessel ON tblvessel.VESID = container_process.CPIVES
       LEFT JOIN tblvoyage ON tblvoyage.VESID = tblvessel.VESID
     WHERE container_process.CPOORDERNO like 'RO%'  LIMIT ${limits} OFFSET ${offsets} `,
				{
					type: container_process.SELECT,
				}
			);
			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
				FROM container_process
     INNER JOIN order_container_repo ON container_process.CPIORDERNO = order_container_repo.REORDERNO
     LEFT JOIN tblcontainer ON tblcontainer.CRNO = container_process.CRNO
     LEFT JOIN tblprincipal ON tblprincipal.PRCODE = container_process.CPOPR
     LEFT JOIN tblrepo_tariff ON tblrepo_tariff.RTNO = tblprincipal.PRREPONO
           LEFT JOIN tblrepo_tariffdetail ON tblrepo_tariff.PRCODE = tblrepo_tariffdetail.PRCODE
     LEFT JOIN tblvessel ON tblvessel.VESID = container_process.CPIVES
       LEFT JOIN tblvoyage ON tblvoyage.VESID = tblvessel.VESID
     WHERE container_process.CPOORDERNO like 'RO%' `,
				{
					type: container_process.SELECT,
				}
			);
			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List Repo Out",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = dataListReportController;
