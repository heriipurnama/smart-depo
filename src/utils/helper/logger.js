"use strict";

const { logActivity } = require("../../db/models");

/**
 * function logger diletakkan setelah function baserespon 
 */
const Logger = async (req, res, next)  =>  {
    
	let dataLogger = {
		timestamp_date: req._startTime,
		username: req.tblusers.dataValues.username,
		action: req.originalUrl,
		note: `Method: ${req.method}, Acces: ${req.rawHeaders[3]}`,
		ip: req.connection.remoteAddress
	};
    
	try { 
		await logActivity.create(dataLogger);
	} catch (error) {
		res.status(500);
		next(error);
	}
};

module.exports = Logger;
