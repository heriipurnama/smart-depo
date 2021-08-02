"use strict";

const jwt = require("jsonwebtoken");
const { user } = require("../../db/models");
require("dotenv").config();

const VerifyToken = async (req, res, next) => {
	try {
		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		req.user = await user.findByPk(datas.id);
		next();
	} catch (error) {
		res.status(401);
		next(new Error("Invalid Token!"));
	}
};

module.exports = VerifyToken;
