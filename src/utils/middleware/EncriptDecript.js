"use strict";

const Cryptr = require("cryptr");
const cryptr = new Cryptr("secretKey");

class EncriptDecript {
	static encrypt = (text) => {
		return cryptr.encrypt(text);
	};

	static decrypt = (text) => {
		return cryptr.decrypt(text);
	};
}
module.exports = EncriptDecript;
