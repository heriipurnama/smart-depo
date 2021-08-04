"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container_type } = require("../../db/models");

class ContainerTypeController {
	static async createNew(req, res, next) {
		let { ctDesc, ctCode } = req.body;
		let defaultImage =
			"https://i.pinimg.com/564x/82/64/00/826400943f7549d21cec0418d1a32e2b.jpg";
		try {
			const payload = await container_type.create({
				ctcode: ctCode,
				ctdesc: ctDesc
			});
			baseResponse({ message: "Container Type created", data: payload })(res);
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
			let dataContainer = await container_type.update(dataUpdate, selector);

			if (!dataContainer) {
				throw new Error(`Container Type ${idContainerType} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataContainer,
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
		try {
			let payload = await container_type.findAll({
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
