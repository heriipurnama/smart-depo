"use strict";

const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const baseResponse = require("../../utils/helper/Response");
const { tblusers, tblgroups } = require("../../db/models");
const token = require("../../utils/helper/Token");
const serviceEmail = require("../../utils/services/ServiceEmail");

const encriptDecript = require("../../utils/middleware/EncriptDecript");
const setRedis = require("../../utils/helper/SetRedis");
const serviceEmailRegister = require("../../utils/services/ServiceEmailRegister");
const Logger = require("../../utils/helper/logger");

class UserController {

	static async signup(req, res, next) {
		let { groupId, fullName, email, username, password } = req.body;
		
		try {
			const payload = await tblusers.create({
				group_id: groupId, 
				fullname: fullName,
				username: username,
				email: email,
				password: bcrypt.hashSync(password, 10),
				created_by: username,
				created_date: new Date(),
				updated_by: username,
				updated_date: new Date(),
				
			});
			const usernameEncript = encriptDecript.encrypt(payload.username);
			baseResponse({ message: "user created", data: payload })(res, 200);
			serviceEmail(email, usernameEncript);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async register(req, res, next) {
		let { groupId, fullName, email, username, password, prcode } = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;

		try {
			const payload = await tblusers.create({
				group_id: groupId, 
				fullname: fullName,
				username: username,
				email: email,
				password: bcrypt.hashSync(password, 10),
				prcode: prcode,
				created_by: usernameByToken,
				created_date: new Date(),
				updated_by: usernameByToken,
				updated_date: new Date(),
				
			});
			baseResponse({ message: "user created", data: payload })(res, 200);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async updatePassword(req, res, next) {
		let { username, oldPassword, newPassword } = req.body;

		try {

			let usernameEmail = username;
			let dataUsername = await tblusers.findOne({
				where: { username: usernameEmail }
			});

			if (!dataUsername) {
				throw new Error(`username ${usernameEmail} doesn't exists!`);
			}

			const isPassword = await bcrypt.compareSync(
				oldPassword,
				dataUsername.password
			);

			if (!isPassword) {
				throw new Error("Wrong Old Password!");
			}

			await tblusers.update(
				{
					password: bcrypt.hashSync(newPassword, 10),
					is_block: "n",
					updated_by: usernameEmail,
					updated_date: new Date(),
					last_pass_change: new Date()
				},
				{ where: { username: usernameEmail } }
			);

			baseResponse({ message: "password updated!", data:`password succes update for user : ${username}` })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async signin(req, res, next) {
		let { username, password } = req.body;

		try {
			let usernameEmail = username;
			let dataUsername = await tblusers.findOne({
				where: { username: usernameEmail },
			});

			if (!dataUsername) {
				throw new Error(`username ${usernameEmail} doesn't exists!`);
			}
			
			if( dataUsername.is_block === "y" ) {
				throw new Error(`username ${usernameEmail} not activated!`);
			}

			const isPassword = await bcrypt.compareSync(
				password,
				dataUsername.password
			);

			if (!isPassword) {
				throw new Error("Wrong Password!");
			}
			baseResponse({
				message: "Login succes",
				data: token(dataUsername),
			})(res, 200);

		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async activated(req, res, next) {
		try {

			const decriptUsername = encriptDecript.decrypt(req.query.alg_wc_ev_verify_email);
			const userDetails = await tblusers.update(
				{
					is_block: "n",
					updated_by: decriptUsername,
					updated_date: new Date(),
				},
				{ where: { username: decriptUsername } }
			);
			if(userDetails == 1){
				const resultDataUser = await tblusers.findOne({ 
					where: { username: decriptUsername }
				});
				baseResponse({ message: `User ${resultDataUser.username} Activated`, data: resultDataUser})(res, 200);
				Logger(req);
			}	
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async profile(req, res, next) {
		try {
			res.status(200);
			return res.json(req.tblusers.entity);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async getAlluser(req, res, next) {
		let { offset, limit } = req.query;

		try {

			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 10;

			let { count, rows: datas } = await tblusers.findAndCountAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: tblgroups,
						as : "groups",
						attributes: ["group_id", "group_name", "description"]
					}
				]
			});
			baseResponse({ message: "list users", data: { datas, count }})(res, 200);
			/**
			 * param
			 * req, message, data
			 */
			setRedis(req, "list users", { datas, total:limits, count });
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async emailActivated(req, res, next) {
		let { userId } = req.body;

		try {
			let payload = await tblusers.findOne({
				where: { user_id : userId }
			});
			
			if (!payload) {
				throw new Error(`user id: ${userId} doesn't exists!`);
			}
			serviceEmailRegister(payload);
			baseResponse({ message: "succes send email", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async changePassword(req, res, next) {
		let { username, newPassword, userEmail } = req.body;

		try {

			let usernameEmail = username;
			let dataUsername = await tblusers.findOne({
				where: { username: usernameEmail }
			});

			if (!dataUsername) {
				throw new Error(`username ${usernameEmail} doesn't exists!`);
			}

			let dataEmail = await tblusers.findOne({
				where: { email: userEmail }
			});

			if (!dataEmail) {
				throw new Error(`email ${userEmail} doesn't exists!`);
			}

			await tblusers.update(
				{
					password: bcrypt.hashSync(newPassword, 10),
					is_block: "n",
					updated_by: usernameEmail,
					updated_date: new Date(),
					last_pass_change: new Date()
				},
				{ where: { username: usernameEmail } }
			);

			baseResponse({ message: `password updated! and user ${username} activated!`, data: dataUsername })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async detailDataUser(req, res, next) {
		let { userId } = req.body;

		try {
			let payload = await tblusers.findOne({
				where: { user_id : userId },
				include: [
					{
						model: tblgroups,
						as : "groups",
						attributes: ["group_id", "group_name", "description"]
					}
				]
			});
			if (!payload) {
				throw new Error(`user id: ${userId} doesn't exists!`);
			}
			baseResponse({ message: "detail data user", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async upateDataUser(req, res, next) {
		let { userId, groupId, prcode, username, fullName, email, password, isBlock } = req.body;

		try {

			let payload = await tblusers.findOne({
				where: { user_id : userId }
			});
			
			if (!payload) {
				throw new Error(`user id: ${userId} doesn't exists!`);
			}

			let bearerheader = req.headers["authorization"];
			const splitBearer = bearerheader.split(" ");
			const bearer = splitBearer[1];

			// eslint-disable-next-line no-undef
			let datas = jwt.verify(bearer, process.env.SECRET_KEY);
			let usernameByToken = datas.username;

			const userDetails = await tblusers.update(
				{	
					group_id: groupId,
					username:username,
					prcode: prcode,
					fullname:fullName,
					email:email,
					is_block:isBlock,
					password: bcrypt.hashSync(password, 10),
					updated_by: usernameByToken,
					updated_date: new Date(),
				},
				{ where: { user_id : userId } }
			);

			if (!userDetails) {
				throw new Error(`user id: ${userId} doesn't exists!`);
			}

			let resultUser = await tblusers.findOne({
				where: { user_id : userId }
			});

			baseResponse({ message: "user updated", data: resultUser })(
				res,
				200
			);
			Logger(req);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async deleteDataUser(req, res, next){
		let { userId } = req.body;

		try {
			let payload = await tblusers.destroy({
				where: { user_id : userId }
			});

			if (!payload) {
				throw new Error(`user id: ${userId} doesn't exists!`);
			}

			baseResponse({ message: "user deleted", data: payload })(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

}

module.exports = UserController;
