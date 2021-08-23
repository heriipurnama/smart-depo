"use strict";

const baseResponse = require("../../utils/helper/Response");
const { principal } = require("../../db/models");

class PrincipalController {
	static async createNew(req, res, next) {
        let { prCode, dset} = req.body;
        // let { prCode, cuCode, cnCode, prName} = req.body;
		try {
			const [payload, created] = await principal.findOrCreate({
				where: {
					prcode: prCode
                },
                defaults: dset
				// defaults:{
                //     cucode: cuCode,
                //     cncode: cnCode,
                //     prname: prName
				// }
            })
            if(created === false){
                throw new Error(`Principal Exist, Principal PRCODE: ${prCode} exists!`);
            } else {
            baseResponse({ message:"Principal Created " , data: payload})(res, 200);
            }
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
        let { id, dset} = req.body;
		let selector = { 
			where: { prcode: id }
        };

		try {
			let updated = await principal.update(dset, selector);

			if (!updated) {
				throw new Error(`PRCODE ${id} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dset,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { id } = req.body;
		
		try {
			let dataList = await principal.findOne({ 
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				},
				where: {
					prcode: id
				}
			});

			if (!dataList) {
				throw new Error(`PRCODE: ${id} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataList,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
        let {start, rows} = req.body;
		try {
			let payload = await principal.findAll({
                offset: start,
                limit: rows
			});
			baseResponse({ message: "List Principals", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {id} = req.body 
		try {
			let dataDelete = await principal.destroy({
				where:{ prcode: id}
            });
            if (!dataDelete) {
				throw new Error(`PRCODE: ${id} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Principal", data: id })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = PrincipalController;
