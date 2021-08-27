"use strict";

const baseResponse = require("../../utils/helper/Response");
const { component } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class ComponentController {
	static async createNew(req, res, next) {
		let { cmCode, cmDesc, cmCode_ssl_ext } = req.body;
		try {
			const [payload, created] = await component.findOrCreate({
				where: {
					cmcode: cmCode
				},
				defaults:{
					cmcode: cmCode,
					cmdesc: cmDesc,
					cmcode_ssl_ext: cmCode_ssl_ext,
				}
			});
			if(created === false){
				throw new Error(`Component Exist, cmcode: ${cmCode} exists!`);
			} else {
				baseResponse({ message:"Component Created " , data: payload})(res, 200);
				Logger(req);
			}
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { cmDesc, cmCode_ssl_ext, idComponent } = req.body;
		let dataUpdate = {
			cmdesc: cmDesc,
			cmcode_ssl_ext: cmCode_ssl_ext,
		};
		let selector = { 
			where: { cmcode: idComponent }
		};
		try {
			let dataComponent = await component.update(dataUpdate, selector);

			if (!dataComponent) {
				throw new Error(`Component ${idComponent} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataComponent,
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { idComponent } = req.body;
		
		try {
			let dataComponent = await component.findOne({ 
				where: {
					cmcode: idComponent
				}
			});

			if (!dataComponent) {
				throw new Error(`Component: ${idComponent} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataComponent,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		let {start, rows} = req.body;

		try {
			let { count, rows: datas } = await component.findAndCountAll({
				offset: start,
				limit: rows
			});
			baseResponse({ message: "List Components", data: { datas, total:rows, count } })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {idComponent} = req.body; 
		try {
			let dataComponent = await component.destroy({
				where:{cmcode: idComponent}
			});
			if (!dataComponent) {
				throw new Error(`Component: ${idComponent} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Component", data: dataComponent })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

}

module.exports = ComponentController;
