"use strict";

const baseResponse = require("../../utils/helper/Response");
const { port} = require("../../db/models");
const Op = require('sequelize').Op;


class PortController {
	static async createNew(req, res, next) {
        let { poport} = req.body;
		try {
			const [payload, created] = await port.findOrCreate({
				where: {
					poport: poport
				},
				defaults:{
                    poid: req.body.poid,
                    cncode:  req.body.cncode,
                    podesc: req.body.podesc
				}
            })
            if(created === false){
                throw new Error(`Port Exist, POPORT: ${poport} exists!`);
            } else {
            baseResponse({ message:"Port Created " , data: payload})(res, 200);
            }
            
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { poport } = req.body;
		let dataUpdate = {
            poid: req.body.poid,
            cncode: req.body.cncode,
            podesc: req.body.podesc
		}
		let selector = { 
			where: { poport: poport }
		};
		try {
			let dataPort = await port.update(dataUpdate, selector);
			if (!dataPort) {
				throw new Error(`Port, POPORT: ${poport} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataPort,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { poport } = req.body;
		
		try {
			let dataPort = await port.findOne({
				where: {
					poport: poport
				}
			});

			if (!dataPort) {
				throw new Error(`Port POPORT: ${poport} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataPort,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
        let {start, rows} = req.body;
		try {
			let payload = await port.findAll({
				offset: start,
				limit: rows
			});
			baseResponse({ message: "List Ports", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {poport} = req.body 
		try {
			let dataPort = await port.destroy({
				where:{poport: poport}
            });
            if (!dataPort) {
				throw new Error(`Port POPORT: ${poport} doesn't exists!`);
			}
			baseResponse({ message: "Success Delete Port", data: dataPort })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }
}

module.exports = PortController;
