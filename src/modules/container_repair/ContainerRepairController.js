"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_repair, container_type, container_process} = require("../../db/models");

class ContainerRepairController {

	static async listMnr(req, res, next) {
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
                  pr.PRCODE = cp.CPOPR Where surv.TYPE='1' ${searchs} and con.crlastact ='CO'
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
                  pr.PRCODE = cp.CPOPR Where surv.TYPE='1' and con.crlastact ='CO'`,
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
	// static async createNew(req, res, next) {
	// 	let { ccCode, ctCode, ccLength, ccHeight, ccAlias1, ccAlias2, idUser } = req.body;
	// 	try {
	// 		// const payload = await container_repair.create({
	// 		// 	cccode: ccCode,
	// 		// 	ctcode: ctCode,
	// 		// 	cclength: ccLength,
	// 		// 	ccheight: ccHeight,
	// 		// 	created_at: Date.now(),
	// 		// 	created_by: idUser,
	// 		// });

	// 		const [payload, created] = await container_repair.findOrCreate({
	// 			where: {
	// 				cccode: ccCode
	// 			},
	// 			defaults: {
	// 				cccode: ccCode,
	// 				ctcode: ctCode,
	// 				cclength: ccLength,
	// 				ccheight: ccHeight,
	// 				ccalias1: ccAlias1,
	// 				ccalias2: ccAlias2
	// 			}
	// 		});
	// 		if(created === false){
	// 			throw new Error(`Container Exist, cccode: ${ccCode} exists!`);
	// 		} else {
	// 			baseResponse({ message:"Container Created " , data: payload})(res, 200);
	// 			Logger(req);
	// 		}
	// 	} catch (error) {
	// 		res.status(400);
	// 		next(error);
	// 	}
	// }

	// static async update(req, res, next) {
	// 	let { ccCode, ctCode, ccLength, ccHeight, ccAlias1, ccAlias2, idUser, idContainer } = req.body;
	// 	let dataUpdate = {
	// 		cccode:ccCode,
	// 		ctcode: ctCode,
	// 		cclength: ccLength,
	// 		ccheight: ccHeight,
	// 		ccalias1: ccAlias1,
	// 		ccalias2: ccAlias2
	// 	};
	// 	let selector = {
	// 		where: { cccode: ccCode }
	// 	};
	// 	try {
	// 		let containerCode = ccCode;
	// 		let dataContainer = await container_repair.update(dataUpdate, selector);

	// 		if (!dataContainer) {
	// 			throw new Error(`container ${containerCode} doesn't exists!`);
	// 		}
	// 		baseResponse({
	// 			message: "Update Success",
	// 			data: dataContainer,
	// 		})(res, 200);
	// 		Logger(req);
	// 	} catch (error) {
	// 		res.status(403);
	// 		next(error);
	// 	}
	// }

	// static async listOne(req, res, next) {
	// 	let { ccCode } = req.body;

	// 	try {
	// 		let dataContainer = await container_repair.findOne({
	// 			attributes: {
	// 				exclude: ["createdAt", "updatedAt"]
	// 			},
	// 			where: {
	// 				cccode: ccCode
	// 			}
	// 		});

	// 		if (!dataContainer) {
	// 			throw new Error(`container code: ${ccCode} doesn't exists!`);
	// 		}
	// 		baseResponse({
	// 			message: "Get Data Success",
	// 			data: dataContainer,
	// 		})(res, 200);
	// 	} catch (error) {
	// 		res.status(403);
	// 		next(error);
	// 	}
	// }

	static async list(req, res, next) {
		let { start, rows } = req.body;

		try {
			let { count, rows: datas } = await container_repair.findAndCountAll({
				offset: start,
				limit: rows,
				include: [
					{
						model: container_type,
						required: false, // do not generate INNER JOIN
					},
				],
			});
			baseResponse({ message: "list container codes", data: { datas, count } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	// static async delete(req, res, next) {
	// 	let {ccCode} = req.body;
	// 	try {
	// 		let payload = await container_repair.destroy({
	// 			where:{cccode: ccCode}
	// 		});
	// 		baseResponse({ message: "Success Delete Container Code", data: payload })(res, 200);
	// 		Logger(req);
	// 	} catch (error) {
	// 		res.status(403);
	// 		next(error);
	// 	}
	// }

	// static async cek(req, res, next) {
	// 	try {
	// 		res.status(200);
	// 		return res.json(req.body);
	// 	} catch (error) {
	// 		res.status(403);
	// 		next(error);
	// 	}
	// }
}

module.exports = ContainerRepairController;
