"use strict";

const bcrypt = require("bcrypt");

const baseResponse = require("../../utils/helper/Response");
const { tblusers } = require("../../db/models");
const token = require("../../utils/helper/Token");

class UserController {
	static async signup(req, res, next) {
		let { groupId, fullName, email, username, password } = req.body;
		
		try {
			const payload = await tblusers.create({
				group_id: groupId, 
				fullname: fullName,
				username: username,
				email: email,
				password: bcrypt.hashSync(password, 10)
			});
			baseResponse({ message: "user created", data: payload })(res);
		} catch (error) {
			res.status(400);
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

	static async profile(req, res, next) {
		try {
			res.status(200);
			return res.json(req.tblusers.entity);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async getContacts(req, res, next) {
		try {
			let payload = await tblusers.findAll();
			baseResponse({ message: "list contacts", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = UserController;
