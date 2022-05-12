"use strict";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const baseResponse = require("../../utils/helper/Response");
const { container, container_process, tblsurveyor, orderPraContainer,
	orderRepoContainer, company,  container_interchange
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
								 prt.poport,
								 cp.cpovoyid
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
			cpovoyid,
			crno,
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
					cpotgl: new Date(),
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
					cpojam: new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
					cpocargo: cpocargo,
					cposeal: cposeal,
					cpovoy: cpovoy,
					cpoves: cpoves,
					cporeceiv: cporeceiv,
					cpodpp: cpodpp,
					cpodriver: cpodriver,
					cponopol: cponopol,
					cporemark: cporemark,
					cpovoyid: cpovoyid,
				},
				{ where: {cpid: cpid
					}}
			);

			const payloades = await container.update(
				{ crlastact: "OD", lastact: "OD" },
				{ where: { crno: crno } }
			);

			const payloadeswe = await orderPraContainer.update(
				{ cpigatedate: new Date() },
				{ where: { crno: crno } }
			);

			//--- order_repo_container
			const payloadrepo = await orderRepoContainer.update(
				{ repogatedate: new Date() },
				{ where: { crno: crno } }
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

	//untuk save di repoout di web
	static async repoOutUpdateCP(req, res, next) {
		let {
			cpopr1,
			cpcust1,
			cpoorderno,
			cporefout,
			cpopratgl,
			cpofe,
			cpoterm,
			cpocargo,
			cposeal,
			cpovoy,
			cpoves,
			cporeceiv,
			cporemark,
			cpid,
			crno,
			cporeceptno,
		} = req.body;

		try {
			let payload = await container_process.update(
				{
					cpopr1: cpopr1,
					cpcust1: cpcust1,
					cpoorderno: cpoorderno,
					cporefout: cporefout,
					cpopratgl: cpopratgl,
					cpofe: cpofe,
					cpoterm: cpoterm,
					cpocargo: cpocargo,
					cposeal: cposeal,
					cpovoy: cpovoy,
					cpoves: cpoves,
					cporeceiv: cporeceiv,
					cporemark: cporemark,
					cporeceptno: cporeceptno,
				},
				{ where: {cpid: cpid
					}}
			);

			const payloades = await container.update(
				{ crlastact: "BO" },
				{ where: { crno: crno } }
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

	static async interchange(req, res, next) {
		let { crno, cpopr, cpcust, onhiredate, chgnote, } = req.body;

		try {

			/**
			 * Format
			 * prefix[SV] + 'paktrasl' + 'sdcode' + 8digit_number
			 */

				// get data company.
			let resultCompany1 = await company.findAll({});
			let paktrasl1 = resultCompany1[0].dataValues.paktrasl;
			let sdcode1 = resultCompany1[0].dataValues.sdcode;
			let prefixCode1 = "DI";

			// get data repo order
			let resultSurvey1 = await container_interchange.findOne({
				where: {
					chgorderno: { [Op.like]: `%DI%`}
				},
				order:[[ "chgorderno", "DESC"]]
			});
			var resultCodec;
			if (resultSurvey1 === null) {

				resultCodec = `${prefixCode1}${paktrasl1}${sdcode1}00000001`;
			} else {

				let resultDataSurvey = resultSurvey1.dataValues.chgorderno;
				let resultSubstringDataSurvey = resultDataSurvey.substring(7,16);
				let convertInt = parseInt(resultSubstringDataSurvey) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				resultCodec = `${prefixCode1}${paktrasl1}${sdcode1}${number}`;

			}

			let data1 = await container_interchange.sequelize.query(
				` INSERT INTO container_interchange(chgorderno, crgno, chgopr, chgcust, chgdate, chgnote) 
 				VALUES ( '${resultCodec}', '${crno}', '${cpopr}', '${cpcust}', '${onhiredate}', '${chgnote}')
            `,
				{
					type: container_interchange.INSERT,
				}
			);

			let datas = await container_interchange.sequelize.query(
				`SELECT cpcust,
						cpopr,
						cpichrgbb,
						cpiorderno,
						cpireceptno,
						cpipratgl,
						cpitgl,
						onhiredate,
						cpijam,
						cpistatus,
						cpideliver,
						cpidisdat,
						cpidish,
						cpieir,
						cpiterm,
						cpicargo,
						cpidpp,
						cpidppinout,
						cpiseal,
						cpives,
						cpitruck,
						cpinopol,
						cpishold,
						cpiremark,
						cpidriver,
						cpivoyid,
						cpivoy,
						cpinotes
				 FROM container_process
				 WHERE cpitgl is not null
				   and cpid = (SELECT crcpid FROM tblcontainer WHERE crno LIKE '${crno}') `,
				{
					type: container_interchange.SELECT,
					plain: true

				});

			let cpieir = datas['cpieir'];
			let cpidish = datas['cpidish'];
			let cpidisdat = datas['cpidisdat'];
			let cpideliver = datas['cpideliver'];
			let cpitgl = datas['cpitgl'];
			let cpiterm = datas['cpiterm'];
			let cpochrgbm = datas['cpichrgbb'];
			let cpoorderno = datas['cpiorderno'];
			let cporeceptno = datas['cpireceptno'];
			let cpopratgl = datas['cpipratgl'];
			let cpojam = datas['cpijam'];
			let cpostatus = datas['cpistatus'];
			let cporeceiv = null;
			let cpocargo = datas['cpicargo'];
			let cpodpp = datas['cpidpp'];
			let cpodppinout = datas['cpidppinout'];
			let cposeal = datas['cpiseal'];
			let cpoves = datas['cpives'];
			let cpotruck = datas['cpitruck'];
			let cponopol = datas['cpinopol'];
			let cpoload = datas['cpishold'];
			let cpiremark1 = datas['cpiremark'];
			let cpodriver = datas['cpidriver'];
			let cpovoyid = datas['cpivoyid'];
			let cpovoy = datas['cpivoy'];
			let cponotes = datas['cpinotes'];


			let data = await container_interchange.sequelize.query(
				` update container_process
				  set
					  cpopr1 ='${cpopr}',
					  cpcust1 ='${cpcust}',
					  cpochrgbm = ${cpochrgbm},
					  cpoorderno = '${cpoorderno}',
					  cporeceptno = '${cporeceptno}',
					  cpopratgl = '${cpopratgl}',
					  onhiredate = '${onhiredate}',
					  cpotgl = '${onhiredate}',
					  cpojam = '${cpojam}',
					  cpostatus = '${cpostatus}',
					  cporeceiv = '${cporeceiv}',
					  cpocargo = '${cpocargo}',
					  cpodpp = '${cpodpp}',
					  cpodppinout = ${cpodppinout},
					  cposeal = '${cposeal}',
					  cpoves = '${cpoves}',
					  cpotruck = '${cpotruck}',
					  cponopol = '${cponopol}',
					  cpoload = '${cpoload}',
					  cpiremark1 = '${cpiremark1}',
					  cpodriver = '${cpodriver}',
					  cpovoyid = ${cpovoyid},
					  cpovoy = '${cpovoy}',
					  cponotes  = '${cponotes}'
				  WHERE cpitgl is not null
					and cpid = ( SELECT  crcpid FROM  tblcontainer WHERE  crno  LIKE '${crno}' )
            `,
				{
					type: container_interchange.UPDATE,
				}
			);

			/**
			 * Format CONTAINER PROCESS CODE
			 * prefix[CP] + 'paktrasl' + 'sdcode' + 8digit_number
			 */

				// get data company.
			let resultCompany = await company.findAll({});
			let paktrasl = resultCompany[0].dataValues.paktrasl;
			let sdcode = resultCompany[0].dataValues.sdcode;
			let prefixCode = "CP";

			// get data container process
			let resultOrderPra = await container_process.findOne({
				order: [["cpid", "DESC"]],
			});

			let resultCode;
			if (resultOrderPra === null) {
				resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
			} else {
				let resultDataOrderPra = resultOrderPra.dataValues.cpid;
				let resultSubstringDataOrderPra = resultDataOrderPra.substring(7, 16);
				let convertInt = parseInt(resultSubstringDataOrderPra) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				resultCode = `${prefixCode}${paktrasl}${sdcode}${number}`;
			}

			let restDatas = await container_interchange.sequelize.query(
				` INSERT INTO container_process  
					(cpid,crno, cpcust,cpopr,cpichrgbb,cpiorderno,cpireceptno ,                          
					 cpipratgl,cpitgl,onhiredate,cpijam,cpistatus ,                            
					 cpideliver,cpidisdat,cpidish,cpieir,cpiterm ,                              
					 cpicargo,cpidpp,cpidppinout,cpiseal,cpives,cpitruck ,                             
					 cpinopol,cpishold,cpiremark,cpidriver,cpivoyid ,                             
					 cpivoy,cpinotes )
					values
					('${resultCode}','${crno}', '${cpcust}', '${cpopr}', ${cpochrgbm}, '${cpoorderno}', '${cporeceptno}',
					 '${cpopratgl}', '${cpitgl}', '${onhiredate}', '${onhiredate}', '${cpostatus}',
					 '${cpideliver}', '${cpidisdat}', '${cpidish}', ${cpieir}, '${cpiterm}',
					 '${cpocargo}', '${cpodpp}', ${cpodppinout}, '${cposeal}', '${cpoves}', '${cpotruck}',
					 '${cponopol}', '${cpoload}','${cpiremark1}','${cpodriver}', ${cpovoyid},
					 '${cpovoy}','${cponotes}' ) `,
				{
					type: container_interchange.INSERT,
				}
			);

			let conUpdate = await container_interchange.sequelize.query(
				` UPDATE tblcontainer SET  crcpid = '${resultCode}' WHERE crno  LIKE '${crno}'
            `,
				{
					type: container_interchange.UPDATE,
				}
			);

			baseResponse({ message: "inter change", data: `success update and insert interchange ` })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listInterChange(req, res, next) {
		let {limit, offset, search} = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` crgno LIKE '%${search}%' ` : ` crgno LIKE '%%' `;

		try {
			let datas = await container_interchange.sequelize.query(
				`SELECT chgid, chgorderno, crgno, chgopr, chgcust, chgdate, chgnote, chgcrtby, chgcrton, chgmdfby, chgmdfon FROM container_interchange 
			WHERE ${searchs} ORDER BY chgorderno DESC LIMIT ${limits} OFFSET ${offsets}
            `,
				{
					type: container_interchange.SELECT
				}
			);

			let TotalDatas = await container_interchange.sequelize.query(
				`SELECT count(*) As Total
                 FROM container_interchange `,
				{
					type: container_interchange.SELECT,
				}
			);

			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List inter change",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
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
