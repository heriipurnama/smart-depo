const jwt = require("jsonwebtoken");

const token = (user) =>
	jwt.sign(
		{
			id: user.user_id,
			username: user.username,
			email: user.email,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "1h" }
	);
module.exports = token;
