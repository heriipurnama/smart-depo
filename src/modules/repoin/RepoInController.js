"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");

class RepoInController {
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
			console.log("package1", package1);
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
			console.log("package2", package2);
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
			console.log("package3", package3);
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
			console.log("totpack1", totpack1);
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
			console.log("totpack2", totpack2);
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
			console.log("package20", package20);
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
			console.log("package40", package40);
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
			console.log("package45", package45);
			let revpacktot20 = package20[0] * package1;
			let revpacktot40 = package40[0] * package2;
			let revpacktot45 = package45[0] * package3;

			let subtotpack = revpacktot20 + revpacktot40 + revpacktot45;
			let totpack = subtotpack + totpack1 + totpack2;

			console.log("totpack", totpack);

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
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = RepoInController;
