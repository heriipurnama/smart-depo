"use strict";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const baseResponse = require("../../utils/helper/Response");
const { orderRepo, company, voyage, orderRepoContainer, vessel } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class OrderRepoController {

	static async createData(req, res, next) {
		let { repoorderno, cpopr, cpcust, repodish, 
			repodisdat, liftoncharge, cpdepo, repopratgl, 
			reporefin, repojam, repovoyid, repoves,
			repocargo, repodeliver
		} = req.body;
        
		try {

			const payload = await orderRepo.create({
				repoorderno: repoorderno, 
				cpopr: cpopr, 
				cpcust: cpcust, 
				repodish: repodish,

				repodisdat: repodisdat, 
				liftoncharge: liftoncharge, 
				cpdepo: cpdepo, 
				repopratgl: repopratgl, 

				reporefin: reporefin, 
				repojam: repojam,
				repovoyid: repovoyid, 
				repoves: repoves,

				repocargo: repocargo,
				repodeliver: repodeliver
			});
            
			baseResponse({ message: "Success Created Order Repo", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async listAllData(req, res, next){
		let { offset, limit } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas }  = await orderRepo.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: voyage,
						as : "voyages",
						attributes: ["voyid", "vesid", "voyno"]
					},
					{
						model: orderRepoContainer,
						as : "orderRepoContainers",
						attributes: ["repocrnoid","repoid","crno", "cccode", "ctcode","cclength","ccheight","repofe","reposhold","reporemark","repogatedate","repoflag"],
						order:[[{model: orderRepoContainer, as: "orderRepoContainers"}, "repocrnoid", "ASC"]]
					},

				],
				order:[[ "repoid", "DESC"]]
			});
			baseResponse({ message: "List Order Repo", data:  { datas, count } })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async detailData(req, res, next) {
		let { repoid } = req.query;
        
		try {
			let payload = await orderRepo.findOne(
				{ 
					where: { repoid : repoid },
					include: [
						{
							model: voyage,
							as : "voyages",
							attributes: ["voyid", "vesid", "voyno"]
						},
						{
							model: orderRepoContainer,
							as : "orderRepoContainers",
							attributes: ["repocrnoid","repoid","crno", "cccode", "ctcode","cclength","ccheight","repofe","reposhold","reporemark","repogatedate","repoflag"],
							order:[[{model: orderRepoContainer, as: "orderRepoContainers"}, "repocrnoid", "ASC"]]
						},
	
					],
				}
			);
			
			if (!payload) {
				throw new Error(`repoid Order Repo: ${repoid} Doesn't Exists!`);
			}
			baseResponse({ message: "Detail Data Prder Repo repoid", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async updateData(req, res, next) {
		let { repoorderno, cpopr, cpcust, repodish, 
			repodisdat, liftoncharge, cpdepo, repopratgl, 
			reporefin, repojam, repovoyid, repoves,
			repocargo, repodeliver, repoid
		} = req.body;

        
		try {
 
			let dataUsername = await orderRepo.findOne({
				where: { repoid: repoid }
			});

			if (!dataUsername) {
				throw new Error(`orderRepo ${repoid} doesn't exists!`);
			}

			await orderRepo.update(
				{
					repoorderno: repoorderno, 
					cpopr: cpopr, 
					cpcust: cpcust, 
					repodish: repodish,

					repodisdat: repodisdat, 
					liftoncharge: liftoncharge, 
					cpdepo: cpdepo, 
					repopratgl: repopratgl, 

					reporefin: reporefin, 
					repojam: repojam,
					repovoyid: repovoyid, 
					repoves: repoves,

					repocargo: repocargo,
					repodeliver: repodeliver
				},
				{ where: { repoid: repoid } }
			);

			baseResponse({ message: "repoid Updated!", data:`Order Repo Success Update For dpcode : ${repoid}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
    
	static async deleteData(req, res, next){
		let { repoid } = req.body;

		try {
			let payload = await orderRepo.destroy({
				where: { repoid : repoid }
			});

			if (!payload) {
				throw new Error(`repoid: ${repoid} doesn't exists!`);
			}

			baseResponse({ message: `Order Repo Deleted For repoid: ${repoid}`, data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async createOrderRepoNumber(req, res, next) {
		try {

			/**
		 * Format PRAIN CODE
		 * prefix[PI/PO] + 'paktrasl' + 'sdcode' + 8digit_number
		 */

			// get data company.
			let resultCompany = await company.findAll({});
			let paktrasl = resultCompany[0].dataValues.paktrasl;
			let sdcode = resultCompany[0].dataValues.sdcode;
			let prefixCode = "RI";

			// get data repo order
			let resultOrderRepo = await orderRepo.findOne({ order:[[ "repoid", "DESC"]]});

			if (resultOrderRepo === null) {

				const resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
				baseResponse({ message: "Success Created Unix Code", data: resultCode })(res, 200);
			} else {

				let resultDataOrderRepo = resultOrderRepo.dataValues.repoorderno;
				let resultSubstringDataOrderRepo = resultDataOrderRepo.substring(7,16);
				let convertInt = parseInt(resultSubstringDataOrderRepo) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				const resultCode = `${prefixCode}${paktrasl}${sdcode}${number}`;

				baseResponse({ message: "Success Created Unix Code", data: resultCode })(res, 200);

			}
		} catch (error) {
			res.status(500);
			next(error);
		}
	}

	static async detailDataPraIn(req, res, next) {
		let { praInCode } = req.body;
        
		try {
			let payload = await orderRepo.findOne(
				{ where: { repoorderno : praInCode }}
			);
			
			if (!payload) {
				throw new Error(`pra in order pra: ${praInCode} doesn't exists!`);
			}
			baseResponse({ message: "detail data pra order by pra in", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async searchPrainByContainerNumber(req, res, next){
		let { offset, limit, containerCode } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas }  = await orderRepo.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: voyage,
						as : "voyages",
						attributes: ["voyid", "vesid", "voyno"]
					},
					{
						model: orderRepoContainer,
						as : "orderRepoContainers",
						attributes: ["repocrnoid","repoid","crno", "cccode", "ctcode","cclength","ccheight","repofe","reposhold","reporemark","repogatedate","repoflag"],
						order:[[{model: orderRepoContainer, as: "orderRepoContainers"}, "repocrnoid", "ASC"]],
						where: {
							crno: { [Op.like]: `%${containerCode}%`}
						},
					},

				],
				order:[[ "repoid", "DESC"]]
			});
			baseResponse({ message: "list order repo", data:  { datas, count } })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async printOrderByPraOrderId(req, res, next){
		let { offset, limit, repoid } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;

			let { count, rows: datas }  = await orderRepo.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: voyage,
						as : "voyages",
						attributes: ["voyid", "vesid", "voyno"]
					},
					{
						model: vessel,
						as : "vessels",
						// attributes: ["voyid", "vesid", "voyno"]
					},
					{
						model: orderRepoContainer,
						as : "orderRepoContainers",
						attributes: ["repocrnoid","repoid","crno", "cccode", "ctcode","cclength","ccheight","repofe","reposhold","reporemark","repogatedate","repoflag"],
						order:[[{model: orderRepoContainer, as: "orderRepoContainers"}, "repocrnoid", "ASC"]]
					},

				],
				where:{ repoid : repoid },
				order:[[ "repoid", "DESC"]]
			});
			baseResponse({ message: "List Order Repo", data:  { datas, count } })(res, 200);
			
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = OrderRepoController;
