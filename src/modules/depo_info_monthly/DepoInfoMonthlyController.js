"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class DepoInfoMonthlyController {

	static async list(req, res, next) {
        let {limit, offset} = req.body;
        let $limit = (limit=="")? `` : ` limit ${limit}`;
        let $offset = (offset=="")? `` : ` offset ${offset}`;

		try {
            let datas = await container_process.sequelize.query(`select 
            cp.cpopr as principal,
            month(cp.cpitgl) as dinfo_month,
            count(cp.crno) as total
            from container_process cp
            where year(cp.cpitgl)=year(now())
            group by cp.cpopr, month(cp.cpitgl)
            ${$limit} ${$offset}`, 
            {
                type: container_process.SELECT
            }
            );
            
            baseResponse({ message: "List Depo Info Monthly", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = DepoInfoMonthlyController;