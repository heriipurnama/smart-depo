"use strict";

require("dotenv").config();
const baseResponse = require("../../utils/helper/Response");
const {
    container_process,
} = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class EdiController {
    static async codecoIn(req, res, next) {
        const {
            prcode, vdate , starthour, endhour,
        } = req.query;

        try {
            let datas = await container_process.sequelize.query(
                `select cp.crno,cpopr, date_format(cpitgl,'%y%m%d') as cpitgl,
                        cpijam, cpotgl,cpojam,cposeal,cporefout,cpoves, s.svcond, s.svsurdat,
                        c.cccode, cc.cclength, cpirefin
                 from container_process cp
                          left join container_survey s on cp.cpid=s.cpid
                          left join tblcontainer c on cp.crno=c.crno
                          left join tblcontainer_code cc on cc.cccode=c.cccode
                 where cp.crno is not null
                   and cpopr='${prcode}'
                   and cpitgl='${vdate}'
                   and cpijam >'${starthour}'
                   and cpijam <='${endhour}'
                 order by cpotgl asc, cpojam asc, cpitgl asc, cpijam asc `
            );
            const restDatas = datas[0];

            baseResponse({ message: "List Datas", data: restDatas })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async codecoPTI(req, res, next) {
        const {
            prcode, vdate , starthour, endhour,
        } = req.query;

        try {
            let datas = await container_process.sequelize.query(
                `select cp.crno,cpopr, date_format(cpitgl,'%y%m%d') as cpitgl, date_format(cpijam,'%h%i') as cpijam,
                        date_format(cpotgl,'%y%m%d') as cpotgl, cpojam,cposeal,
                        cporefout,cpoves,s.svcond, date_format(s.svsurdat,'%y%m%d%h%i') as svsurdat,c.cccode , cc.cclength
                 from container_process cp
                          left join tblcontainer c on cp.crno=c.crno
                          left join tblcontainer_code cc on cc.cccode=c.cccode
                          left join container_survey  s on cp.cpid=s.cpid
                 where cp.crno is not null
                   and cpopr='${prcode}'
                   and s.svsurdat = '${vdate}'
                 order by svsurdat asc `
            );
            const restDatas = datas[0];

            baseResponse({ message: "List Datas", data: restDatas })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async codecoUpdate(req, res, next) {
        const {
            prcode, vdate , starthour, endhour,
        } = req.query;

        try {
            let datas = await container_process.sequelize.query(
                `select distinct cp.crno,cpopr,date_format(cpitgl,'%y%m%d') as cpitgl, date_format(cpijam,'%h%i') as cpijam,
				date_format(cpotgl,'%y%m%d') as cpotgl,cpojam,cposeal,
				cporefout,cpoves, s.svcond, s.svsurdat,c.cccode, cc.cclength , date_format(rptglwroke,'%y%m%d%h%i') as rptglwroke 
			from container_process cp
				left join tblcontainer c on cp.crno=c.crno
				left join tblcontainer_code cc on cc.cccode=c.cccode 
				left join container_survey s on cp.cpid=s.cpid 
				left join container_repair r on s.svid=r.svid 
			where cp.crno is not null
				and cpopr='${prcode}'
                and rptglwroke BETWEEN '${vdate} ${starthour}' AND '${vdate} ${endhour}'
			order by rptglwroke asc `
            );
            const restDatas = datas[0];

            baseResponse({ message: "List Datas", data: restDatas })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async codecoOut(req, res, next) {
        const {
            prcode, vdate,
        } = req.query;

        try {
            let datas = await container_process.sequelize.query(
                `select cp.crno,cpopr,date_format(cpotgl,'%y%m%d') as cpitgl, cpijam,
				date_format(cpotgl,'%y%m%d') as cpotgl,
				cpojam, cposeal,cporefout,cpoves,cpovoy,s.svcond,s.svsurdat,c.cccode , cc.cclength 
			from container_process cp
				left join tblcontainer c on cp.crno=c.crno
				left join tblcontainer_code cc on cc.cccode=c.cccode
				left join container_survey s on cp.cpid=s.cpid 
			where 
				cp.crno is not null
				and cpopr='${prcode}'
				and cpotgl >= '${vdate}' `
            );
            const restDatas = datas[0];

            baseResponse({ message: "List Datas", data: restDatas })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

}

module.exports = EdiController;
