"use strict";

const baseResponse = require("../../utils/helper/Response");
const { damage_type } = require("../../db/models");

class DamageTypeController {
	static async createNew(req, res, next) {
		let { dyCode, dyDesc, dyClean } = req.body;
			"https://i.pinimg.com/564x/82/64/00/826400943f7549d21cec0418d1a32e2b.jpg";
		try {
			const payload = await damage_type.findOrCreate({
				where: {
					dycode: dyCode
				},
				default:{
					dycode: dyCode,
                    dyDesc: dyDesc,
                    dyClean: dyClean
				}
			}).then(results => {
				if (results[1] == false) {
					var msg= "Damage Type Exist ";
					var dataret = {};
				} else {
					var msg= "Damage Type Created ";
					var dataret = result[0];
				}
				return {messg: msg, datareturn:dataret}
			});
			baseResponse({ message: payload.messg, data: payload.datareturn})(res);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { dyCode, dyDesc, dyClean } = req.body;
		let dataUpdate = {
			dycode: dyCode,
            dydesc: dyDesc,
            dyclean: dyClean
		}
		let selector = { 
			where: { id: idDamageType }
		  };
		try {
			let dataDamageType = await damage_type.update(dataUpdate, selector);

			if (!dataDamageType) {
				throw new Error(`Damage Type ${idDamageType} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataDamageType,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { idDamageType } = req.body;
		
		try {
			let dataDamageType = await damage_type.findOne({ 
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				},
				where: {
					id: idDamageType
				}
			});

			if (!dataDamageType) {
				throw new Error(`Damage Type: ${idDamageType} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataDamageType,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
		try {
			let payload = await damage_type.findAll({
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			});
			baseResponse({ message: "List Damage Types", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {idDamageType} = req.body 
		try {
			let payload = await damage_type.destroy({
				where:{id: idDamageType}
			});
			baseResponse({ message: "Success Delete Damage Type", data: payload })(res, 200);
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

module.exports = DamageTypeController;
