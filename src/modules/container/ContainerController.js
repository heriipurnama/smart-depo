"use strict";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const baseResponse = require("../../utils/helper/Response");
const { container,container_code, container_process, container_interchange, wo_container} = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const { logger } = require('../../utils/logger');

class ContainerController {
	static async createNew(req, res, next) {
		let { crNo, dset } = req.body;
		try {
			const [payload, created] = await container.findOrCreate({ 
				where: {
					crno: crNo
				},
				defaults: dset
			});
			if(created === false){
				throw new Error(`Container Exist, cccode: ${crNo} exists!`);
			} else {
				baseResponse({ message:"Container Created " , data: payload})(res, 200);
				Logger(req);
			}
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { crNo, dset } = req.body;
		let selector = { 
			where: { 
				crno:{ [Op.like]: `%${crNo}%`}
			}
		};
		try {
			let dataContainer = await container.update(dset, selector);

			if (!dataContainer || dataContainer == 0) {
				throw new Error(`Update Container No: ${crNo} Failed!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataContainer,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { crNo } = req.body;
		
		try {
			let dataContainer = await container.findOne({ 
				where: {
					crno: { [Op.like]: `%${crNo}%`}
				},
				include:[{
					model:container_code,
					required: false // do not generate INNER JOIN
				}]
			});

			if (!dataContainer) {
				throw new Error(`Container No: ${crNo} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataContainer,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows, search, orderColumn, orderType} = req.body;
		let oc = (orderColumn == "")?"crno":orderColumn;
		let mdl = (orderColumn =="" || orderColumn == 'crno')?"container":"container_code";
		let ot = (orderType == "")?"DESC":orderType;
		try {
			let { count, rows: datas } = await container.findAndCountAll({
				offset: start,
				limit: rows,
				include:[{
					model:container_code,
					required: false // do not generate INNER JOIN
				}]
				,				
				where: {
					[Op.or]: [
					  { crno: { [Op.like]: `%${search}%`} },
					  {'$container_code.ctcode$' :{ [Op.like]: `%${search}%`}},
					  {'$container_code.cclength$' :{ [Op.like]: `%${search}%`}},
					  {'$container_code.ccheight$' :{ [Op.like]: `%${search}%`}}					  
					]
				},
				order: [[{ model: mdl }, oc, ot]]
			});
			baseResponse({ message: "list containers", data: { datas,  count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async containerSearch(req, res, next){
		let { crno, limit, offset } = req.query;
		let limits = limit == undefined ? "" : ` limit ${limit}`;
		let offsets = offset == undefined ? "" : ` offset ${offset}`;

		try {
			let repairload  = await container_process.sequelize.query(
				`select c.crno,
						m.mtdesc,
						c.crlastcond,
						c.crmandat,
						c.crlastact,
						c.crweightk,
						dp.dpname,
						sdp.sdname,
						ccp.sdcode,
						ccp.dpcode,
						ct.ctdesc,
						cc.cclength,
						cc.ccheight,
						ccp.cpiorderno,
						ccp.cpoorderno,
						cr.rptglappvpr,
						ccp.cpopr,
						ccp.cpcust,
						ccp.cpieir,
						(case when ccp.cpife = '1' then 'FULL' when ccp.cpife = '0' or ccp.cpife is null then 'EMPTY'
							 else '' end)                                                as cpife,
						(case when ccp.cpofe = '1' then 'FULL'  when (ccp.cpofe = '0' or ccp.cpofe is null) and (ccp.cpotgl is not null) then 'EMPTY'
						else '' end)  as cpofe,
						ccp.cpiterm,
						ccp.cpirefin,
						ccp.cpitgl,
						(case when ccp.cpitgl is not null then ccp.cpijam else '' end)   as cpijam,
						ccp.cpotgl,
						(case when ccp.cpotgl is not null then ccp.cpojam else '' end)   as cpojam,
						ccp.cpidish,
						ccp.cpireceptno,
						ccp.cporeceptno,
						ccp.cpoload,
						ccp.cpoloaddat,
						ccp.cpoloadjam,
						ccp.cpiseal,
						ccp.cpicargo,
						ccp.cpidisdat,
						ccp.cpinopol,
						ccp.cpidriver,
						cpitruck,
						cpotruck,
						ccp.cpideliver,
						ccp.cpiremark,
						ccp.cporemark,
						ccp.cporeceiv,
						ccp.cpodriver,
						ccp.cponopol,
						ccp.cpopr1,
						ccp.cpcust1,
						ccp.cporefout,
						ccp.cpocargo,
						ccp.cposeal,
						ccp.cpoterm,
						ccp.cpodesti,
						ccp.cpoeir,
						cr.rptglest,
						ccwo.wodate as rpworkdat,
						cr.rpmridat,
						cr.rpmrodat,
						cr.rpdrepair,
						cr.rptglwroke,
						cr.rpinspoke,
						ccp.cpivoy as voyin,
						ccp.cpovoy as voyout,
						ccp.cpives  as vesin,
						ccp.cpoves as vesout,
						ccp.cpid,
						cs.svsurdat,
						cs.svcond,
						si.syname,
						rp.retfrom,
						ccp.svsurdat as svsurdat_out,
						so.syname as syname_out,
						(case when cs.svsurdat is not null then 'IN' else '' end)        as svtype,
						(case when ccp.svsurdat is not null then 'OUT' else '' end)      as svtype_out,
						(case when ccp.cpotgl is not null then c.crlastcond else '' end) as svcond_out
				 from tblcontainer c
						  left join tblcontainer_code cc on c.cccode = cc.cccode
						  left join container_process ccp on c.crcpid = ccp.cpid
						  left join container_survey cs on ccp.cpid = cs.cpid
						  left join container_repair cr on cs.svid = cr.svid
						  left join container_work_order ccwo on cr.wono = ccwo.wono
						  left join tblcontainer_type ct on cc.ctcode = ct.ctcode
						  left join tblmaterial m on c.mtcode = m.mtcode
						  left join tbldepo dp on ccp.cpdepo = dp.dpcode
						  left join tblsubdepo sdp on ccp.spdepo = sdp.sdcode
						  left join tblsurveyor si on cs.syid = si.syid
						  left join tblsurveyor so on ccp.syid = so.syid
						  left join order_container_repo rp on rp.reorderno = ccp.cpiorderno
				 where c.crno ='${crno}' `,
				{
					type: container_process.SELECT,
				}
			);

			let resultData    = repairload[0];
			baseResponse({ message: "List Container", data: resultData })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {crNo} = req.body; 
		try {
			let payload = await container.destroy({
				where:{
					crno:{ [Op.like]: `%${crNo}%`}
				}
			});
			baseResponse({ message: "Success Delete Container", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async cek(req, res, next) {
		try {
			res.status(200);
			return res.json(req.body);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async checkContainerCode(req, res, next) {
		let {cContainer} = req.query;

		// let cContainer = "FKS0013"; BEAU2686690
		let len = cContainer.length;
		let mcekd = cContainer.substr(len-1,1);
		let hasil = 0;
		try {
			if (cContainer.substr(0,4).toUpperCase()== "HLCU") 
				hasil = checkDgthl(cContainer.substr(0, 10));
			else      
				hasil = checkDigit(cContainer.substr( 0, 10));
			if (hasil==mcekd) {
				let dataContainer = await container.findAndCountAll({ 
					where: {
						crno: { [Op.like]: `%${cContainer}%`}
					},
					include:[{
						model:container_code,
						required: false // do not generate INNER JOIN
					}]
				});
				let valid;
				if(dataContainer.count > 0){
					valid = true;
					baseResponse({ success:true, message: "Valid Code", data: dataContainer })(res, 200);
					Logger(req);
				} else {
					valid = false;
					baseResponse({ success:true,message: "Data Empty", data: valid })(res, 200);
					Logger(req);
				}
			} else{
				baseResponse({success:false, message: "Invalid Code", data: false })(res, 200);
				Logger(req);
			}
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async containerChange(req, res, next){
		let {crno1, crno2, orderno} = req.body;
		try {

			// -- cek dulu CRNO1
			let resulCrno1 = await container_process.sequelize.query(
				`SELECT crlastact, crlastcond, lastact 
				 FROM tblcontainer WHERE crno LIKE '${crno1}' `,
				{
					type: container_process.SELECT,
					plain: true,
				}
			);

			logger.info(`resulCrno1 ${resulCrno1}`);

			let crlastact1 = resulCrno1["crlastact"];

			let resulCrno2 = await container_process.sequelize.query(
				`SELECT crlastact, crlastcond, lastact
				 FROM tblcontainer WHERE crno LIKE '${crno2}' `,
				{
					type: container_process.SELECT,
					plain: true,
				}
			);
			logger.info(`resulCrno2 ${resulCrno2}`);
			let crlastact2 = resulCrno2["crlastact"];
			let crlastcond2 = resulCrno2["crlastcond"];
			let lastact2 = resulCrno2["lastact"];

			if (crlastact1 != 'OD' && crlastact2 == 'CO' && crlastcond2 =='AC' || lastact2 =='AC'){
				let getData = await container_process.sequelize.query(
					`SELECT cpoorderno,
							cporeceptno,
							cpopratgl,
							cporeceiv,
							cpoterm,
							cpofe,
							cpoves,
							cporefout,
							cpovoy,
							cpopr1,
							cpcust1
					 FROM container_process
					 WHERE container_process.cpid in (
						 SELECT crcpid
						 FROM tblcontainer
						 WHERE crno LIKE '${crno2}' `,
					{
						type: container_process.SELECT,
						plain: true,
					}
				);

				let cpoorderno = getData["cpoorderno"];
				let cporeceptno = getData["cporeceptno"];
				let cpopratgl = getData["cpopratgl"];
				let cporeceiv = getData["cporeceiv"];
				let cpoterm = getData["cpoterm"];
				let cpofe = getData["cpofe"];
				let cpoves = getData["cpoves"];
				let cpopr1 = getData["cpopr1"];
				let cpcust1 = getData["cpcust1"];

				logger.info(`getData ${getData}`);
				// Update ke container 2
				let containerDua = await container_process.sequelize.query(
					` update container_process
				  set
					  cpopr1 ='${cpopr1}',
					  cpcust1 ='${cpcust1}',
					  cpoorderno = '${cpoorderno}',
					  cporeceptno = '${cporeceptno}',
					  cpopratgl = '${cpopratgl}',
					  cporeceiv = '${cporeceiv}',
					  cpoves = '${cpoves}',
					  cpoterm = '${cpoterm}',
					  cpofe = '${cpofe}'
					  WHERE container_process.cpid in 
					        (SELECT crcpid FROM tblcontainer  WHERE crno LIKE '${crno2}' ) `,
					{
						type: container_process.UPDATE,
					}
				);

				// Kosongkan container 1
				let containerSatu = await container_process.sequelize.query(
					` update container_process
				  set
					  cpoorderno = '',
					  cporeceptno = '',
					  cpopratgl = null,
					  cporeceiv = '',
					  cpoves = '',
					  cpoterm = '',
					  cpofe = null,
					  cporefout ='',
					  cpovoy = null
					  WHERE container_process.cpid in
							(SELECT crcpid FROM tblcontainer  WHERE crno LIKE '${crno1}' ) `,
					{
						type: container_process.UPDATE,
					}
				);

				// update ke pra container
				let praContainer = await container_process.sequelize.query(
					` UPDATE order_pra_container SET
													 crno = '${crno2}',
													 cccode = '',
													 ctcode= '',
													 cpiremark = ''
					  WHERE crno = $crno2 and praid IN
						( SELECT praid FROM order_pra WHERE 1 AND cpiorderno = '${orderno}') `,
					{
						type: container_process.UPDATE,
					}
				);

				// Update table container
				let conUpdate = await container_process.sequelize.query(
					` UPDATE tblcontainer SET  crlastact  ='CO' WHERE crno  LIKE '${crno1}' `,
					{
						type: container_process.UPDATE,
					}
				);

				baseResponse({ message: "Success change container", data: conUpdate })(res, 200);
				Logger(req);
				logger.info(req);
			}else {
				baseResponse({ message: "failed outdepo", data: payload })(res, 200);
				Logger(req);
				logger.info(req);
			}


		} catch (error) {
			logger.error(error);
			res.status(403);
			next(error);
		}
	}
}


let checkDigit = (arg1) =>{
	let anilai = [];
	let jmd = 0;
	let Y = 0;
	for (let i = 1; i < 11; i++) {
		if (i==1)
			anilai[1] = 1;
		else if (i==2) 
			anilai[i] = anilai[i - 1] + 1;
		else
			anilai[i] = anilai[i - 1] * 2;
        
	}

	for (let i = 1; i < 11; i++) {
		let X = arg1.substr(i-1, 1);

		switch (X) {
		case "A": Y = 10;break;
		case "B": Y = 12;break;
		case "C": Y = 13;break;
		case "D": Y = 14;break;
		case "E": Y = 15;break;
		case "F": Y = 16;break;
		case "G": Y = 17;break;
		case "H": Y = 18;break;
		case "I": Y = 19;break;
		case "J": Y = 20;break;
		case "K": Y = 21;break;
		case "L": Y = 23;break;
		case "M": Y = 24;break;
		case "N": Y = 25;break;
		case "O": Y = 26;break;
		case "P": Y = 27;break;
		case "Q": Y = 28;break;
		case "R": Y = 29;break;
		case "S": Y = 30;break;
		case "T": Y = 31;break;
		case "U": Y = 32;break;
		case "V": Y = 34;break;
		case "W": Y = 35;break;
		case "X": Y = 36;break;
		case "Y": Y = 37;break;
		case "Z": Y = 38;break;
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9": Y=X;break;
		default : Y=0;
		}
		jmd = jmd + Y * anilai[i];

	}
	let hasil = jmd - Math.floor(jmd / 11) * 11;
	if (hasil == 10) 
		hasil = 0;
	return hasil;
    
};

let checkDgthl = (arg1)=> {
	let anilai = [];
	let jmd = 0;
	let Y = 0;

	for (let i = 1; i < 11; i++) {
		if (i==1)
			anilai[1] = 1;
		else if (i==2) 
			anilai[i] = anilai[i - 1] + 1;
		else
			anilai[i] = anilai[i - 1] * 2;
	}

	for (let i = 1; i < 11; i++) {
		let X = arg1.substr(i-1, 1);
		switch (X) {
		case "A": Y = 10;break;
		case "B": Y = 12;break;
		case "C": Y = 13;break;
		case "D": Y = 14;break;
		case "E": Y = 15;break;
		case "F": Y = 16;break;
		case "G": Y = 17;break;
		case "H": Y = 18;break;
		case "I": Y = 19;break;
		case "J": Y = 20;break;
		case "K": Y = 21;break;
		case "L": Y = 23;break;
		case "M": Y = 24;break;
		case "N": Y = 25;break;
		case "O": Y = 26;break;
		case "P": Y = 27;break;
		case "Q": Y = 28;break;
		case "R": Y = 29;break;
		case "S": Y = 30;break;
		case "T": Y = 31;break;
		case "U": Y = 32;break;
		case "V": Y = 34;break;
		case "W": Y = 35;break;
		case "X": Y = 36;break;
		case "Y": Y = 37;break;
		case "Z": Y = 38;break;
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9": Y=X;break;
		default : Y=0;
		}
		jmd = jmd + Y * anilai[i];
	}
	let hasil = jmd - Math.floor(jmd / 11) * 11;
	if (hasil == 10) 
		hasil = 0;
	return hasil;
};

module.exports = ContainerController;
