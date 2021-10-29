"use strict";

const { logActivity } = require("../../db/models");

/**
 * function logger diletakkan setelah function baserespon
 */
// eslint-disable-next-line no-unused-vars
const Logger = async (req, res, _next) => {
	let dataLogger = {
		timestamp_date: req._startTime,
		username: req.tblusers.dataValues.username,
		action: req.originalUrl,
		note: `Method: ${req.method}, Acces: ${req.get("User-Agent")}`,
		ip: req.connection.remoteAddress,
	};

	try {
		await logActivity.create(dataLogger);
	} catch (error) {
		console.log("error log=>>", error);
	}
};

module.exports = Logger;
