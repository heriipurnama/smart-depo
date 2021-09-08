const jwt = require("jsonwebtoken");

const token = (user) =>
	jwt.sign(
		{
			id: user.user_id,
			username: user.username,
			email: user.email,
			groupId: user.group_id,
			prcode: user.prcode
		},
		// eslint-disable-next-line no-undef
		process.env.SECRET_KEY,
		{ expiresIn: "1h" }
	);
module.exports = token;
