"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_type } = require("../../db/models");

class ContainerTypeController {
	static async createNew(req, res, next) {
		let { ctDesc, ctCode } = req.body;
		let defaultImage =
			"https://i.pinimg.com/564x/82/64/00/826400943f7549d21cec0418d1a32e2b.jpg";
		try {
			const [payload,created] = await container_type.findOrCreate({
				where: {
					ctcode: ctCode
				},
				defaults:{
					ctcode: ctCode,
					ctdesc: ctDesc
				}
			})	
			if(created === false){
                throw new Error(`Container Type Exist, ctcode: ${ctCode} exists!`);
			} else {
				baseResponse({ message:"Container Type Created " , data: payload})(res);
			}
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { ctDesc, ctCode } = req.body;
		let dataUpdate = {
			ctcode: ctCode,
			ctdesc: ctDesc
		}
		let selector = { 
			where: { ctcode: idContainerType }
		  };
		try {
			let dataContainerType = await container_type.update(dataUpdate, selector);

			if (!dataContainerType) {
				throw new Error(`Container Type ${idContainerType} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataContainerType,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { idContainerType, idUser } = req.body;
		
		try {
			let dataContainerType = await container_type.findOne({ 
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				},
				where: {
					ctcode: idContainerType
				}
			});

			if (!dataContainerType) {
				throw new Error(`container type: ${idContainerType} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataContainerType,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
        let {start, rows} = req.body;

		try {
			let payload = await container_type.findAll({
				offset: start,
				limit: rows,
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
				// ,
				// include:[{
				// 		model:container_type,
				// 		required: false, // do not generate INNER JOIN
        		// 		attributes: { exclude:['createdAt', 'updatedAt']}
				// 	}]
			});
			baseResponse({ message: "List Container Types", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {idContainerType} = req.body 
		try {
			let payload = await container_type.destroy({
				where:{ctcode: idContainerType}
			});
			baseResponse({ message: "Success Delete Container Type", data: payload })(res, 200);
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

module.exports = ContainerTypeController;
