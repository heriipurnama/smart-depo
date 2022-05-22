"use strict";

const baseResponse = require("../../utils/helper/Response");
const { wo_container, company} = require("../../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Logger = require("../../utils/helper/logger");

class WoContainerController {
    static async list(req, res, next) {

        try {
            let datas = await wo_container.sequelize.query(
                `SELECT wocid, wonoid, ordertype, cpopr, cpcust, crno, cccode, ctcode, cclength, ccheight, 
                            fe, remark, gatedate, sealno FROM wo_container
            `,
                {
                    type: wo_container.SELECT
                }
            );

            baseResponse({
                message: "List wo container",
                data: datas,
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async detailWoContainer(req, res, next){
        let {wocid} = req.query;
        try {
            let dataku = await wo_container.sequelize.query(
                `SELECT wonoid, ordertype, cpopr, cpcust, crno, cccode, ctcode, cclength, ccheight, 
                fe, remark, gatedate, sealno FROM wo_container WHERE wocid = '${wocid}'
				 ORDER BY wo_container.wocid  DESC
            `,
                {
                    type: wo_container.SELECT,
                }
            );

            baseResponse({
                message: "detail wo container",
                data: dataku
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async updateWOContainer(req, res, next){
        let {wocid, wonoid, ordertype, cpopr, cpcust, crno, cccode, ctcode, cclength, ccheight,
            fe, remark, gatedate, sealno, wotype, wopraoderin, wopraoderout, cpiremark1, cpovoyid, cponotes,
            cpid, cpiorderno, cpireceptno, cpitruck, cpinopol, cpinotes} = req.body;
        try{

            let updateWO = await wo_container.update({
                    wonoid:  wonoid,
                    ordertype:  ordertype,
                    cpopr:  cpopr,
                    cpcust:  cpcust,
                    crno:  crno,
                    cccode:  cccode,
                    ctcode:  ctcode,
                    cclength:  cclength,
                    ccheight:  ccheight,
                    fe:  fe,
                    remark:  remark,
                    gatedate:  gatedate,
                    sealno: sealno,
                },
                { where: { wocid: wocid } }
            );

            baseResponse({
                message: "Success Update Data",
                data: updateWO
            })(res, 200);

        } catch(error){
            res.status(403);
            next(error);
        }
    }

    static async insertData(req, res, next){
        let {wonoid, ordertype, cpopr, cpcust, crno, cccode, ctcode, cclength, ccheight,
            fe, remark, gatedate, sealno, wotype, wopraoderin, wopraoderout, cpiremark1, cpovoyid, cponotes,
            cpid, cpiorderno, cpireceptno, cpitruck, cpinopol, cpinotes} = req.body;
        try {
            let wotypes = parseInt(wotype);
            let payloadWO = await wo_container.create({
                wonoid:  wonoid,
                ordertype:  ordertype,
                cpopr:  cpopr,
                cpcust:  cpcust,
                crno:  crno,
                cccode:  cccode,
                ctcode:  ctcode,
                cclength:  cclength,
                ccheight:  ccheight,
                fe:  fe,
                remark:  remark,
                gatedate:  gatedate,
                sealno: sealno,
            });
            if (wotypes == 1 || wotypes == 2 && wopraoderin == false && wopraoderout == true){
                let data = await wo_container.sequelize.query(
                    ` update container_process
				  set
					 cpopr1 = '${cpopr}',                                                   
					 cpcust1 ='${cpcust}',                                                                           
					 cpoorderno = '${cpoorderno}',
					 cporeceptno = '${cporeceptno}',                                           
					 cpopratgl = '${cpopratgl}',	
					 cpocargo = '${cpocargo}',
					 cpiremark1 = '${cpiremark1}', 
					 cpovoyid = ${cpovoyid}, 
					 cpovoy = '${cpovoy}',  
					 cponotes  = '${cponotes}'
				  WHERE cpitgl is not null
					and cpid = ( SELECT  crcpid FROM  tblcontainer WHERE  crno  LIKE '${crno}' )
            `,
                    {
                        type: wo_container.UPDATE,
                    }
                );

                let conUpdate = await wo_container.sequelize.query(
                    ` UPDATE tblcontainer SET  crlastact  ='BO' WHERE crno  LIKE '${crno}'
            `,
                    {
                        type: wo_container.UPDATE,
                    }
                );

            }else if (wotypes == 1 || wotypes == 2 && wopraoderin == true && wopraoderout == true){
                let restDatas = await wo_container.sequelize.query(
                    ` INSERT INTO container_process
                      (cpid,crno, cpcust,cpopr,cpiorderno,cpireceptno ,
                       cpipratgl, cpicargo,cpitruck , cpinopol,cpiremark,cpinotes)
                      values
                          ('${cpid}','${crno}', '${cpcust}', '${cpopr}', ${cpiorderno}, '${cpireceptno}', '${cpipratgl}',
                           '${cpicargo}', '${cpitruck}', '${cpinopol}', '${cpiremark}', '${cpinotes}'  ) `,
                    {
                        type: wo_container.INSERT,
                    }
                );

                let data = await wo_container.sequelize.query(
                    ` update container_process
				  set
					 cpopr1 = '${cpopr}',                                                   
					 cpcust1 ='${cpcust}',                                                                           
					 cpoorderno = '${cpoorderno}',
					 cporeceptno = '${cporeceptno}',                                           
					 cpopratgl = '${cpopratgl}',	
					 cpocargo = '${cpocargo}',
					 cpiremark1 = '${cpiremark1}', 
					 cpovoyid = ${cpovoyid}, 
					 cpovoy = '${cpovoy}',  
					 cponotes  = '${cponotes}'
				  WHERE cpitgl is not null
					and cpid = ( SELECT  crcpid FROM  tblcontainer WHERE  crno  LIKE '${crno}' )
            `,
                    {
                        type: wo_container.UPDATE,
                    }
                );

                let conUpdate = await wo_container.sequelize.query(
                    ` UPDATE tblcontainer SET  crlastact  ='BO' WHERE crno  LIKE '${crno}'
            `,
                    {
                        type: wo_container.UPDATE,
                    }
                );

            }else if (wotypes == 4 || wotypes == 5 || wotypes == 6 && wopraoderin ==true && wopraoderout==true){
                let restDatas = await wo_container.sequelize.query(
                    ` INSERT INTO container_process
                      (cpid,crno, cpcust,cpopr,cpiorderno,cpireceptno ,
                       cpipratgl, cpicargo,cpitruck , cpinopol,cpiremark,cpinotes)
                      values
                          ('${cpid}','${crno}', '${cpcust}', '${cpopr}', ${cpiorderno}, '${cpireceptno}', '${cpipratgl}',
                           '${cpicargo}', '${cpitruck}', '${cpinopol}', '${cpiremark}', '${cpinotes}'  ) `,
                    {
                        type: wo_container.INSERT,
                    }
                );

                let data = await wo_container.sequelize.query(
                    ` update container_process
				  set
					 cpopr1 = '${cpopr}',                                                   
					 cpcust1 ='${cpcust}',                                                                           
					 cpoorderno = '${cpoorderno}',
					 cporeceptno = '${cporeceptno}',                                           
					 cpopratgl = '${cpopratgl}',	
					 cpocargo = '${cpocargo}',
					 cpiremark1 = '${cpiremark1}', 
					 cpovoyid = ${cpovoyid}, 
					 cpovoy = '${cpovoy}',  
					 cponotes  = '${cponotes}'
				  WHERE cpitgl is not null
					and cpid = ( SELECT  crcpid FROM  tblcontainer WHERE  crno  LIKE '${crno}' )
            `,
                    {
                        type: wo_container.UPDATE,
                    }
                );

                let conUpdate = await wo_container.sequelize.query(
                    ` UPDATE tblcontainer SET  crlastact  ='BO' WHERE crno  LIKE '${crno}'
            `,
                    {
                        type: wo_container.UPDATE,
                    }
                );
            }else if (wotypes == 5 || wotypes == 6 && wopraoderin ==false && wopraoderout==true){
                let data = await wo_container.sequelize.query(
                    ` update container_process
				  set
					 cpopr1 = '${cpopr}',                                                   
					 cpcust1 ='${cpcust}',                                                                           
					 cpoorderno = '${cpoorderno}',
					 cporeceptno = '${cporeceptno}',                                           
					 cpopratgl = '${cpopratgl}',	
					 cpocargo = '${cpocargo}',
					 cpiremark1 = '${cpiremark1}', 
					 cpovoyid = ${cpovoyid}, 
					 cpovoy = '${cpovoy}',  
					 cponotes  = '${cponotes}'
				  WHERE cpitgl is not null
					and cpid = ( SELECT  crcpid FROM  tblcontainer WHERE  crno  LIKE '${crno}' )
            `,
                    {
                        type: wo_container.UPDATE,
                    }
                );

                let conUpdate = await wo_container.sequelize.query(
                    ` UPDATE tblcontainer SET  crlastact  ='BO' WHERE crno  LIKE '${crno}'
            `,
                    {
                        type: wo_container.UPDATE,
                    }
                );
            }


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
        let {woreceptid} = req.body;
        try{
            let payload = await wo_container.destroy({
                where: { woreceptid : woreceptid }
            });

            if (!payload) {
                throw new Error(`woreceptid: ${woreceptid} doesn't exists!`);
            }

            baseResponse({
                message: "Success delete Data",
                data: deleteWO
            })(res, 200);

        } catch(error){
            res.status(403);
            next(error);
        }
    }

}

module.exports = WoContainerController;
