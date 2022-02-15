"use strict";

const multer = require("multer");
require("dotenv").config();

const { orderRepo, orderRepoFile } = require("../../db/models");

/**
 * @Format file-name to save
 * @file + @unix_number_principal + @unique_suffix + @file_type .
 */


const disk = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads/docs/");
	},
    
	filename: (req, file, cb) => {
		const { repoorderno } = req.body;

		runInsertFile();
		async function  runInsertFile() {
			try {
				let getNumberPraNIn =  await orderRepo.findOne({ where: { repoorderno: repoorderno }});

				if (!file.length && getNumberPraNIn === null) {
					let fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
					let fieldName = file.fieldname;
					let unixOrderNumber = repoorderno ;
					let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

					let resultRenameFileAttachment = `${fieldName}-${unixOrderNumber}-${uniqueSuffix}.${fileExtension}`;
					// eslint-disable-next-line no-undef
					let restUrl = `${process.env.BASE_URL}/public/uploads/docs/${resultRenameFileAttachment}`;

					const payload = {
						repoorderno : repoorderno,
						url : restUrl,
						file_time_upload : Date.now()
					};

					await orderRepoFile.create(payload);
					cb(null, resultRenameFileAttachment);
				}else{
					let resp = "data available!";
					cb(null, resp);
				}
                    
			} catch (err) {
				cb(err, null);
			}
		}
	}
});

module.exports = disk;
