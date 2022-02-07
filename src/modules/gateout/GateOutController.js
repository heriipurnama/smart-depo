"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container, container_process, tblsurveyor
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

	static async listAllSurveyor(req, res, next) {
		// let {start, rows} = req.body;
		try {
			let datas  = await tblsurveyor.findAll({
			});
			baseResponse({ message: "List surveyor", data: datas })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	//Gate out untuk web
	static async getByCrno(req, res, next) {
		const {
			crno,
		} = req.query;

		try {
			let datas = await container_process.sequelize.query(
				`select DISTINCT con.crcpid,
								 con.crno,
								 dp.dpname,
								 cp.cpotgl,
								 sub.sdname,
								 pr.prcode,
								 deb.cucode,
								 deb.cuname,
								 con.cccode,
								 cp.cpopr,
								 cp.cpopr1,
								 cp.cpcust,
								 cp.cpcust1,
								 cp.cpotruck,
								 cp.cporeceptno,
								 cp.svsurdat,
								 cp.syid,
								 concode.ctcode,
								 concode.cclength,
								 concode.ccheight,
								 con.crcdp,
								 con.cracep,
								 con.crcsc,
								 con.crweightk,
								 con.crweightl,
								 con.crtarak,
								 con.crtaral,
								 con.crnetk,
								 con.crnetl,
								 con.crvol,
								 con.crmanuf,
								 con.crmandat,
								 con.crpos,
								 con.crbay,
								 svey.svcond,
								 con.crrow,
								 con.crtier,
								 con.crlastcond,
								 con.crlastconde,
								 con.crlastact,
								 mtrl.mtdesc,
								 cp.cpoorderno,
								 cp.cpoeir,
								 cp.cporefout,
								 cp.cpopratgl,
								 cp.cpochrgbm,
								 cp.cpopaidbm,
								 (case
									  when cp.cpofe = '1' then 'full'
									  when cp.cpofe = '0' or cp.cpofe is null then 'empty'
									  else '' end) as cpofe,
								 (case
									  when repo.retype = '11' then 'depot to depot'
									  when repo.retype = '12' then 'depot to port'
									  when repo.retype = '13' then 'depot to intercity'
									  else '' end) as retype,
								 cp.cpoterm,
								 cp.cpoload,
								 cp.cpoloaddat,
								 cp.cpojam,
								 cp.cpocargo,
								 voy.vesid,
								 cp.cposeal,
								 cp.cpovoy,
								 cp.cpoves,
								 cp.cporeceiv,
								 cp.cpodpp,
								 ves.vesopr,
								 cp.cpodriver,
								 cp.cponopol,
								 cp.cporemark,
								 repo.retfrom,
								 usr.username syname,
								 prt.cncode,
								 prt.poport
				 from tblcontainer con
						  inner join container_process cp on con.crcpid = cp.cpid
						  inner join tblcontainer_code concode on concode.cccode = con.cccode
						  left join tblmaterial mtrl on mtrl.mtcode = con.mtcode
						  left join tbldepo dp on dp.dpcode = cp.cpdepo
						  left join tblsubdepo sub on sub.sdcode = cp.spdepo
						  left join tbldebitur deb on deb.cucode = cp.cpotruck
						  left join tblprincipal pr on pr.prcode = cp.cpopr1
						  left join tblvessel ves on ves.vesid = cp.cpoves
						  left join tblvoyage voy on voy.vesid = ves.vesid
						  left join tblport prt on prt.poid = cp.cpoload
						  left join container_survey svey on svey.cpid = cp.cpid
						  left join tblusers usr on usr.user_id = svey.syid
						  left join order_container_repo repo on repo.reorderno = cp.cpoorderno
				 where con.crno ='${crno}' `
			);
			const restDatas = datas[0];

			baseResponse({ message: "List Datas", data: restDatas })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	//untuk save di gateout di web
	static async gateOutUpdate(req, res, next) {
		let {
			cpotgl,
			cpopr,
			cpopr1,
			cpcust,
			cpcust1,
			cpotruck,
			cporeceptno,
			svsurdat,
			syid,
			cpoorderno,
			cpoeir,
			cporefout,
			cpopratgl,
			cpochrgbm,
			cpopaidbm,
			cpofe,
			cpoterm,
			cpoload,
			cpoloaddat,
			cpojam,
			cpocargo,
			cposeal,
			cpovoy,
			cpoves,
			cporeceiv,
			cpodpp,
			cpodriver,
			cponopol,
			cporemark,
			cpid,
		} = req.body;

		try {
			var genNumber = 1;
			let MyResult = await container_process.sequelize.query(
				`SELECT count(CPOEIR) as CPOEIR FROM container_process`,
				{
					type: container_process.SELECT,
					plain: true,
				}
			);
			if (MyResult !== null) {
				let rests = await container_process.sequelize.query(
					`SELECT max(CPOEIR)+1 as CPOEIR FROM container_process`,
					{
						type: container_process.SELECT,
						plain: true,
					}
				);
				genNumber = rests["CPOEIR"];
			}
			let payload = await container_process.update(
				{
					cpotgl: cpotgl,
					cpopr: cpopr,
					cpopr1: cpopr1,
					cpcust: cpcust,
					cpcust1: cpcust1,
					cpotruck: cpotruck,
					cporeceptno: cporeceptno,
					svsurdat: svsurdat,
					syid: syid,
					cpoorderno: cpoorderno,
					cpoeir: parseInt(genNumber),
					cporefout: cporefout,
					cpopratgl: cpopratgl,
					cpochrgbm: cpochrgbm,
					cpopaidbm: cpopaidbm,
					cpofe: cpofe,
					cpoterm: cpoterm,
					cpoload: cpoload,
					cpoloaddat: cpoloaddat,
					cpojam: cpojam,
					cpocargo: cpocargo,
					cposeal: cposeal,
					cpovoy: cpovoy,
					cpoves: cpoves,
					cporeceiv: cporeceiv,
					cpodpp: cpodpp,
					cpodriver: cpodriver,
					cponopol: cponopol,
					cporemark: cporemark,
				},
				{ where: {cpid: cpid
					}}
			);

			baseResponse({
				message: "container process updated!",
				data: `container_process succes update for payload : ${payload}`,
			})(res, 200);
			Logger(req);
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
