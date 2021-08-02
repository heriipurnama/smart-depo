const jwt = require("jsonwebtoken");

const token = (user) =>
	jwt.sign(
		{
			id: user.id,
			email: user.email,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "1d" }
	);
module.exports = token;
