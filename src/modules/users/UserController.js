"use strict";

const bcrypt = require("bcrypt");

const baseResponse = require("../../utils/helper/Response");
const { user } = require("../../db/models");
const token = require("../../utils/helper/Token");

class UserController {
	static async signup(req, res, next) {
		let { fullName, email, username, phoneNumber, password } = req.body;
		let defaultImage =
			"https://i.pinimg.com/564x/82/64/00/826400943f7549d21cec0418d1a32e2b.jpg";
		try {
			const payload = await user.create({
				fullname: fullName,
				username: username,
				email: email,
				phone_number: phoneNumber,
				photo: defaultImage,
				password: bcrypt.hashSync(password, 10),
				created_at: Date.now(),
				updated_at: Date.now(),
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
			let dataUsername = await user.findOne({
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
			return res.json(req.user.entity);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async getContacts(req, res, next) {
		try {
			let payload = await user.findAll();
			baseResponse({ message: "list contacts", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}
}

module.exports = UserController;
