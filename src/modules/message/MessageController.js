"use strict";

const baseResponse = require("../../utils/helper/Response");
const { message } = require("../../db/models");
const encriptDecript = require("../../utils/middleware/EncriptDecript");

class MessageController {
	static async createMessages(req, res, next) {
		const { idReceiver, messages } = req.body;
		const restEncryptedMessage = encriptDecript.encrypt(messages);
		const restDecryptedMessage = encriptDecript.decrypt(restEncryptedMessage);

		try {
			await message.create({
				id_sender: req.user.id,
				id_receiver: idReceiver,
				message: restEncryptedMessage,
				created_at: Date.now(),
				updated_at: Date.now(),
			});

			const datas = {
				id_sender: req.user.id,
				id_receiver: idReceiver,
				message: restDecryptedMessage,
				created_at: Date(),
				updated_at: Date(),
			};

			baseResponse({ message: "message created", data: datas })(res);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
}

module.exports = MessageController;
