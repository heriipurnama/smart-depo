"use strict";

module.exports = (req, res, next) => {
	if(req.tblusers.group_id === 4){
		return next();
	}
	
	res.status(403).json({
		status: "Failled",
		message: "Access Forbidden",
		stact: {}
	});
};
