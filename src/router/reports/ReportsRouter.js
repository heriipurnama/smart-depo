"use strict";

const express = require("express");
const routers = express.Router();
const Authentication = require("../../utils/middleware/Auth");
const { reports: ReportsController } = require("../../modules");


// Router
routers.route("/rptDailyMovementIn").get(Authentication, ReportsController.rptDailyMovementIn);
routers.route("/rptDailyMovementOut").get(Authentication, ReportsController.rptDailyMovementOut);
routers.route("/rptDailyRepairActivity").get(Authentication, ReportsController.rptDailyRepairActivity);
routers.route("/rptDamageProgress").get(Authentication, ReportsController.rptDamageProgress);
routers.route("/rptDepoInfoMonthly").get(Authentication, ReportsController.rptDepoInfoMonthly);
routers.route("/rptDepoInfoDaily").get(Authentication, ReportsController.rptDepoInfoDaily);
routers.route("/rptLenghtOfStay").get(Authentication, ReportsController.rptLenghtOfStay);
routers.route("/rptSummaryContainerType").get(Authentication, ReportsController.rptSummaryContainerType);
routers.route("/rptInventory").get(Authentication, ReportsController.rptInventory);
routers.route("/rptInventoryNonAvi").get(Authentication, ReportsController.rptInventoryNonAvi);
routers.route("/rptStatusReport").get(Authentication, ReportsController.rptStatusReport);
routers.route("/billingStorage").get(Authentication, ReportsController.billingStorage);
routers.route("/billingCleaning").get(Authentication, ReportsController.billingCleaning);
routers.route("/billingRepair").get(Authentication, ReportsController.billingRepair);
routers.route("/billingReposition").get(Authentication, ReportsController.billingReposition);
routers.route("/laporanBongkar").get(Authentication, ReportsController.laporanBongkar);
routers.route("/laporanMuat").get(Authentication, ReportsController.laporanMuat);
routers.route("/reportSecurity").get(Authentication, ReportsController.reportSecurity);
routers.route("/reportKwitansi").get(Authentication, ReportsController.rptKwitansi);

module.exports = routers;
