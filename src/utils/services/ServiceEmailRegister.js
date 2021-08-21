/* eslint-disable no-undef */
"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

const ServiceEmailRegister = (payload) => {
	try {

		let transport = nodemailer.createTransport({
			service: "gmail",
			secure: false,
			port: 25,
			auth: {
				// eslint-disable-next-line no-undef
				user: process.env.SERVER_EMAIL_USER,
				pass: process.env.SERVER_EMAIL_PASS
			}, tls: {
				rejectUnauthorized: false
			}
		});
      
		const mailOptions = {
			from: process.env.SERVER_EMAIL_USER,
			to: payload.email,
			subject: "Please activate your account!",
			html: `<b>Info Account</b><br><b>Username : ${payload.username}</b><br><b>Email : ${payload.email}</b><br><b>Please. <a href="${process.env.BASE_URL_WEB_APPS}"> Click here</a> to change password before login</b><br><b>Thanks</b><br><b>Admin</b><br><b>PT. Contindo Raya</b>`
		};
      
		transport.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log("Email send: " + info.response);
			}
		});
	}
	catch (error) {
		console.log(error);
	}
};

module.exports = ServiceEmailRegister;