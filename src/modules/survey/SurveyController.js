"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_survey, company } = require("../../db/models");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


class SurveyController {
	static async list(req, res, next) {
		let { limit, offset } = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;

		try {
			let datas = await container_survey.sequelize.query(
				`select SVY.SVID,CON.CRNO,PR.PRCODE, 
                CASE CP.CPITGL WHEN DATE_FORMAT(CP.CPITGL,'%d/%m/%Y')='00/00/0000' THEN '' ELSE DATE_FORMAT(CP.CPITGL,'%d/%m/%Y') END AS CPITGL,
                DATE_FORMAT(SVY.SVSURDAT,'%d/%m/%Y') as SVSURDAT,SVY.SVCOND
                from tblcontainer CON 
                INNER JOIN container_process CP ON CON.CRCPID = CP.CPID
                INNER JOIN container_survey SVY ON CP.CPID=SVY.CPID
                LEFT JOIN tblprincipal PR ON PR.PRCODE = CP.CPOPR
                LEFT JOIN tbldebitur DEB ON PR.CUCODE = DEB.CUCODE
                LEFT JOIN tblcontainer_code CC ON CON.CCCODE = CC.CCCODE
                LEFT JOIN tblcontainer_leasing CL ON CL.LEORDERNO=CP.CPIPRANO
                LEFT JOIN tblmaterial MAT ON CON.MTCODE=MAT.MTCODE
                LEFT JOIN tbldepo DP ON CP.DPCODE=DP.DPCODE
                LEFT JOIN tblsubdepo SD ON CP.SDCODE = SD.SDCODE WHERE CON.CRLASTACT = 'WE' 
                ORDER BY SVY.SVID DESC
                LIMIT ${limits} OFFSET ${offsets}
                `,
				{
					type: container_survey.SELECT,
				}
			);

			let TotalDatas = await container_survey.sequelize.query(
				`SELECT count(*) As Total
				FROM tblcontainer CON 
                INNER JOIN container_process CP ON CON.CRCPID = CP.CPID
                INNER JOIN container_survey SVY ON CP.CPID=SVY.CPID
                LEFT JOIN tblprincipal PR ON PR.PRCODE = CP.CPOPR
                LEFT JOIN tbldebitur DEB ON PR.CUCODE = DEB.CUCODE
                LEFT JOIN tblcontainer_code CC ON CON.CCCODE = CC.CCCODE
                LEFT JOIN tblcontainer_leasing CL ON CL.LEORDERNO=CP.CPIPRANO
                LEFT JOIN tblmaterial MAT ON CON.MTCODE=MAT.MTCODE
                LEFT JOIN tbldepo DP ON CP.DPCODE=DP.DPCODE
                LEFT JOIN tblsubdepo SD ON CP.SDCODE = SD.SDCODE WHERE CON.CRLASTACT = 'WE' `,
				{
					type: container_survey.SELECT,
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

	static async checkValid(req, res, next) {
		let { CRNO, CRLASTACT}= req.query;
		try{
			let validCrno = await container_survey.sequelize.query(
				`SELECT CRLASTACT FROM tblcontainer WHERE CRNO LIKE '%${CRNO}%' AND CRLASTACT = '${CRLASTACT}' `,
				{
					type: container_survey.SELECT,
					plain: true
				}
			);
			let valid;
			if (validCrno !== null){

				valid = (validCrno['CRLASTACT'] == 'WS')?'valid':'invalid';
			} else {
				valid = 'invalid';
			}
			baseResponse({
				message: "Check Valid",
				data: {valid},
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async getDetail(req, res, next){
		let {CRNO}= req.query;
		try{
			let details = await container_survey.sequelize.query(
				`select container_process.cpireceptno,container_survey.svcrno,container_survey.svnotes,tblcontainer_code.cccode,tblcontainer_code.ctcode,tblcontainer_code.cclength,tblcontainer_code.ccheight,tblcontainer.mtcode as mtcode1,
				tblcontainer.crcdp,tblcontainer.cracep,tblcontainer.crcsc,container_process.cpitgl,tblcontainer.crweightk,tblcontainer.crweightl,tblcontainer.crtarak,tblcontainer.crtaral,
				tblcontainer.crnetk,tblcontainer.crnetl,tblcontainer.crvol,tblmaterial.mtdesc,tblcontainer.crmanuf,tblcontainer.crpos,
				date_format(container_survey.svsurdat,'%d/%m/%y') as svsurdat,
				date_format(container_process.cpipratgl,'%d/%m/%y') as cpipratgl,
				tblcontainer.crbay,tblcontainer.crrow,tblcontainer.crtier,tblcontainer.crlastcond,tblcontainer.crlastconde,container_process.manufdate,
				tblcontainer.crlastact,container_process.cpishold,container_process.cpiprano,container_process.cpiorderno,container_process.cpieir,container_process.cpirefin,container_survey.svcond,
				container_process.cpodesti,container_process.cpijam,container_process.cpichrgbb,container_process.cpipaidbb,container_process.cpife,container_process.cpiterm,container_process.cpidish,container_process.cpidisdat,
				container_process.cpives,container_process.cpicargo,container_process.cpiseal,container_process.cpivoyid,container_process.cpives,container_process.cpideliver,container_process.cpidpp,
				container_process.cpidriver,container_process.cpinopol,container_process.cpiremark,container_process.cpinotes,tblvoyage.voyno,tblvoyage.vesid,tblvessel.vesopr,tblprincipal.prcode,tbldebitur.cucode
						from tblcontainer
						left join container_process on tblcontainer.crcpid = container_process.cpid
						left join container_survey on container_process.cpid = container_survey.cpid
						left join tblcontainer_code on tblcontainer.cccode = tblcontainer_code.cccode
						left join tblmaterial on tblcontainer.mtcode = tblmaterial.mtcode
						left join tblvoyage on tblvoyage.voyid = container_process.cpivoyid	
						left join tblvessel on tblvessel.vesid = container_process.cpives
						left join tblprincipal on tblprincipal.prcode = container_process.cpopr
						left join tbldebitur on tblprincipal.cucode = tbldebitur.cucode
				where tblcontainer.crno = '${CRNO}' `,
				{
					type: container_survey.SELECT,
					plain: true
				}
			);
			
			baseResponse({
				message: "Data Detail",
				data: {datas:details},
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async createData(req, res, next) {
		let { SVID, SYID, SVCRNO, SVSURDAT, SVCOND, SVCRTON, SVCRTBY, 
			SVNOTES, CRNO, CPIORDERNO, CRCMANDAT, CRCDP, CRACEP, CRCSC, CTCODE, MTCODE1,
			CRWEIGHTK, CRWEIGHTL, CRTARAK, CRTARAL, CRNETK, CRNETL, CRVOL, MANUFDATE, CRLASTCOND, CRLASTCONDE, CRBAY, CRPOS, CRROW, CRTIER,CRMANUF
		} = req.body;
		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];
		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;
		let $CRCDP = (CRCDP != undefined)? 0 : 1;
		let	$CRCSC = (CRCSC != undefined)? 0 : 1;
		let	$CRACEP = (CRACEP != undefined)? 0 : 1;
		let	$CRMANDAT = CRCMANDAT;
		var $TYPE_SURVEY="", $CPID="";
		var now = (new Date()).toISOString().split('T')[0];
		var $updateTBLcontainer;
		let $TableName1 = 'tblcontainer';
		
		let checkContainer = await container_survey.sequelize.query(`SELECT CRNO,CRLASTACT from tblcontainer where CRNO='${CRNO}'`,
							{
								type: container_survey.SELECT,
								plain: true
							});
		let $CRLASTACT = (checkContainer == null)?"":checkContainer['CRLASTACT'];
		// if($CRLASTACT.trim()!='WS' ){
		if($CRLASTACT.trim()=='WS' ){
			var MyResult = await container_survey.sequelize.query(`SELECT CPID, CPISTATUS from container_process where CRNO='${CRNO}' and CPIORDERNO = '${CPIORDERNO}'`,
			{
				type: container_survey.SELECT,
				plain: true
			});
			
			if(MyResult !=null){
				let $CPISTATUS = MyResult['CPISTATUS'];
				$CPID =  MyResult['CPID'];
				switch($CPISTATUS.trim()){
					case 'NO': //Pra In
					$TYPE_SURVEY='IN';
					break;
					case 'OF': //Leasing
					$TYPE_SURVEY='OF';
					break;
					case 'RE': //Repo PraIn
					$TYPE_SURVEY='EN';
					break;
				}
			}
		}
		
		
		//Insert ke tabel Survey
		try{
			
			var insertContainerSurvey = await container_survey.sequelize.query(`Insert into container_survey(SVID,CPID,SYID,SVCRNO,SVTYPE,SVSURDAT,SVCOND,SVCRTON,SVCRTBY,TYPE,SVNOTES)Values('${SVID}','${$CPID}','${SYID}','${SVCRNO}','${$TYPE_SURVEY}','${SVSURDAT}','${SVCOND}','${SVCRTON}','${usernameByToken}',1,'${SVNOTES}')`,
						{
							type: container_survey.INSERT
						});
			
		} catch(error){
			res.status(403);
			next(error);
		}
			

		if( CTCODE =='RF' ){ //Reefer Container
			try{
				let $updateTBLContainer = await container_survey.sequelize.query( `UPDATE tblcontainer SET MTCODE='${MTCODE1}',CRCDP=${$CRCDP},CRACEP=${$CRACEP},CRCSC= ${$CRCSC},CRWEIGHTK='${CRWEIGHTK}',CRWEIGHTL='${CRWEIGHTL}',CRTARAK='${CRTARAK}',CRTARAL='${CRTARAL}',CRNETK='${CRNETK}',CRNETL='${CRNETL}',CRVOL='${CRVOL}',CRPOS='${CRPOS}',CRBAY='${CRBAY}',CRROW='${CRROW}',CRTIER='${CRTIER}',CRMANUF='${CRMANUF}',CRMANDAT='${$CRMANDAT}',CRPOS='${CRPOS}',CRBAY='${CRBAY}',CRROW='${CRROW}',CRTIER='${CRTIER}' WHERE CRNO ='${CRNO}' and CRCPID = '${$CPID}'`,
				{
					type: container_survey.INSERT
				});

			} catch(error){
				res.status(403);
				next(error);
			}
			

			//Update tabel Container Proses
			try{
				var updateTBLProcess = await container_survey.sequelize.query(`Update container_process set MANUFDATE='${MANUFDATE}' Where CPID='${$CPID}'`,
				{
					type: container_survey.INSERT
				});

			} catch(error){
				res.status(403);
				next(error);
			}
			


			if( (CRLASTCOND=='AC' || CRLASTCOND=='AX') && (CRLASTCONDE=='AC' || CRLASTCONDE=='AX') ){

				//Mencari Principal
				try {

					var getPRCODE = await container_survey.sequelize.query(`
						Select PR.PRFLAG1 as PRFLAG1 from 
						container_process CP 
						INNER JOIN tblprincipal PR ON
						CP.CPOPR = PR.PRCODE
						INNER JOIN coins_survey SV ON
						SV.CPID = CP.CPID
						WHERE SV.SVID = '${SVID}' AND SV.TYPE='1' AND
						CP.CPID = '${$CPID}'`,
					{
						type: container_survey.SELECT,
						plain: true
					});
				} catch(error){
					res.status(403);
					next(error);
				}
	
				try{
					var getEOR = await container_survey.sequelize.query(`SELECT LPAD(max(RPNOEST) +1,6,'0') as RPNOEST from container_repair order by RPNOEST desc limit 1`,{
						type: container_survey.SELECT,
						plain: true
					});

				} catch(error){
					res.status(403);
					next(error);
				}
				let EORNo = (getEOR == null)? 1: getEOR['RPNOEST'];
				var insertContainerRepair;
				if (getPRCODE['PRFLAG1']=='1'){ //leasing
					//Approve tabel repair
					try{
						insertContainerRepair = await container_survey.sequelize.query(`Insert into container_repair(SVID,RPVER,RPTGLEST,RPNOEST,RPCRNO,RPCRTON,RPCRTBY,RPSTSAPPV,RPTGLAPPV,RPSTSAPPVPR,RPTGLAPPVPR,RPBILLON,RPFINALEST,SYID)Values('${SVID}',1,'${now}','${EORNo}','${CRNOW}','${now}','${usernameByToken}',1,'${now}',1,'${now}',1,'1','${SYID}')`,
						{
							type: container_survey.INSERT
						});

					} catch(error){
						res.status(403);
						next(error);
					}

				}else{ //Shipping
					//Approve tabel repair, hanya principal
					try{
						let insertContainerRepair = await container_survey.sequelize.query(`Insert into container_repair(SVID,RPVER,RPTGLEST,RPNOEST,RPCRNO,RPCRTON,RPCRTBY,RPSTSAPPVPR,RPTGLAPPVPR,RPBILLON,RPFINALEST,SYID)Values('${SVID}',1,'${now}','${EORNo}','${CRNO}','${now}','${usernameByToken}',1,'${now}',1,'1','${SYID}')`,
						{
							type: container_survey.INSERT
						});

					} catch(error){
						res.status(403);
						next(error);
					}

				}

			}



			
			//1. Jika kondisi OK, tapi Engine rusak
			if ( (CRLASTCOND=='AC' || CRLASTCOND=='AX') && (CRLASTCONDE !='AC' || CRLASTCONDE!='AX')){
				
				if( CRLASTCONDE.length < 1 ){
					//Update tabel container
					try{
						$updateTBLcontainer = await container_survey.sequelize.query(`Update tblcontainer set CRLASTACT='CO',CRLASTACTE='WS',CRLASTCOND='AC' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
						{
							type: container_survey.INSERT
						});

					} catch (error) {
						res.status(403);
						next(error);
					}
							
				}else{

					if( (CRLASTCOND=='AC' || CRLASTCONDE=='AC') || (CRLASTCOND=='AX' || CRLASTCONDE=='AC') || (CRLASTCONDE=='AX' || CRLASTCONDE=='AX') || (CRLASTCOND=='AC' || CRLASTCOND=='AC') ){
						try{
							$updateTBLcontainer = await container_survey.sequelize.query(`Update tblcontainer set CRLASTACT='CO',CRLASTCOND='${CRLASTCOND}',CRLASTACTE='WS',CRLASTCONDE='${CRLASTCONDE}' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}`,
							{
								type: container_survey.INSERT
							});
							
						} catch (error) {
							res.status(403);
							next(error);
						}

					}else{
						try{
							$updateTBLcontainer = await container_survey.sequelize.query(`Update tblcontainer set CRLASTACT='CO',CRLASTCOND='AC',CRLASTACTE='WS',CRLASTCONDE='${CRLASTCONDE}' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
							{
								type: container_survey.INSERT
							});
							
						} catch (error) {
							res.status(403);
							next(error);
						}
						
					}

					
				}

			} else if( (CRLASTCOND =='AC' || CRLASTCONDE=='AX') && (CRLASTCOND !='AC' || CRLASTCOND!='AX') ){
				//Update tabel container
				try{
					$updateTBLcontainer = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='WE',CRLASTCOND='${CRLASTCOND}',CRLASTACTE='CO',CRLASTCONDE='AC' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
					{
						type: container_survey.INSERT
					});
				} catch (error) {
					res.status(403);
					next(error);
				}	

			} else if( (CRLASTCOND=='AC' && CRLASTCONDE=='AX') || (CRLASTCOND=='AX' && CRLASTCONDE=='AC') || (CRLASTCOND=='AX' && CRLASTCONDE=='AX') || ($_POST["CRLASTCOND"]=='AC' && CRLASTCONDE=='AC') ){
				//Update tabel container
				try{

					$updateTBLcontainer = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='CO',CRLASTACTE='CO',CRLASTCOND='${CRLASTCOND}',CRLASTCONDE='${CRLASTCONDE}' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
					{
						type: container_survey.INSERT
					});
				} catch (error) {
					res.status(403);
					next(error);
				}	
			
			} else if( (CRLASTCOND!='AC' && CRLASTCOND!='AC') || (CRLASTCOND!='AX' && CRLASTCONDE!='AX') ){
				//print "masuk5";die();
				if( !strlen($_POST["CRLASTCONDE"]) ){
					//Update tabel container
					try{

						$updateTBLcontainer = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='WE',CRLASTACTE='WS',CRLASTCOND='${CRLASTCOND}' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
						{
							type: container_survey.INSERT
						});
					} catch (error) {
						res.status(403);
						next(error);
					}	
						
				}else{
					//Update tabel container
					try{

						$updateTBLcontainer = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='WE',CRLASTCOND='${CRLASTCOND}',CRLASTACTE='WS',CRLASTCONDE='${CRLASTCONDE}' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
						{
							type: container_survey.INSERT
							
						});
					} catch (error) {
						res.status(403);
						next(error);
					}	
					
				}
			}
	
		} else{ 
	
		// Non Reefer
			try{

				$updateTBLcontainer = await container_survey.sequelize.query(`UPDATE ${$TableName1} SET MTCODE='${MTCODE1}',CRCDP=${$CRCDP},CRACEP=${$CRACEP},CRCSC=${$CRCSC},CRWEIGHTK='${CRWEIGHTK}',CRWEIGHTL='${CRWEIGHTL}',CRTARAK='${CRTARAK}',CRTARAL='${CRTARAL}',CRNETK='${CRNETK}',CRNETL='${CRNETL}',CRVOL='${CRVOL}',CRPOS='${CRPOS}',CRBAY='${CRBAY}',CRROW='${CRROW}',CRTIER='${CRTIER}',CRLASTCOND='${CRLASTCOND}',CRMANUF='${CRMANUF}',CRMANDAT='${$CRMANDAT}',CRPOS='${CRPOS}',CRBAY='${CRBAY}',CRROW='${CRROW}',CRTIER='${CRTIER}' WHERE CRNO ='${CRNO}' and CRCPID = '${$CPID}'`,
				{
					type: container_survey.INSERT
				});
			} catch (error) {
				res.status(403);
				next(error);
			}	
			

			if( CRLASTCOND =='AC' || CRLASTCOND=='AX' ){

				//Mencari Principal
				try{

					let $SQLPRCODE = await container_survey.sequelize.query(`Select PR.PRFLAG1 as PRFLAG1 from container_process CP 
					INNER JOIN tblprincipal PR ON CP.CPOPR = PR.PRCODE 
					INNER JOIN coins_survey SV ON SV.CPID = CP.CPID 
					WHERE SV.SVID ='${SVID}' AND SV.TYPE='1' AND CP.CPID = '${$CPID}'`,
					{
						type: container_survey.SELECT,
						plain: true
					});
					var $ResultPRCODE = $SQLPRCODE['PRFLAG1'];
				} catch (error) {
					res.status(403);
					next(error);
				}	


				try{
					var $SQLEOR = await container_survey.sequelize.query(`SELECT LPAD(max(RPNOEST) +1,6,'0') as RPNOEST from container_repair order by RPNOEST desc limit 1`,
					{
						type: container_survey.SELECT,
						plain: true
					});
				} catch (error) {
					res.status(403);
					next(error);
				}	
			
			
				let EORNo = ($SQLEOR == null)? 1: $SQLEOR['RPNOEST'];
				var $insertTBLRepair;
				if ($ResultPRCODE=='1'){ //leasing

					//Approve tabel repair
					try{

						$insertTBLRepair = await container_survey.sequelize.query(`Insert into container_repair(SVID,RPVER,RPTGLEST,RPNOEST,RPCRNO,RPCRTON,RPCRTBY,RPSTSAPPV,RPTGLAPPV,RPSTSAPPVPR,RPTGLAPPVPR,RPBILLON,RPFINALEST,SYID)Values('${SVID}',1,'${now}','${EORNo}','${CRNO}','${now}','${usernameByToken}',1,'${now}',1,'${now}',1,'1','${SYID}')`,
						{
							type: container_survey.INSERT
						});
					} catch (error) {
						res.status(403);
						next(error);
					}	
						
						
				}else{ //Shipping
					//Approve tabel repair, hanya principal
					try {

						$insertTBLRepair = await container_survey.sequelize.query(`Insert into container_repair(SVID,RPVER,RPTGLEST,RPNOEST,RPCRNO,RPCRTON,RPCRTBY,RPSTSAPPVPR,RPTGLAPPVPR,RPBILLON,RPFINALEST,SYID)Values('".${SVID}."',1,'${now}','${EORNo}','${CRNO}','${now}','${usernameByToken}',1,'${now}',1,'1','${SYID}')`,
						{
							type: container_survey.INSERT
						});
					} catch (error) {
						res.status(403);
						next(error);
					}
				

				}

				try{

					$updateTBLcontainer =  await container_survey.sequelize.query(`Update ${$TableName1} SET CRLASTACT='CO',CRLASTCOND='${CRLASTCOND}' WHERE CRNO ='${CRNO}' and CRCPID = '${$CPID}'`,
					{
						type: container_survey.INSERT
					});
				} catch (error) {
					res.status(403);
					next(error);
				}

			}else{
				try {

					$updateTBLcontainer=await container_survey.sequelize.query(`Update ${$TableName1} SET CRLASTACT='WE',CRLASTCOND='${CRLASTCOND}' WHERE CRNO ='${CRNO}' and CRCPID = '${$CPID}'`,
					{
						type: container_survey.INSERT
					});
				}
				catch (error) {
					res.status(403);
					next(error);
				}
			}
		}
		baseResponse({
			message: "Success Insert Data",
			data: insertContainerSurvey
		})(res, 200);

	}

	static async updateData(req, res, next) {
		let { SVID, SYID, SVCRNO, SVSURDAT, SVCOND, SVCRTON, SVCRTBY, 
			SVNOTES, CPIPRANO, CRNO, CPIORDERNO, CRCMANDAT, CRCDP, CRACEP, CRCSC, CTCODE, MTCODE1,
			CRWEIGHTK, CRWEIGHTL, CRTARAK, CRTARAL, CRNETK, CRNETL, CRVOL, MANUFDATE, CRLASTCOND,CRLASTACT, CRLASTCONDE, CRBAY, CRPOS, CRROW, CRTIER,CRMANUF
		} = req.body;
		var $TableName1 	= "tblcontainer";
		var now = (new Date()).toISOString().split('T')[0];
		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;
		var TYPE_SURVEY='';
		let $CRCDP = (CRCDP != undefined)? 0 : 1;
		let	$CRCSC = (CRCSC != undefined)? 0 : 1;
		let	$CRACEP = (CRACEP != undefined)? 0 : 1;
		let	$CRMANDAT = CRCMANDAT;

		//Mencari CPID(Container Proses ID) di tabel Container Proses
		var MyResult = await container_survey.sequelize.query(`SELECT CPID from container_process Where CRNO='${CRNO}' and CPIORDERNO='${CPIPRANO}'`,
		{
			type: container_survey.SELECT,
			plain: true
		});
		var $CPID = MyResult['CPID'];
		//Update tabel Container Proses
		try{

			var $UpdateProses = await container_survey.sequelize.query(`Update container_process set MANUFDATE='${MANUFDATE}' Where CPID='${$CPID}'`,
			{
				type: container_survey.INSERT
			});
		} catch (error) {
			res.status(403);
			next(error);
		}

		//Mencari Tipe Survey Container
		var $SQLSurv = await container_survey.sequelize.query(`SELECT CPISTATUS from container_process Where CRNO='${CRNO}' and CPIORDERNO='${CPIPRANO}'`,
		{
			type: container_survey.SELECT,
			plain: true
		});

		switch($SQLSurv['CPISTATUS']){
			case 'NO': //Pra In
			TYPE_SURVEY='IN';
			break;
			case 'OF': //Leasing
			TYPE_SURVEY='OF';
				break;
				
				case 'RE': //Repo PraIn
				TYPE_SURVEY='EN';
				break;
		}
	

		if( CTCODE=='RF' ){ //Reefer Container
			try{

				$SQL3 =  await container_survey.sequelize.query(`UPDATE tblcontainer SET MTCODE='${MTCODE1}',CRCDP=${$CRCDP},CRACEP=${CRACEP},CRCSC=${$CRCSC},CRWEIGHTK='${CRWEIGHTK}',CRWEIGHTL='${CRWEIGHTL}',CRTARAK='${CRTARAK}',CRTARAL='${CRTARAL}',CRNETK='${CRNETK}',CRNETL='${CRNETL}',CRVOL='${CRVOL}',CRPOS='${CRPOS}',CRBAY='${CRBAY}',CRROW='${CRROW}',CRTIER='${CRTIER}',CRMANUF='${CRMANUF}',CRMANDAT='${$CRMANDAT}',CRPOS='${CRPOS}',CRBAY='${CRBAY}',CRROW='${CRROW}',CRTIER='${CRTIER}' WHERE CRNO ='${CRNO}' and CRCPID = '${$CPID}'`,
				{
					type: container_survey.INSERT
				});		
			} catch (error) {
				res.status(403);
				next(error);
			}
			

		  	if( CRLASTACT=='WE' || CRLASTACT=='WA' ){
				if( (CRLASTCOND=='AC' || CRLASTCOND=='AX') && (CRLASTCONDE=='AC' || CRLASTCONDE=='AX') ){

					//Mencari Principal
					var getPRCODE = await container_survey.sequelize.query(`
						Select PR.PRFLAG1 as PRFLAG1 from 
						container_process CP 
						INNER JOIN tblprincipal PR ON
						CP.CPOPR = PR.PRCODE
						INNER JOIN coins_survey SV ON
						SV.CPID = CP.CPID
						WHERE SV.SVID = '${SVID}' AND SV.TYPE='1' AND CP.CPID = '${$CPID}'`,
					{
						type: container_survey.SELECT,
						plain: true
					});
				

					var getEOR = await container_survey.sequelize.query(`SELECT LPAD(max(RPNOEST) +1,6,'0') as RPNOEST from container_repair order by RPNOEST desc limit 1`,
					{
						type: container_survey.SELECT,
						plain: true
					});
					let EORNo = (getEOR == null)? 1: getEOR['RPNOEST'];

					if ($getPRCODE['PRFLAG1']=='1'){ //leasing

						var $ResultCheck = await container_survey.sequelize.query(`Select SVID from container_repair where SVID='${SVID}'`,
						{
							type: container_survey.SELECT,
							plain: true
						});
					
						if( $ResultCheck['SVID'].length > 0 ){
					
							//Approve tabel repair
							try {
								var $SQL3 = await container_survey.sequelize.query(`Insert into container_repair(SVID,RPVER,RPTGLEST,RPNOEST,RPCRNO,RPCRTON,RPCRTBY,RPSTSAPPV,RPTGLAPPV,RPSTSAPPVPR,RPTGLAPPVPR,RPBILLON,RPFINALEST,SYID)Values('${SVID}',1,'${now}','${EORNo}','${CRNO}','${now}','${usernameByToken}',1,'${now}',1,'${now}',1,'1','${SYID}')`,
								{
									type: container_survey.INSERT,
								});
							} catch (error) {
								res.status(403);
								next(error);
							}
					
						}

					}else{ //Shipping
						// Approve tabel repair, hanya principal
						$ResultCheck = await container_survey.sequelize.query(`Select SVID from container_repair where SVID='${SVID}'`,
						{
							type: container_survey.SELECT,
							plain: true
						});
						
						if( $ResultCheck['SVID'].length > 0 ){
							try{
								$SQL3 = await container_survey.sequelize.query(`insert into container_repair(SVID,RPVER,RPTGLEST,RPNOEST,RPCRNO,RPCRTON,RPCRTBY,RPSTSAPPVPR,RPTGLAPPVPR,RPBILLON,RPFINALEST,SYID)Values('${SVID}',1,'${now}','${EORNo}','${CRNO}','${now}','${usernameByToken}',1,'${now}',1,'1','${SYID}')`,
								{
									type: container_survey.INSERT,
								});
							}catch (error) {
								res.status(403);
								next(error);
							}
								
						}

					}

				}


				//1. Jika kondisi OK, tapi Engine rusak
				if ( (CRLASTCOND=='AC' || CRLASTCOND) && (CRLASTCONDE != 'AC' || CRLASTCONDE !='AX') ){
					
					if( CRLASTCONDE.length > 0 ){
						//Update tabel container
						try{
							$SQL2 = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='CO',CRLASTACTE='WS',CRLASTCOND='AC' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
							{
								type: container_survey.INSERT,
							});
						} catch (error) {
							res.status(403);
							next(error);
						}
				
					}else{
						if( (CRLASTCOND=='AC' || CRLASTCONDE=='AC') || (CRLASTCOND=='AX' || CRLASTCONDE=='AC') || (CRLASTCONDE=='AX' || CRLASTCONDE =='AX') || (CRLASTCOND=='AC' || CRLASTCOND=='AC') ){
							try{

								$SQL2 = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='CO',CRLASTCOND='".${CRLASTCOND}',CRLASTACTE='CO',CRLASTCONDE='${CRLASTCONDE}' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
								{
									type: container_survey.INSERT,
								});
							} catch (error) {
								res.status(403);
								next(error);
							}
				

						}else{
							try {
								$SQL2 = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='CO',CRLASTCOND='AC',CRLASTACTE='WS',CRLASTCONDE='${CRLASTCONDE}' Where CRNO = '$CRNO}' and CRCPID = '${$CPID}'`,{
									type: container_survey.INSERT
								});		
							} catch (error) {
								res.status(403);
								next(error);
							}
						}

					}

				} else if( ( CRLASTCOND =='AC' || CRLASTCONDE =='AX') && (CRLASTCOND !='AC' || CRLASTCOND !='AX') ){
					//Update tabel container
					try{
						$SQL2 = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='WE',CRLASTCOND='${CRLASTCOND}',CRLASTACTE='CO',CRLASTCONDE='AC' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
						{
							type: container_survey.INSERT
						});
					} catch (error) {
						res.status(403);
						next(error);
					}

				} else if( ( CRLASTCOND =='AC' && CRLASTCONDE =='AX') || (CRLASTCOND =='AX' && CRLASTCONDE == 'AC') || (CRLASTCOND =='AX' && CRLASTCONDE =='AX') || (CRLASTCOND =='AC' && CRLASTCONDE =='AC') ){
					//Update tabel container
					try {
						$SQL2 = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='CO',CRLASTACTE='CO',CRLASTCOND='${CRLASTCOND}',CRLASTCONDE='${CRLASTCONDE}' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
						{
							type: container_survey.INSERT
						});
					} catch (error) {
						res.status(403);
						next(error);
					}

				}else if( (CRLASTCOND !='AC' && CRLASTCONDE !='AC') || (CRLASTCOND !='AX' && CRLASTCONDE !='AX') ){

					if( !strlen($_POST["CRLASTCONDE"]) ){
						//Update tabel container
						try {
							$SQL2 = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTCOND='${CRLASTCOND}' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}'`,
							{
								type: container_survey.INSERT
							});
						} catch (error) {
							res.status(403);
							next(error);
						}
				
					}else{
						//Update tabel container
						try {
							$SQL2 = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTCOND='${CRLASTCOND}',CRLASTCONDE='${CRLASTCONDE}' Where CRNO = '${CRNO}' and CRCPID = '${$CPID}`,
							{
								type: container_survey.INSERT
							});		
						} catch (error) {
							res.status(403);
							next(error);
						}
					}
				}

				try{
					$SQL= await container_survey.sequelize.query(`Update coins_survey set SVCOND='${CRLASTCOND}',SVSURDAT='${SVSURDAT}' Where SVCRNO = '${CRNO}' and CPID = '${$CPID}`,
					{
						type: container_survey.INSERT
					});
				} catch (error) {
					res.status(403);
					next(error);
				}

		 	}//END WE || WA

		}else{ // Non Reefer
			try {
				$SQL3 = await container_survey.sequelize.query(`UPDATE ${$TableName1} SET MTCODE='${MTCODE1}',CRCDP=${$CRCDP},CRACEP=${$CRACEP},CRCSC=${$CRCSC},CRWEIGHTK='${CRWEIGHTK}',CRWEIGHTL='${CRWEIGHTL}',CRTARAK='${CRTARAK}',CRTARAL='${CRTARAL}',CRNETK='${CRNETK}',CRNETL='${CRNETL}',CRVOL='${CRVOL}',CRPOS='${CRPOS}',CRBAY='${CRBAY}',CRROW='${CRROW}',CRTIER='${CRTIER}',CRMANUF='${CRMANUF}',CRMANDAT='${$CRMANDAT}',CRPOS='${CRPOS}',CRBAY='${CRBAY}',CRROW='${CRROW}',CRTIER='${CRTIER}' WHERE CRNO ='${CRNO}' and CRCPID = '${$CPID}'`,
				{
					type: container_survey.INSERT
				});
			} catch (error) {
				res.status(403);
				next(error);
			}

			if( CRLASTACT =='WE' || CRLASTACT =='WA' ){
				if( CRLASTCOND =='AC' || CRLASTCOND =='AX' ){

					//Mencari Principal
					var getPRCODE = await container_survey.sequelize.query(`
							Select PR.PRFLAG1 as PRFLAG from 
							container_process CP 
							INNER JOIN tblprincipal PR ON
							CP.CPOPR = PR.PRCODE
							INNER JOIN coins_survey SV ON
							SV.CPID = CP.CPID
							WHERE SV.SVID = '${$SVID}' AND SV.TYPE='1' AND
							CP.CPID = '${$CPID}'`,
							{
								type: container_survey.SELECT,
								plain: true
							});

					let getEOR = await container_survey.sequelize.query(`SELECT LPAD(max(RPNOEST) +1,6,'0') as RPNOEST from container_repair order by RPNOEST desc limit 1`,
					{
						type: container_survey.SELECT,
						plain: true
					});
					
					let EORNo = (getEOR == null)? 1: getEOR['RPNOEST'];
					if (getPRCODE['PRFLAG']=='1'){ //leasing

						$ResultCheck= await container_survey.sequelize.query(`Select SVID from container_repair where SVID='${$SVID}'`,
						{
							type: container_survey.SELECT,
							plain: true
						});
						
						if( $ResultCheck['SVID'].length > 0  ){
							//Approve tabel repair
							try {
								$SQL3 = await container_survey.sequelize.query(`Insert into container_repair(SVID,RPVER,RPTGLEST,RPNOEST,RPCRNO,RPCRTON,RPCRTBY,RPSTSAPPV,RPTGLAPPV,RPSTSAPPVPR,RPTGLAPPVPR,RPBILLON,RPFINALEST,SYID)Values('${$SVID}',1,'${now}','${EORNo}','${CRNO}','${now}','${usernameByToken}',1,'${now}',1,'${now}',1,'1','${SYID} )`,
								{
									type: container_survey.INSERT,
								});
							} catch (error) {
								res.status(403);
								next(error);
							}
						}

					}else{ //Shipping
						//Approve tabel repair, hanya principal
						//print "ship";die();
						$ResultCheck= await container_survey.sequelize.query(`Select SVID from container_repair where SVID='${$SVID}'`,
						{
							type: container_survey.SELECT,
							plain: true
						});

						if( $ResultCheck['SVID'] ){
							try {
								$SQL3 = await container_survey.sequelize.query(`Insert into container_repair(SVID,RPVER,RPTGLEST,RPNOEST,RPCRNO,RPCRTON,RPCRTBY,RPSTSAPPVPR,RPTGLAPPVPR,RPBILLON,RPFINALEST,SYID)Values('${$SVID}',1,'${now}','${EORNo}','${CRNO}','$now','${usernameByToken}',1,'${now}',1,'1','${SYID}')`,
								{
									type: container_survey.INSERT,
								});
							} catch (error) {
								res.status(403);
								next(error);
							}
						
						}

					}

					try{
						$SQL4= await container_survey.sequelize.query(`Update ${$TableName1} SET CRLASTACT='CO',CRLASTCOND='${CRLASTCOND}' WHERE CRNO ='${CRNO}' and CRCPID = '${$CPID}'`,
						{
							type: container_survey.INSERT,
						});
					} catch (error) {
						res.status(403);
						next(error);
					}

				}else{
					try {
						$SQL4=  await container_survey.sequelize.query(`Update ${$TableName1} SET CRLASTCOND='${CRLASTCOND}' WHERE CRNO ='${CRNO}' and CRCPID = '${$CPID}'`,
						{
							type: container_survey.INSERT,
						});
					} catch (error) {
						res.status(403);
						next(error);
					}
					
				}

				try {
					$SQL= await container_survey.sequelize.query(`Update coins_survey set SVCOND='${CRLASTCOND}',SVSURDAT='${SVSURDAT}' Where SVCRNO = '${CRNO}' and CPID = '${$CPID}`,
					{
						type: container_survey.INSERT,
					});
				} catch (error) {
					res.status(403);
					next(error);
				}
			}//END WE || WA
		}
		baseResponse({
			message: "Success Update Data",
			data: $UpdateProses
		})(res, 200);
	}

	static async deleteData(req, res, next) {
		let { SVID, SYID, SVCRNO, SVSURDAT, SVCOND, SVCRTON, SVCRTBY, 
			SVNOTES, CPID, CPIPRANO, CRNO, CPIORDERNO, CRCMANDAT, CRCDP, CRACEP, CRCSC, CTCODE, MTCODE1,
			CRWEIGHTK, CRWEIGHTL, CRTARAK, CRTARAL, CRNETK, CRNETL, CRVOL, MANUFDATE, CRLASTCOND, CRLASTCONDE, CRBAY, CRPOS, CRROW, CRTIER,CRMANUF, PRIMARY_KEY
		} = req.body;
		let $TableName1 	= "tblcontainer";
		let $TableName6 	= "container_process";
		let $TableName7 	= "container_survey";
		let $TableName8 	= "container_repair";
		let $TableName14 	= "container_repair_detail";
		//Mencari CPID(Container Proses ID) di tabel Container Proses
		try{

			var $MyResult = await container_survey.sequelize.query(`SELECT CPID from ${$TableName6} Where CRNO='${CRNO}' and CPIORDERNO='${CPIPRANO}'`,
			{
				type: container_survey.SELECT,
				plain: true
			});
		} catch (error) {
			res.status(403);
			next(error);
		}

		//Hapus record tabel survey
		try {

			$SQL1 = await container_survey.sequelize.query(`Delete from ${$TableName7} Where ".PRIMARY_KEY."='${PRIMARY_KEY}' and CPID = '${MyResult['CPID']}'`,
			{
				type: container_survey.DELETE,
			});
		} catch (error) {
			res.status(403);
			next(error);
		}
		

		//Hapus record tabel repair
		try {

			$SQL3 = await container_survey.sequelize.query(`Delete from ${$TableName8} Where ".PRIMARY_KEY."='${PRIMARY_KEY}'`,
			{
				type: container_survey.DELETE,
			});
		} catch (error) {
			res.status(403);
			next(error);
		}
		

		//Hapus record tabel repair detail
		try {

			$SQL4 = await container_survey.sequelize.query(`Delete from ${$TableName14} Where ".PRIMARY_KEY."='${PRIMARY_KEY}'`,
			{
				type: container_survey.DELETE,
			});
		} catch (error) {
			res.status(403);
			next(error);
		}

		//Update record pd tabel Container menjadi WS( Waiting Survey )
		try {

			$SQL2 = await container_survey.sequelize.query(`Update ${$TableName1} set CRLASTACT='WS',CRLASTACTE=NULL,CRLASTCOND=NULL,CRLASTACTE=NULL,CRLASTCONDE=NULL Where CRNO = '${CRNO}'`,
			{
				type: container_survey.INSERT,
			});
		} catch (error) {
			res.status(403);
			next(error);
		}

		baseResponse({
			message: "Success Delete Data",
			data: {}
		})(res, 200);

	}

	static async getSvnumber(req, res, next){
		try {

			/**
		   * Format
		   * prefix[SV] + 'paktrasl' + 'sdcode' + 8digit_number
		   */ 
	  
			// get data company.
			let resultCompany = await company.findAll({});
			let paktrasl = resultCompany[0].dataValues.paktrasl;
			let sdcode = resultCompany[0].dataValues.sdcode;
			let prefixCode = "SV";
	  
			// get data repo order
			let resultSurvey = await container_survey.findOne({ 
				where: {
					svid: { [Op.like]: `%SV%`}
				},
				order:[[ "svid", "DESC"]]
			});
	  
			if (resultSurvey === null) {
	  
			  const resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
			  baseResponse({ message: "Success Created Unix Code", data: resultCode })(res, 200);
			} else {
	  
			  let resultDataSurvey = resultSurvey.dataValues.svid;
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

module.exports = SurveyController;
