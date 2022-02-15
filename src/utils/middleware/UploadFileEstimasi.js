"use strict";

const multer = require("multer");
require("dotenv").config();

const { repairDetailFile, container_repair_detail} = require("../../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
/**
 * @Format file-name to save
 * @file + @unix_number_principal + @unique_suffix + @file_type .
 */

const disk = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/docs/");
    },

    filename: (req, file, cb) => {
        const { svid, rpid, flag } = req.body;

        runInsertFile();
        async function runInsertFile() {
            try {
                let dataUsername = await repairDetailFile.findOne({
                    where: {
                        [Op.and]: [
                            {svid: svid},
                            {rpid : rpid}
                        ],
                    },
                });

                if (!dataUsername) {
                    if (!file.length) {
                        let fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
                        let fieldName = file.fieldname;
                        let unixOrderNumber = svid + rpid;
                        let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

                        let resultRenameFileAttachment = `${fieldName}-${unixOrderNumber}-${uniqueSuffix}.${fileExtension}`;
                        // eslint-disable-next-line no-undef
                        let restUrl = `${process.env.BASE_URL}/public/${resultRenameFileAttachment}`;

                        const payload = {
                            svid: svid,
                            rpid: rpid,
                            url: restUrl,
                            flag: flag,
                            file_time_upload: Date.now(),
                        };
                        console.log("update masih bug!");
                        await repairDetailFile.create(payload);
                        cb(null, resultRenameFileAttachment);
                    } else {
                        let resp = "data available!";
                        console.log("data ada");
                        cb(null, resp);
                    }
                }else {
                    let fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
                    let fieldName = file.fieldname;
                    let unixOrderNumber = svid + rpid;
                    let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

                    let resultRenameFileAttachment = `${fieldName}-${unixOrderNumber}-${uniqueSuffix}.${fileExtension}`;
                    // eslint-disable-next-line no-undef
                    let restUrl = `${process.env.BASE_URL}/public/uploads/docs/${resultRenameFileAttachment}`;

                    const payload =  await repairDetailFile.update({
                        svid: svid,
                        rpid: rpid,
                        url: restUrl,
                        flag: flag,
                        file_time_upload: Date.now(),
                    },
                        { where: {
                                [Op.and]: [
                                    {svid: svid},
                                    {rpid : rpid}

                                ],
                            },
                        });
                    cb(null, resultRenameFileAttachment);
                }

            } catch (err) {
                cb(err, null);
            }
        }
    },
});

module.exports = disk;
