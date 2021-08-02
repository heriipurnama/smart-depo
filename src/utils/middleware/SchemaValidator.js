"use strict";

const { check, validationResult } = require("express-validator");

const { user } = require("../../db/models");

class SchemaValidator {
	// fullname 	    STRING 	required, max 30 chars
	// username 	    STRING 	required, max 30 chars, unique
	// email 	        STRING 	required, pattern email, and unique
	// password 	    STRING 	required
	// phone number 	STRING 	required

	static user = () => {
		return [
			check("fullName").isString().isLength({ max: 30, min: 1 }),
			check("username")
				.isString()
				.isLength({ max: 30, min: 1 })
				.custom((username) => {
					return user
						.findOne({ where: { username: username } })
						.then((user) => {
							if (user) {
								return Promise.reject("Username already exists!");
							}
						});
				}),
			check("email")
				.isEmail()
				.isLength({ min: 1 })
				.custom((email) => {
					return user.findOne({ where: { email: email } }).then((user) => {
						if (user) {
							return Promise.reject("Email already exists!");
						}
					});
				}),
			check("password").isString().isLength({ min: 1 }),
			check("phoneNumber").isString().isLength({ min: 1 }),
		];
	};

	// validate
	static validate = (req, res, next) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		const extractedErrors = [];
		errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
		return res.status(422).json({
			errors: extractedErrors,
		});
	};
}

module.exports = SchemaValidator;
