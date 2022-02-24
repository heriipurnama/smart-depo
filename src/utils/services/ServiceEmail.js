/* eslint-disable no-undef */
"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

const ServiceEmail = (email, usernameEncript) => {
	try {
		let transport = nodemailer.createTransport({
			service: "Outlook365",
			secure: false,
			port: 587,
			auth: {
				// eslint-disable-next-line no-undef
				user: process.env.SERVER_EMAIL_USER,
				pass: process.env.SERVER_EMAIL_PASS,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		const mailOptions = {
			from: process.env.SERVER_EMAIL_USER,
			to: email,
			subject: "Please activate your account",
			text: `Please click the following link to verify your email: ${process.env.BASE_URL}/api/v1/users/auth/activate?alg_wc_ev_verify_email=${usernameEncript}`,
		};

		transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email send: " + info.response);
			}
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = ServiceEmail;
