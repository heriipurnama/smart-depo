"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_process } = require("../../db/models");
const Logger = require("../../utils/helper/logger");


class InventoryMscController {

	static async list(req, res, next) {
        let {prcode, clength, ctcode, condition, start, rows} = req.body;
        let $prcode = (prcode=="")? `` : ` cp.cpopr='`+prcode+`' and`;
        let $clength = (clength=="")? `` : ` cc.cclength='`+clength+`' and`;
        let $ctcode = (ctcode=="")? `` : ` cc.ctcode='`+ctcode+`' and`;
        let $condition = (condition=="")? `` : ` con.crlastcond='`+condition+`' and`;

		try {
            let datas = await container_process.sequelize.query(`select 
                left(cp.crno, 4) as prefix,
                mid(cp.crno, 5, 6) as serial_no,
                right(cp.crno, 1) as cd,
                cc.cclength as csize,
                cc.ctcode as ctype,
                con.crlastcond as cond,
                con.crweightk as payload,
                date_format(con.crmandat, '%y/%m/%d')  as date_mnfg,
                '-'  as do_cy_sp2,
                date_format(cp.cpitgl, '%y/%m/%d') as date_in,
                cp.cpijam as time_of_interchange,
                cp.cpives + ' - ' + cp.cpivoy as ves_voy,
                cp.cpideliver as consignee_emkl,
                cp.cpinopol as truck_no,
                cp.cpirefin as no_do_sp2,
                '-' as bl_no,
                '-' as vent_n_y
            from container_process cp
                left join tblcontainer con on con.crno = cp.crno
                left join container_survey sur on sur.cpid = cp.cpid
                inner join tblcontainer_code cc on cc.cccode = con.cccode  
                left join tblvoyage voy on voy.voyid = cp.cpivoyid
            where  
                ${$prcode}
                ${$clength}
                ${$ctcode}
                ${$condition}
                (cp.cpotgl is null or cp.cpotgl='0000-00-00')
            order by prefix`, 
            {
                type: container_process.SELECT
            }
            );
            
            baseResponse({ message: "List Inventory MSC", data: { datas } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = InventoryMscController;