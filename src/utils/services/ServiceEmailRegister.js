	/* eslint-disable no-undef */
"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const ServiceEmailRegister = (payload) => {

	try {
		const filePath = path.join(__dirname,"../../../public/pages/template_confirm_email/index.html");
		path.join(__dirname,"../../../public/assets/images/cotindo.jpeg");
		
		fs.readFile(filePath, { encoding: "utf8" }, function(err, data){
			if (err) throw err;
			let datas = data.toString();
			const mapObj = {
				username: payload.username,
				email: payload.email,
				linkPage: process.env.BASE_URL_WEB_APPS
			};
			datas.replace(/\b(?:username|email|linkPage)\b/gi, matched => mapObj[matched]);	
		});

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

		let headerEmail = "<!DOCTYPE html>"+
						"<html><head><title>Appointment</title>"+
						"</head><body><div>"+
						`<p> Halo, ${payload.fullname}</p>`+
						"<p> Terima kasih telah membuat akun PT. CONTINDO RAYA Silahkan kunjungi URL dibawah dan masuk ke client area dengan akun Anda untuk memverifikasi alamat email untuk menyelesaikan proses registrasi Anda.</p>"+
						"<p> Informasi akun anda:</p>"+
						`<p> Username: ${payload.username}</p>`+
						`<p> Email : ${payload.email}</p>`+
						`<a href='${process.env.BASE_URL_WEB_APPS}'>Klik Disini</a>`+
						"<p>Thanks,</p>"+
						"<p>Admin</p>"+
						"<p>PT. CONTINDO RAYA</p>"+
						"<img src='https://i.im.ge/2021/08/25/BhE2f.jpg' width='100'>"+
						"</div></body></html>";

		let mailOptions = {
			from: process.env.SERVER_EMAIL_USER,
			to: payload.email,
			subject: "Please activate your account!",
			html : headerEmail
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
