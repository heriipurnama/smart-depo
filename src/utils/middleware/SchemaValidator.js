"use strict";

const { check, validationResult } = require("express-validator");

const { tblusers } = require("../../db/models");

class SchemaValidator {
	// fullname 	    STRING 	required, max 30 chars
	// username 	    STRING 	required, max 30 chars, unique
	// email 	        STRING 	required, pattern email, and unique
	// password 	    STRING 	required

	static user() {
		return [
			check("fullName").isString().isLength({ max: 30, min: 1 }),
			check("username")
				.isString()
				.isLength({ max: 30, min: 1 })
				.custom((username) => {
					return tblusers
						.findOne({ where: { username: username } })
						.then((tblusers) => {
							if (tblusers) {
								return Promise.reject("Username already exists!");
							}
						});
				}),
			check("email")
				.isEmail()
				.isLength({ min: 1 })
				.custom((email) => {
					return tblusers
						.findOne({ where: { email: email } })
						.then((tblusers) => {
							if (tblusers) {
								return Promise.reject("Email already exists!");
							}
						});
				}),
			check("password").isString().isLength({ min: 1 }),
		];
	}

	// validate
	static validate(req, res, next) {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		const extractedErrors = [];
		errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
		return res.status(422).json({
			success: "Failled",
			message: extractedErrors,
			stact: {},
		});
	}
}

module.exports = SchemaValidator;
