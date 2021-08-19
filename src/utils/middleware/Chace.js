/* eslint-disable no-undef */
"use strict";

const redis = require("redis");
const client = redis.createClient({
	host: `${process.env.REDIS_HOST_PROD}`,
	port: process.env.REDIS_PORT_PROD
});


client.on("error", function (error) {
	console.error(error);
});

const  Cache = (req, res, next) => {
	try {
		client.get(req.originalUrl, (err, reply) => {
			if (reply) {
				const resultData = reply;
				res.header("Content-Type","application/json");
				res.send(resultData)
					.status(200);
			} else {
				next();
			}
		});
	} catch (error) {
		res.status(500);
		next(error);
	}
};

module.exports = Cache;
