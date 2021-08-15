"use strict";

const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const baseResponse = require("../../utils/helper/Response");
const { tblusers, tblgroups } = require("../../db/models");
const token = require("../../utils/helper/Token");
const serviceEmail = require("../../utils/middleware/ServiceEmail");

const encriptDecript = require("../../utils/middleware/EncriptDecript");

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
			baseResponse({ message: "user created", data: payload })(res);
			serviceEmail(email, usernameEncript);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async register(req, res, next) {
		let { groupId, fullName, email, username, password } = req.body;

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
				created_by: usernameByToken,
				created_date: new Date(),
				updated_by: usernameByToken,
				updated_date: new Date(),
				
			});
			baseResponse({ message: "user created", data: payload })(res);
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
				},
				{ where: { username: usernameEmail } }
			);

			baseResponse({ message: "password updated!", data:`password succes update for user : ${username}` })(res, 200);
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

			let offsets = parseInt(offset) || 1;
			let limits = parseInt(limit) || 10;

			let payload = await tblusers.findAll({
				offset: offsets,
				limit: limits,
				include: [
					{
						model: tblgroups,
						attributes: ["group_id", "group_name", "description"]
					}
				]
			});
			baseResponse({ message: "list users", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = UserController;
