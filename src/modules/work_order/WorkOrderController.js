"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process, container_repair, container_work_order, company, container_survey} = require("../../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Logger = require("../../utils/helper/logger");

class WorkOrderController {
	static async list(req, res, next) {
        let {limit, offset, search} = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` wono LIKE '%${search}%' ` : ` wono LIKE '%%' `;

		try {
			let datas = await container_process.sequelize.query(
				`SELECT wono, wodate, woopr, woto, wocc, wofrom, wotype FROM container_work_order 
				where ${searchs} ORDER BY wono  DESC  LIMIT ${limits} OFFSET ${offsets}
            `, 
            {
                type: container_process.SELECT
            }
            );

			let TotalDatas = await container_process.sequelize.query(
				`SELECT count(*) As Total
				 FROM container_work_order
				 ORDER BY wono  DESC `,
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

	static async detailWoHeader(req, res, next){
		let {wono} = req.query;
		try {
			let dataOne = await container_process.sequelize.query(
				`SELECT wono, wodate, woopr, woto, wocc, wofrom, wotype FROM container_work_order
				 where wono = '${wono}'
				 ORDER BY container_work_order.wono  DESC
            `,
				{
					type: container_process.SELECT,
					plain: true
				}
			);

			let wotype = dataOne['wotype'];
			let cpopr = dataOne['woopr'];

			let dataTwo = await container_process.sequelize.query(
				`select con.crno, cc.cclength, cc.ccheight, ct.ctdesc, ct.ctcode,
						sur.svcond,con.crlastcond,con.crlastact,cp.cpopr, sur.svid
				 from tblcontainer con
						  inner join container_process cp on con.crcpid = cp.cpid
						  inner join container_survey sur on sur.cpid = cp.cpid
						  left join tblprincipal pr on pr.prcode = cp.cpopr
						  left join container_repair rp on rp.svid = sur.svid
						  left join tblcontainer_code cc on cc.cccode = con.cccode
						  left join tblcontainer_type ct on ct.ctcode = cc.ctcode
				 where con.crlastact='WW' and con.crlastcond = '${wotype}'
				   and cp.cpopr = '${cpopr}'
            `,
				{
					type: container_process.SELECT
				}
			);

			let resultData    = dataOne[0];
			let resultdtlData = dataTwo[0]

			baseResponse({
				message: "detail header data",
				data: {dataOne: resultData, dataTwo: resultdtlData}
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async updateAllWO(req, res, next){
		let {wonumber, crno} = req.body;

		try{

			let updateWO = await container_repair.sequelize.query(`UPDATE container_repair SET wono= '${wonumber}', 
                            rpworkdat= now() where rpcrno IN '(${crno})' and wono is null `,
				{
					type: container_repair.INSERT
				});

			let updateTblcontainer = await container_repair.sequelize.query(`update tblcontainer set crlastact='WR'
							where crno in '(${crno})' `,
				{
					type: container_repair.INSERT
				});

			baseResponse({
				message: "Success Update Data",
				data: updateWO
			})(res, 200);

		} catch(error){
			res.status(403);
			next(error);
		}
	}

	static async updateWO(req, res, next){
		let {wono, rpcrno, svid} = req.body;
		try{

			let updateWO = await container_repair.sequelize.query(`update container_repair set wono ='${wono}', 
                            rpworkdat= now() where rpcrno =  '${rpcrno}'  and svid = '${svid}' `,
				{
					type: container_repair.INSERT
				});

			let updateTblcontainer = await container_repair.sequelize.query(`update tblcontainer set crlastact='WR'
							where crno =  '${rpcrno}' `,
				{
					type: container_repair.INSERT
				});

			baseResponse({
				message: "Success Update Data",
				data: updateWO
			})(res, 200);

		} catch(error){
			res.status(403);
			next(error);
		}
	}

	static async listComboBox(req, res, next){
		let {wotype, cpopr} = req.query;
		try {
			let datas = await container_process.sequelize.query(
				`select con.crno, cc.cclength, cc.ccheight, ct.ctdesc, ct.ctcode,
						sur.svcond,con.crlastcond,con.crlastact,cp.cpopr, sur.svid
				 from tblcontainer con
						  inner join container_process cp on con.crcpid = cp.cpid
						  inner join container_survey sur on sur.cpid = cp.cpid
						  left join tblprincipal pr on pr.prcode = cp.cpopr
						  left join container_repair rp on rp.svid = sur.svid
						  left join tblcontainer_code cc on cc.cccode = con.cccode
						  left join tblcontainer_type ct on ct.ctcode = cc.ctcode
				 where con.crlastact='WW' and con.crlastcond = '${wotype}'
				   and cp.cpopr = '${cpopr}'
            `,
				{
					type: container_process.SELECT
				}
			);
			let allData = datas[0];
			baseResponse({
				message: "list combo box Data",
				data: {allData}
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async insertData(req, res, next){
		let {wono, wodate, wocomp, woto, wocc, wofrom, woopr, wonotes, wotype, wocrton, wocrtby, womdfon, womdfby} = req.body;
		try {
			let payloadWO = await container_work_order.create({
				wono: wono,
				wodate: wodate,
				wocomp: wocomp,
				woto: woto,
				wocc: wocc,
				wofrom: wofrom,
				woopr: woopr,
				wonotes: wonotes,
				wotype: wotype,
				wocrton: wocrton,
				wocrtby: wocrtby,
				womdfon: womdfon,
				womdfby: womdfby,
			});

			baseResponse({
				message: "Success Insert Data",
				data: payloadWO
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteWO(req, res, next){
			let {rpcrno, svid} = req.body;
		try{

			let deleteWO = await container_repair.sequelize.query(`update container_repair set wono ='', rpworkdat  = null
								where rpcrno = '${rpcrno}'  and svid = '${svid}' `,
				{
					type: container_repair.INSERT
				});

			let deletetblcontainer = await container_repair.sequelize.query(`update tblcontainer set crlastact='WW'
								where rpcrno = '${rpcrno}' `,
				{
					type: container_repair.INSERT
				});

			baseResponse({
				message: "Success delete Data",
				data: deleteWO
			})(res, 200);

		} catch(error){
			res.status(403);
			next(error);
		}
	}

	static async getWOnumber(req, res, next){
		try {

			/**
			 * Format
			 * prefix[SV] + 'paktrasl' + 'sdcode' + 8digit_number
			 */

				// get data company.
			let resultCompany = await company.findAll({});
			let paktrasl = resultCompany[0].dataValues.paktrasl;
			let sdcode = resultCompany[0].dataValues.sdcode;
			let prefixCode = "WO";

			// get data repo order
			let resultSurvey = await container_work_order.findOne({
				where: {
					wono: { [Op.like]: `%WO%`}
				},
				order:[[ "wono", "DESC"]]
			});

			if (resultSurvey === null) {

				const resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
				baseResponse({ message: "Success Created Unix Code", data: resultCode })(res, 200);
			} else {

				let resultDataSurvey = resultSurvey.dataValues.wono;
				let resultSubstringDataSurvey = resultDataSurvey.substring(7,16);
				let convertInt = parseInt(resultSubstringDataSurvey) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				const resultCode = `${prefixCode}${paktrasl}${sdcode}${number}`;

				baseResponse({ message: "Success Created Unix Code", data: resultCode })(res, 200);

			}
		} catch (error) {
			res.status(500);
			next(error);
		}
	}
}

module.exports = WorkOrderController;
