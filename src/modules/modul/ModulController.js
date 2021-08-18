"use strict";

const baseResponse = require("../../utils/helper/Response");
const { tblmodules } = require("../../db/models");


class ModulController {
	static async createNew(req, res, next) {
		// let { parent, modvar, name, desc, modstatus, modurl, has_view,printpdf } = req.body;
		try {
			const payload = await tblmodules.create({ 
				defaults: {
					module_parent: req.body.module_parent,
                    module_var: req.body.module_var,
                    module_name: req.body.module_name,
                    module_description: req.body.module_description,
                    module_status: req.body.module_status,
                    module_url: req.body.module_url,
                    module_config: req.body.module_config,
                    module_icon: req.body.module_icon,
                    sort_index: req.body.sort_index,
                    module_content: req.body.module_content,
                    module_type: req.body.module_type
				}
			})
			if(!payload){
                throw new Error(`Create Modul Failed`);
			} else {
				baseResponse({ message:"Modul Created " , data: payload})(res);
			}
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { id } = req.body;
		let dataUpdate = {
			module_parent: req.body.module_parent,
            module_var: req.body.module_var,
            module_name: req.body.module_name,
            module_description: req.body.module_description,
            module_status: req.body.module_status,
            module_url: req.body.module_url,
            module_config: req.body.module_config,
            module_icon: req.body.module_icon,
            sort_index: req.body.sort_index,
            module_content: req.body.module_content,
            module_type: req.body.module_type
		};
		let selector = { 
			where: { module_id: id }
		};
		try {
			
			let dataModul = await tblmodules.update(dataUpdate, selector);

			if (!dataModul) {
				throw new Error(`Update Data Failed`);
			}
			baseResponse({
				message: "Update Success",
				data: dataModul,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { id} = req.body;
		
		try {
			let dataModul = await tblmodules.findOne({ 
				where: {
					module_id: id
                }
			});

			if (!dataModul) {
				throw new Error(`Group id: ${groupId} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataModul,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
        
        let { start, rows} = req.body;
		try {
			let payload = await tblmodules.findAll({
				offset: start,
                limit: rows
			});
			baseResponse({ message: "List Modul", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {id} = req.body; 
		try {
			let payload = await tblmodules.destroy({
				where:{module_id: id}
			});
			baseResponse({ message: "Success Delete Modul", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = ModulController;
