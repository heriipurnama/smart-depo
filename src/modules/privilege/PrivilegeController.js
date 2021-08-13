"use strict";

const baseResponse = require("../../utils/helper/Response");
const { privilege,tblmodules } = require("../../db/models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const encriptDecript = require("../../utils/middleware/EncriptDecript");


class PrivilegeController {
	static async createNew(req, res, next) {
		let { ccCode, ctCode, ccLength, ccHeight, ccAlias1, ccAlias2, idUser } = req.body;
		try {
			const [payload, created] = await privilege.findOrCreate({ 
				where: {
					cccode: ccCode
				},
				defaults: {
					cccode: ccCode,
					ctcode: ctCode,
					cclength: ccLength,
					ccheight: ccHeight,
					ccalias1: ccAlias1,
					ccalias2: ccAlias2,
					created_at: Date.now(),
					created_by: idUser
				}
			})
			if(created === false){
                throw new Error(`Container Exist, cccode: ${ccCode} exists!`);
			} else {
				baseResponse({ message:"Container Created " , data: payload})(res);
			}
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { ccCode, ctCode, ccLength, ccHeight, ccAlias1, ccAlias2, idUser, idContainer } = req.body;
		let dataUpdate = {
			cccode:ccCode,
			ctcode: ctCode,
			cclength: ccLength,
			ccheight: ccHeight,
			ccalias1: ccAlias1,
			ccalias2: ccAlias2,
			updated_at: Date.now(),
			updated_by: idUser
		};
		let selector = { 
			where: { id: idContainer }
		};
		try {
			let containerCode = ccCode;
			let dataContainer = await privilege.update(dataUpdate, selector);

			if (!dataContainer) {
				throw new Error(`container ${containerCode} doesn't exists!`);
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
		let { groupId} = req.body;
		
		try {
			let dataContainer = await privilege.findOne({ 
				where: {
					group_id: groupId
                }
                ,
				include:[{
					model:tblmodules,
					required: true, // do not generate INNER JOIN
                    attributes: { exclude:["createdAt", "updatedAt"]}
				}]
			});

			if (!dataContainer) {
				throw new Error(`Group id: ${groupId} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataContainer,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
        let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];
        let { start, rows} = req.body;
		try {
            let acc = jwt.verify(bearer, process.env.SECRET_KEY);
            let groupId = acc.group_id
			let payload = await privilege.findAll({
				offset: start,
                limit: rows,
                where: {
					group_id: groupId
                },
				attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }
                ,
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
		let {idContainer} = req.body; 
		try {
			let payload = await privilege.destroy({
				where:{id: idContainer}
			});
			baseResponse({ message: "Success Delete Container", data: payload })(res, 200);
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
