"use strict";

const jwt = require("jsonwebtoken");
require("dotenv").config();

const baseResponse = require("../../utils/helper/Response");
const { privilege,tblmodules } = require("../../db/models");
const encriptDecript = require("../../utils/middleware/EncriptDecript");
const Logger = require("../../utils/helper/logger");

class PrivilegeController {

	static async createNew(req, res, next) {
		let { group_id, module_id, has_insert, has_update, has_delete, has_approval, has_view, has_printpdf, has_printxls } = req.body;
		let blk = [];
		// res.json(blk);
		try {
				let mdl = await tblmodules.findAndCountAll();
				mdl.rows.forEach((value, index) => {
					blk[index]= {
						group_id: group_id,
						module_id: value.module_id,
						has_insert: has_insert,
						has_update: has_update,
						has_delete: has_delete,
						has_approval: has_approval,
						has_view: has_view,
						has_printpdf: has_printpdf,
						has_printxls: has_printpdf
					}
				});
			const payload = await privilege.bulkCreate(blk);
			// const payload = await privilege.create({ 
			// 		group_id: group_id,
			// 		module_id: module_id,
			// 		has_insert: has_insert,
			// 		has_update: has_update,
			// 		has_delete: has_delete,
			// 		has_approval: has_approval,
			// 		has_view: has_view,
			// 		has_printpdf: printpdf,
			// 		has_printxls: printxls
			// })
			if(!payload){
				throw new Error("Create Privilege Failed");
			} else {
				baseResponse({ message:"Privilege Created " , data: payload})(res, 200);
				Logger(req);
			}
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { id, group_id, module_id, has_insert, has_update, has_delete, has_approval, has_view, printpdf, printxls } = req.body;
		let dataUpdate = {
			group_id: group_id,
			module_id: module_id,
			has_insert: has_insert,
			has_update: has_update,
			has_delete: has_delete,
			has_approval: has_approval,
			has_view: has_view,
			has_printpdf: printpdf,
			has_printxls: printxls
		};
		let selector = { 
			where: { privilege_id: id }
		};
		try {
			
			let dataPrivilege = await privilege.update(dataUpdate, selector);

			if (!dataPrivilege) {
				throw new Error("Update Data Failed");
			}
			baseResponse({
				message: "Update Success",
				data: dataPrivilege,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { id } = req.body;
		
		try {
			let dataPrivilege = await privilege.findOne({ 
				where: {
					privilege_id: id
				}
				,
				include:[{
					model:tblmodules,
					required: true, // do not generate INNER JOIN
					attributes: { exclude:["createdAt", "updatedAt"]}
				}]
			});

			if (!dataPrivilege) {
				throw new Error(`Group id: ${id} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataPrivilege,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
        
		let { start, rows} = req.body;
		try {

			// let acc = jwt.verify(bearer, process.env.SECRET_KEY);
			// let groupId = acc.groupId
			let payload = await privilege.findAll({
				offset: start,
				limit: rows,
                
				include:[{
					model:tblmodules,
					as: "modules",
					required: false, // do not generate INNER JOIN
					attributes: { exclude:["createdAt", "updatedAt"]}
				}]
			});
			baseResponse({ message: "list privilege", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {id} = req.body; 
		try {
			let payload = await privilege.destroy({
				where:{privilege_id: id}
			});
			baseResponse({ message: "Success Delete Privilege", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async listModule(req, res, next) {
		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];
		let { start, rows} = req.body;
		try {
			let acc = jwt.verify(bearer, process.env.SECRET_KEY);
			let groupId = acc.groupId;
			let payload = await privilege.findAll({
				offset: start,
				limit: rows,
				where: {
					group_id: groupId
				},
				// attributes:	['privilege_id', 'group_id', 'module_id']
				// ,
				include:[{
					model:tblmodules,
					as: "modules",
					required: false, // do not generate INNER JOIN
					attributes: { exclude:["createdAt", "updatedAt"]}
				}]
			});
			baseResponse({ message: "list privilege", data: payload })(res, 200);
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
}

module.exports = PrivilegeController;
