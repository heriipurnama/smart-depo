/* eslint-disable no-undef */
"use strict";

const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
	host: `${process.env.REDIS_HOST_PROD}`,
	port: process.env.REDIS_PORT_PROD
});

client.on("error", function (error) {
	console.error(error);
});

const SetRedis = (req, message, payload) => {
	const setDataRedis = {
		"success": true,
		"message": message,
		"data": payload
	};

	try {
		client.get(req.originalUrl, (err, reply) => {
			if (reply) {
				throw new Error("double key !");
			} else {
				client.setex(req.originalUrl, 3600, JSON.stringify(setDataRedis));
			}
		});
	} catch (error) {
		res.status(500);
		next(error);
	}
};

module.exports = SetRedis;