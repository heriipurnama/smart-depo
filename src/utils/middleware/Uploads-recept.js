"use strict";

const multer = require("multer");
require("dotenv").config();

const { orderPraFile } = require("../../db/models");

/**
 * @Format file-name to save
 * @file + @unix_number_principal + @unique_suffix + @file_type .
 */

const disk = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads/docs/");
	},

	filename: (req, file, cb) => {
		const { praid, flag } = req.body;

		runInsertFile();
		async function runInsertFile() {
			try {
				if (!file.length) {
					let fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
					let fieldName = file.fieldname;
					let unixOrderNumber = praid;
					let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

					let resultRenameFileAttachment = `${fieldName}-${unixOrderNumber}-${uniqueSuffix}.${fileExtension}`;
					// eslint-disable-next-line no-undef
					let restUrl = `${process.env.BASE_URL}/public/uploads/docs/${resultRenameFileAttachment}`;

					const payload = {
						cpiorderno: praid,
						url: restUrl,
						flag: flag,
						file_time_upload: Date.now(),
					};
					console.log("update masih bug!");
					await orderPraFile.create(payload);
					cb(null, resultRenameFileAttachment);
				} else {
					let resp = "data available!";
					console.log("data ada");
					cb(null, resp);
				}
			} catch (err) {
				cb(err, null);
			}
		}
	},
});

module.exports = disk;
