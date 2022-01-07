"use strict";

const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
require("dotenv").config();
const Op = Sequelize.Op;

const baseResponse = require("../../utils/helper/Response");
const {
	container_process,
	company,
	orderContainerRepo,
	voyage,

	container,
	container_code,
	orderRepoContainer,
} = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class RepoInController {
	/**
	 * @REPO  REPO PRA IN - Header
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 */

	static async list(req, res, next) {
		try {
			let data = await container_process.sequelize.query(
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
            WHERE retype like 'RI%'
            `,
				{
					type: container_process.SELECT,
				}
			);
			let datas = data[0];
			baseResponse({ message: "List Repo In", data: { datas } })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async remainingRepo(req, res, next) {
		try {
			let datas = await container_process.sequelize.query(
				`SELECT count(*) as Total
				FROM container_process a
				inner join tblcontainer c on a.crno = c.crno 
				where cpitgl='0000-00-00' 
				and cpiorderno='".getparam(cpiprano,"")."'`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "List Remaining Repo",
				data: { datas: datas[0] },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async searchCompleteRepo(req, res, next) {
		try {
			let datas = await container_process.sequelize.query(
				`select count(*) as Total
				from container_process a
				inner join tblcontainer c on a.crno = c.crno
				where cpitgl 
				and cpiorderno='".getparam(cpiprano,"")."'`,
				{
					type: container_process.SELECT,
				}
			);

			baseResponse({
				message: "List Complete Repo",
				data: { datas: datas[0] },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async searchTotalPackage(req, res, next) {
		try {
			let package1 = await container_process.sequelize.query(
				`select b.revpack20
				from container_process a 
				inner join order_container_repo b on b.reorderno = a.cpiorderno
				left join tblprincipal c on c.prcode = a.cpopr
				left join tblcontainer d on d.crcpid = a.cpid
				left join tblcontainer_code e on d.cccode = d.cccode
				left join tblrepo_tariff f on f.prcode = c.prcode
				left join tblrepo_tariffdetail g on g.prcode = c.prcode 
		 		and g.rttype = b.retype
				where a.cpiprano='".trim(getparam(cpiprano,""))."'`,
				{
					type: container_process.SELECT,
				}
			);

			let package2 = await container_process.sequelize.query(
				`select b.revpack40
              from container_process a 
              inner join order_container_repo b on b.reorderno = a.cpiorderno
              left join tblprincipal c on c.prcode = a.cpopr
              left join tblcontainer d on d.crcpid = a.cpid
              left join tblcontainer_code e on d.cccode = d.cccode
              left join tblrepo_tariff f on f.prcode = c.prcode
              left join tblrepo_tariffdetail g on g.prcode = c.prcode 
       		  and g.rttype = b.retype
          	  where a.cpiprano='".trim(getparam(cpiprano,""))."'`,
				{
					type: container_process.SELECT,
				}
			);

			let package3 = await container_process.sequelize.query(
				`select b.revpack45
				from container_process a 
				inner join order_container_repo b on b.reorderno = a.cpiorderno
				left join tblprincipal c on c.prcode = a.cpopr
				left join tblcontainer d on d.crcpid = a.cpid
				left join tblcontainer_code e on d.cccode = d.cccode
				left join tblrepo_tariff f on f.prcode = c.prcode
				left join tblrepo_tariffdetail g on g.prcode = c.prcode 
		  		and g.rttype = b.retype
				where a.cpiprano='".trim(getparam(cpiprano,""))."'`,
				{
					type: container_process.SELECT,
				}
			);

			let totpack1 = await container_process.sequelize.query(
				`select b.reother1
				from container_process a 
				inner join order_container_repo b on b.reorderno = a.cpiorderno
				left join tblprincipal c on c.prcode = a.cpopr
				left join tblcontainer d on d.crcpid = a.cpid
				left join tblcontainer_code e on d.cccode = d.cccode
				left join tblrepo_tariff f on f.prcode = c.prcode
				left join tblrepo_tariffdetail g on g.prcode = c.prcode 
		  		and g.rttype = b.retype
				where a.cpiprano='".trim(getparam(cpiprano,""))."'`,
				{
					type: container_process.SELECT,
				}
			);

			let totpack2 = await container_process.sequelize.query(
				`select b.reother2
				from container_process a 
				inner join order_container_repo b on b.reorderno = a.cpiorderno
				left join tblprincipal c on c.prcode = a.cpopr
				left join tblcontainer d on d.crcpid = a.cpid
				left join tblcontainer_code e on d.cccode = d.cccode
				left join tblrepo_tariff f on f.prcode = c.prcode
				left join tblrepo_tariffdetail g on g.prcode = c.prcode 
		 		and g.rttype = b.retype
				where a.cpiprano='".trim(getparam(cpiprano,""))."'`,
				{
					type: container_process.SELECT,
				}
			);

			let package20 = await container_process.sequelize.query(
				`select count(*) as Total from container_process a
				inner join tblcontainer c on a.crno = c.crno
				inner join tblcontainer_code d on c.cccode = d.cccode 
				where d.cclength='20' 
				and a.cpiorderno = '".getparam("cpiprano","")."'`,
				{
					type: container_process.SELECT,
				}
			);

			let package40 = await container_process.sequelize.query(
				`select count(*) as Total from container_process a
             	inner join tblcontainer c on a.crno = c.crno
               	inner join tblcontainer_code d on c.cccode = d.cccode 
         		where d.cclength='40' 
         		and a.cpiorderno = '".getparam("cpiprano","")."'`,
				{
					type: container_process.SELECT,
				}
			);

			let package45 = await container_process.sequelize.query(
				`select count(*) as Total from container_process a
				inner join tblcontainer c on a.crno = c.crno
				inner join tblcontainer_code d on c.cccode = d.cccode 
				where d.cclength='45' 
				and a.cpiorderno = '".getparam("cpiprano","")."'`,
				{
					type: container_process.SELECT,
				}
			);

			let revpacktot20 = package20[0] * package1;
			let revpacktot40 = package40[0] * package2;
			let revpacktot45 = package45[0] * package3;

			let subtotpack = revpacktot20 + revpacktot40 + revpacktot45;
			let totpack = subtotpack + totpack1 + totpack2;

			baseResponse({ message: "Total Package", data: { totpack } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteHeaderRepo(req, res, next) {
		let { cpiorderno } = req.params;
		try {
			let datas = await container_process.sequelize.query(
				`delete from order_container_repo 
				where reorderno="${cpiorderno}"
            `,
				{
					type: container_process.DELETE,
				}
			);

			baseResponse({ message: "Deleted Header Repo", data: { datas } })(
				res,
				200
			);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async insertRepoIn(req, res, next) {
		let {
			voyno,
			vesid,
			retype,
			voyid,
			cpopr,
			cpcust,
			cpidish,
			cpijam,
			cpdepo,

			spdepo,
			cpideliver,
			cpidisdat,
			cpichrgbb,
			cpipratgl,

			retfrom,
			retto,
			replace1,
			readdr,

			recity,
			reautno,
			redate,
			redline,

			recpack20,
			revpack20,
			recpack40,
			revpack40,

			recpack45,
			revpack45,
			recpacktot20,
			revpacktot20,

			recpacktot40,
			revpacktot40,
			recpacktot45,
			revpacktot45,

			reclift,
			revlift,
			reappv,
			redoc,

			recdoc,
			revdoc,
			rechaul20,
			re20,

			rechaultot20,
			retot20,
			rechaul40,
			re40,

			rechaultot40,
			retot40,
			rechaul45,
			re45,

			rechaultot45,
			retot45,
			subtotcurpack,
			subtotpack,

			subtotcurbreak,
			subtotbreak,
			subtotcurcharge1,
			reother1,

			subtotcurcharge2,
			reother2,
			totcurall,
			rebill,

			reismtcon,
			reischarged,
			repocode,
		} = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;

		try {
			/**
			 * Make UNIX Numbering System
			 * Format CONTAINER PROCESS CODE
			 * prefix[CI] + 'paktrasl' + 'sdcode' + 8digit_number
			 */

			// get data company.
			let resultCompany = await company.findAll({});
			let paktrasl = resultCompany[0].dataValues.paktrasl;
			let sdcode = resultCompany[0].dataValues.sdcode;
			let prefixCode = {
				containerProcess: "CP",
				orderContainerRepo: repocode,
			};

			// get data container process
			let resultOrderPra = await container_process.findOne({
				order: [["cpid", "DESC"]],
			});

			// get data order container process},
			let resultOrderContainerRepo = await orderContainerRepo.findOne({
				where: { reorderno: { [Op.like]: "RI%" } },
				order: [["reorderno", "DESC"]],
			});

			var resultCodeContainerProcess;
			if (resultOrderPra === null) {
				resultCodeContainerProcess = `${prefixCode.containerProcess}${paktrasl}${sdcode}00000001`;
			} else {
				let resultDataOrderPra = resultOrderPra.dataValues.cpid;
				let resultSubstringDataOrderPra = resultDataOrderPra.substring(7, 16);
				let convertInt = parseInt(resultSubstringDataOrderPra) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				// eslint-disable-next-line no-unused-vars
				resultCodeContainerProcess = `${prefixCode.containerProcess}${paktrasl}${sdcode}${number}`;
			}

			var resultCodeOrderContainerRepo;
			if (resultOrderContainerRepo === null) {
				resultCodeOrderContainerRepo = `${prefixCode.orderContainerRepo}${paktrasl}${sdcode}00000001`;
			} else {
				let resultDataOrderPra = resultOrderContainerRepo.dataValues.reorderno;
				let resultSubstringDataOrderPra = resultDataOrderPra.substring(7, 16);
				let convertInt = parseInt(resultSubstringDataOrderPra) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				// eslint-disable-next-line no-unused-vars
				resultCodeOrderContainerRepo = `${prefixCode.orderContainerRepo}${paktrasl}${sdcode}${number}`;
			}

			let sqlvoy = await voyage.sequelize.query(
				`select * from tblvoyage
				 where voyno = "${voyno}" and vesid = "${vesid}"`,
				{
					type: voyage.SELECT,
				}
			);

			var dataVoyId;
			if (sqlvoy[0].length === 1) {
				dataVoyId = sqlvoy[0][0].voyid;
			} else {
				// insert to tabel voyage

				let payloadVoyage = await voyage.create({
					vesid: vesid,
					voyno: voyid,
					voyeta: new Date(),
					voyta: new Date(),

					voyetberth: new Date(),
					voytberth: new Date(),
					voyetd: new Date(),
					voytd: new Date(),
				});
				dataVoyId = payloadVoyage.dataValues.voyid;
			}

			var payloadContainerProcess;

			payloadContainerProcess = await container_process.create({
					cpid: resultCodeContainerProcess,
					cpopr: cpopr,
					cpcust: cpcust,
					cpidish: cpidish,

					cpijam: cpijam,
					cpichrgbb: cpichrgbb,
					cpivoyid: dataVoyId,

					cpdepo: cpdepo,
					spdepo: spdepo,
					cpiorderno: resultCodeOrderContainerRepo,
					cpideliver: cpideliver,

					cpife: 0,
					cpiprano: resultCodeOrderContainerRepo,
					cpipratgl: cpipratgl,
					cpiterm: "mty",

					cpistatus: "re",
					cpicrton: new Date(),
					cpicrtby: usernameByToken,
					cpivoy: voyid,

					cpives: vesid,
			});


			const payloadOrderContainerRepo = await orderContainerRepo.create({
				reorderno: resultCodeOrderContainerRepo,
				retype: retype,
				retfrom: retfrom,
				retto: retto,

				replace1: replace1,
				readdr: readdr,
				recity: recity,
				reautno: reautno,

				redline: redline,
				redate: redate,
				recpack20: recpack20,
				revpack20: revpack20,

				recpack40: recpack40,
				revpack40: revpack40,
				recpack45: recpack45,
				revpack45: revpack45,

				recpacktot20: recpacktot20,
				revpacktot20: revpacktot20,
				recpacktot40: recpacktot40,
				revpacktot40: revpacktot40,

				recpacktot45: recpacktot45,
				revpacktot45: revpacktot45,
				reclift: reclift,
				revlift: revlift,

				reappv: reappv,
				redoc: redoc,
				recdoc: recdoc,
				revdoc: revdoc,

				rechaul20: rechaul20,
				re20: re20,
				rechaultot20: rechaultot20,
				retot20: retot20,
				rechaul40: rechaul40,

				re40: re40,
				rechaultot40: rechaultot40,
				retot40: retot40,
				rechaul45: rechaul45,

				re45: re45,
				rechaultot45: rechaultot45,
				retot45: retot45,
				subtotcurpack: subtotcurpack,

				subtotpack: subtotpack,
				subtotcurbreak: subtotcurbreak,
				subtotbreak: subtotbreak,
				subtotcurcharge1: subtotcurcharge1,

				reother1: reother1,
				subtotcurcharge2: subtotcurcharge2,
				reother2: reother2,
				totcurall: totcurall,

				rebill: rebill,
				reismtcon: reismtcon,
				reischarged: reischarged,

				recrton: new Date(),
				recrtby: usernameByToken,
			});

			let succesMessage = {
				"succes created container process": payloadContainerProcess,
				"succes created order Container Repo": payloadOrderContainerRepo,
			};

			baseResponse({
				message: "succes created repo praIn",
				data: succesMessage,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	/**
	 * @REPO  REPO PRA IN - Detail
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 */

	static async viewDataRepoInDetails(req, res, next) {
		try {
			let data = await container_process.sequelize.query(
				`	select a.crno,b.crno,b.cccode,c.cccode,c.ctcode,
					c.cclength,c.ccheight,b.mtcode,a.cpiremark
		  			from container_process a 
		  			inner join tblcontainer b on b.crno = a.crno
		  			inner join tblcontainer_code c on c.cccode = b.cccode
            `,
				{
					type: container_process.SELECT,
				}
			);
			let datas = data[0];
			baseResponse({ message: "List Repo In Detail", data: { datas } })(
				res,
				200
			);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async insertPraRepoInDetail(req, res, next) {
		let {
			crno,
			cccode,
			cpiorderno,
			mtcode,

			cpopr,
			cpcust,
			cpidish,
			cpijam,
			cpdepo,

			cpideliver,
			cpidisdat,
			cpichrgbb,
			cpipratgl,

			cpives,
			cpiremark,
			cpivoyid,
			cpivoy,

			repoid,
			ctcode,
			cclength,

			ccheight,
			repofe,
			reposhold,
			reporemark,

			repogatedate,
			repoflag,
		} = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;

		try {
			/**
			 * Make UNIX Numbering System
			 * Format CONTAINER PROCESS CODE
			 * prefix[CP] + 'paktrasl' + 'sdcode' + 8digit_number
			 */

			// get data company.
			let resultCompany = await company.findAll({});
			let paktrasl = resultCompany[0].dataValues.paktrasl;
			let sdcode = resultCompany[0].dataValues.sdcode;
			let prefixCode = {
				containerProcess: "CP",
			};

			// get data container process
			let resultOrderPra = await container_process.findOne({
				order: [["cpid", "DESC"]],
			});

			var resultCodeContainerProcess;
			if (resultOrderPra === null) {
				resultCodeContainerProcess = `${prefixCode.containerProcess}${paktrasl}${sdcode}00000001`;
			} else {
				let resultDataOrderPra = resultOrderPra.dataValues.cpid;
				let resultSubstringDataOrderPra = resultDataOrderPra.substring(7, 16);
				let convertInt = parseInt(resultSubstringDataOrderPra) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				// eslint-disable-next-line no-unused-vars
				resultCodeContainerProcess = `${prefixCode.containerProcess}${paktrasl}${sdcode}${number}`;
			}
			// check available container code
			let containerCheck = await container.sequelize.query(
				` select con.crlastact,cp.crno,cp.cpiorderno,max(cp.cpid) from container_process cp,
				tblcontainer con where
				cp.crno = con.crno and con.crlastact <> 'od' and cp.crno='${crno}'
			    group by cp.crno, con.crlastact,cp.cpiorderno`,
				{
					type: container.SELECT,
				}
			);

			if (containerCheck[0].length === 0) {
				// check for valid container code!
				let containerCodeCheck = await container_code.sequelize.query(
					` select  cccode from  tblcontainer_code 
					where cccode='${cccode}'`,
					{
						type: container_code.SELECT,
					}
				);
				if (containerCodeCheck[0].length === 1) {
					/**
					 * cpichrgbb
					 *  value 1 / 0
					 */

					//searching repo type
					let orderContainerRepoCheck =
						await orderContainerRepo.sequelize.query(
							` select retype from  order_container_repo 
							where reorderno='${cpiorderno}'`,
							{
								type: orderContainerRepo.SELECT,
							}
						);

					var restContainerProcess;
					if (orderContainerRepoCheck[0][0].retype === 22) {
						restContainerProcess = await container_process.create({
							cpid: resultCodeContainerProcess,
							crno: crno,
							cpopr: cpopr,
							cpcust: cpcust,
							cpidish: cpidish,

							cpidisdat: cpidisdat,
							cpdepo: cpdepo,
							cpichrgbb: cpichrgbb,

							cpipratgl: cpipratgl,
							cpijam: cpijam,
							cpishold: 0,

							cpife: 0,
							cpives: cpives,
							cpiorderno: cpiorderno,
							cpiremark: cpiremark,

							cpideliver: cpideliver,
							cpivoyid: cpivoyid,
							cpivoy: cpivoy,
							cpiterm: "mty",

							cpistatus: "re",
							cpicrton: Date.now(),
							cpicrtby: usernameByToken,
						});
					} else {
						restContainerProcess = await container_process.create({
							cpid: resultCodeContainerProcess,
							crno: crno,
							cpopr: cpopr,
							cpcust: cpcust,
							cpidish: cpidish,

							cpdepo: cpdepo,
							cpichrgbb: cpichrgbb,
							cpipratgl: cpipratgl,

							cpijam: cpijam,
							cpishold: 0,
							cpife: 0,

							cpives: cpives,
							cpiorderno: cpiorderno,
							cpiremark: cpiremark,
							cpideliver: cpideliver,

							cpivoyid: cpivoyid,
							cpivoy: cpivoy,
							cpiterm: "mty",
							cpistatus: "re",

							cpicrton: Date.now(),
							cpicrtby: usernameByToken,
						});
					}

					// insert order repo controller!
					const restOrderRepoContainer = await orderRepoContainer.create({
						repoid: repoid,
						crno: crno,
						cccode: cccode,
						ctcode: ctcode,

						cclength: cclength,
						ccheight: ccheight,
						repofe: repofe,
						reposhold: reposhold,

						reporemark: reporemark,
						repogatedate: repogatedate,

						repoflag: repoflag,
					});

					// TODO:check avalaible crno data
					let containerCRNOCheck = await container.sequelize.query(
						`select crno from tblcontainer where crno ='${crno}'`,
						{
							type: container.SELECT,
						}
					);

					var restInsertContainer;
					if (containerCRNOCheck[0].length === 0) {
						restInsertContainer = await container.create({
							crno: crno,
							cccode: cccode,

							mtcode: mtcode,
							crlastact: "bi",
							crcpid: resultCodeContainerProcess,
						});
					} else {
						await container.update(
							{
								crlastact: "bi",
								crcpid: resultCodeContainerProcess,
							},
							{ where: { crno: crno } }
						);
						restInsertContainer = await container.findOne({
							where: { crno: crno },
						});
					}

					const message = {
						"Result Insert Container Process": restContainerProcess,
						"Result Insert Order Repo Container": restOrderRepoContainer,
						"Result Insert/Update Container": restInsertContainer,
					};

					baseResponse({
						message: "succes created Repo Pra In",
						data: message,
					})(res, 200);
				} else {
					baseResponse({
						message: "id cccode/container code invalid !!!",
						data: containerCodeCheck[0],
					})(res, 400);
				}
			} else {
				baseResponse({
					message: "Data available!",
					data: containerCheck[0],
				})(res, 409);
			}
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async updateDataRepoInDetails(req, res, next) {
		const { cpid, cpiremark } = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;

		function convert(str) {
			var date = new Date(str),
				mnth = ("0" + (date.getMonth() + 1)).slice(-2),
				day = ("0" + date.getDate()).slice(-2);
			return [date.getFullYear(), mnth, day].join("-");
		}
		let date = convert(new Date());

		try {
			let data = await container_process.sequelize.query(
				` update container_process set
					cpiremark='${cpiremark}',
					cpimdfon= '${date}',
					cpimdfby='${usernameByToken}'
	        	where cpid='${cpid}'
            `,
				{
					type: container_process.UPDATE,
				}
			);
			let datas = data[0];
			baseResponse({ message: "Update Repo In Detail", data: { datas } })(
				res,
				200
			);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = RepoInController;
