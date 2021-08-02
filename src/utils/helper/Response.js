"use strict";

const baseResponse = ({ success = true, message, data = "" }) => (
	res,
	status = 0
) => {
	const payload = { success, message, data };
	console.log(status);
	if (!status) {
		return res.json(payload);
	}
	return res.status(status).json(payload);
};

module.exports = baseResponse;
