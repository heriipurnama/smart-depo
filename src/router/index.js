"use strict";

const express = require("express");
const routers = express.Router();

const user = require("./users/UserRouter");
const messages = require("./message/MessageRouter");
const container_code = require("./container_code/ContainerCodeRouter");
const mnr_tarif = require("./mnr_tarif/MnrTarifRouter");
const containerType = require("./container_type/ContainerTypeRouter");

const damageType = require("./damage_type/DamageTypeRouter");
const group = require("./group/GroupRouter");
const principal = require("./principal/PrincipalRouter");
const location = require("./location/LocationRouter");

const param = require("./param/ParamRouter");
const container = require("./container/ContainerRouter");
const privilege = require("./privilege/PrivilegeRouter");
const city = require("./city/CityRouter");

const component = require("./component/ComponentRouter");
const country = require("./country/CountryRouter");
const vessel = require("./vessel/VesselRouter");
const voyage = require("./voyage/VoyageRouter");

const port = require("./port/PortRouter");
const groups = require("./groups/GroupsRouter");
const currency = require("./currency/CurrencyRouter");
const material = require("./material/MaterialRouter");

const damageTariff = require("./damage_tariff/DamageTariffRouter");
const depo = require("./depo/DepoRouter");
const debitur = require("./debitur/DebiturRouter");
const repoTariffDetail = require("./repo_tariff_detail/RepoTariffDetailRouter");

const repairMethod = require("./repair_method/RepairMethodRouter");
const logActivity = require("./log_activity/LogActivityRouter");
const company = require("./company/CompanyRouter");
const contract = require("./contract/ContractRouter");

const damageTariffDetail = require("./damage_tariff_detail/DamageTariffDetailRouter");
const modules = require("./modules/ModulesRouter");
const orderPra = require("./order_pra/OrderPraRouter");
const orderPraContainer = require("./order_pra_container/OrderPraContainerRouter");

const orderPraRecept = require("./order_pra_recept/OrderPraReceptRouter");
const notification = require("./notification/NotificationRouter");
const orderRepo = require("./order_repo/OrderRepoRouter");
const orderRepoContainer = require("./order_repo_container/OrderRepoContainerRouter");

const gateOut = require("./gateout/GateOutRouter");
const survey = require("./survey/SurveyRouter");
const estimation = require("./estimation/EstimationRouter");
const approval = require("./approval/ApprovalRouter");

const workOrder = require("./work_order/WorkOrderRouter");
const eorcost = require("./eor_cost/EorCostRouter");
const repoin = require("./repoin/RepoInRouter");
const repoout = require("./repoout/RepoOutRouter");

const sumconttype = require("./sum_cont_type/SumContTypeRouter");
const stockcontout = require("./stock_cont_out/StockContOutRouter");
const stockcontinventory = require("./stock_cont_inventory/StockContInventoryRouter");
const stockcontin = require("./stock_cont_in/StockContInRouter");

const rekapStockContInv = require("./rekap_stock_cont_inv/RekapStockContInvRouter");
const losContainer = require("./los_container/LosContainerRouter");
const inventorySum = require("./inventory_sum/InventorySumRouter");
const inventory = require("./inventory/InventoryRouter");
const inventoryNotAvailable = require("./inventory_not_available/InventoryNotAvailableRouter");

const inventoryMsc = require("./inventory_msc/InventoryMscRouter");
const depoInfoDaily = require("./depo_info_daily/DepoInfoDailyRouter");
const depoInfoMonthly = require("./depo_info_monthly/DepoInfoMonthlyRouter");
const damageStatStockContainer = require("./damage_stat_stock_container/DamageStatStockContainerRouter");

const damageProgress = require("./damage_progress/DamageProgressRouter");
const dailyRepairActivity = require("./daily_repair_activity/DailyRepairActivityRouter");
const dailyMovementOutSum = require("./daily_movement_out_sum/DailyMovementOutSumRouter");
const dailyMovementOutMsc = require("./daily_movement_out_msc/DailyMovementOutMscRouter");

const orderContainerRepo = require("./order_container_repo/OrderContainerRepoRouter");
const praIn = require("./pra_in/PraInRouter");
const containerProcess = require("./container_process/ContainerProcessRouter");
const dataListReport = require("./data_list_reports/dataListReportRouter");

const inventoryContainerIn = require("./inventory_container_in/InventoryContainerInRouter");
const inventoryContainerOut = require("./inventory_container_out/InventoryContainerOutRouter");
const inventoryStockContainer = require("./inventory_stock_container/InventoryStockContainerRouter");
const dailyMovementInMsc = require("./daily_movement_in_msc/DailyMovementInMscRouter");

const masukGudang = require("./msk_gudang/MskGudangRouter");
const estimasi = require("./estimasi/EstimasiRouter");
const keluarGudang = require("./krl_gudang/KrlGudangRouter");
const reports = require("./reports/ReportsRouter");
const containerHold = require("./container_hold/ContainerHoldRouter");
const repoTarif = require("./repo_tarif/RepoTarifRouter");
const otherWorkOrder =require("./other_work_order/OtherWorkOrderRouter");
const woRecept=require("./wo_recept/WoReceptRouter");
const containerRepair=require("./container_repair/ContainerRepairRouter");
const woContainer=require("./wo_container/WoContainerRouter");
const woRab=require("./wo_rab/WoRabRouter");
const edi=require("./edi/EdiRouter");

// base router
routers.use("/users", user);
routers.use("/messages", messages);
routers.use("/containercode", container_code);
routers.use("/mnrtarif", mnr_tarif);
routers.use("/containertype", containerType);

routers.use("/damagetype", damageType);
routers.use("/groups", group);
routers.use("/principals", principal);
routers.use("/locations", location);

routers.use("/params", param);
routers.use("/containers", container);
routers.use("/privilege", privilege);
routers.use("/city", city);

routers.use("/components", component);
routers.use("/countries", country);
routers.use("/vessels", vessel);
routers.use("/voyages", voyage);

routers.use("/ports", port);
routers.use("/groups", groups);
routers.use("/currency", currency);
routers.use("/materials", material);

routers.use("/damage_tariffs", damageTariff);
routers.use("/depos", depo);
routers.use("/debiturs", debitur);
routers.use("/repo_tariff_details", repoTariffDetail);

routers.use("/repair_methods", repairMethod);
routers.use("/log_activities", logActivity);
routers.use("/companies", company);
routers.use("/contracts", contract);

routers.use("/damage_tariff_details", damageTariffDetail);
routers.use("/modules", modules);
routers.use("/orderPras", orderPra);
routers.use("/orderPraContainers", orderPraContainer);

routers.use("/orderPraRecepts", orderPraRecept);
routers.use("/notifications", notification);
routers.use("/orderRepo", orderRepo);
routers.use("/orderRepoContainer", orderRepoContainer);

routers.use("/gateOut", gateOut);
routers.use("/survey", survey);
routers.use("/estimation", estimation);
routers.use("/approval", approval);

routers.use("/workorder", workOrder);
routers.use("/eorcost", eorcost);
routers.use("/repoin", repoin);
routers.use("/repoout", repoout);

routers.use("/rpt_container_type", sumconttype);
routers.use("/rpt_stock_container_out", stockcontout);
routers.use("/rpt_stock_container_inventory", stockcontinventory);
routers.use("/rpt_stock_container_in", stockcontin);

routers.use("/rpt_rekap_stock_container_inv", rekapStockContInv);
routers.use("/rpt_los_container", losContainer);
routers.use("/rpt_inventory_sum", inventorySum);
routers.use("/rpt_inventory", inventory);

routers.use("/rpt_inventory_not_available", inventoryNotAvailable);
routers.use("/rpt_inventory_msc", inventoryMsc);
routers.use("/rpt_depo_info_daily", depoInfoDaily);
routers.use("/rpt_depo_info_monthly", depoInfoMonthly);

routers.use("/rpt_damage_stat_stock_container", damageStatStockContainer);
routers.use("/rpt_damage_progress", damageProgress);
routers.use("/rpt_daily_repair_activity", dailyRepairActivity);
routers.use("/rpt_daily_movement_out_sum", dailyMovementOutSum);

routers.use("/rpt_daily_movement_out_msc", dailyMovementOutMsc);
routers.use("/orderContainerRepos", orderContainerRepo);
routers.use("/praIns", praIn);
routers.use("/containerProcess", containerProcess);
routers.use("/masukGudang", masukGudang);
routers.use("/keluarGudang", keluarGudang);

routers.use("/dataListReports", dataListReport);
routers.use("/rpt_condition_in_container_inventory", inventoryContainerIn);
routers.use("/rpt_condition_out_container_inventory", inventoryContainerOut);
routers.use(
	"/rpt_condition_stock_container_inventory",
	inventoryStockContainer
);

routers.use("/rpt_daily_movement_in_msc", dailyMovementInMsc);
routers.use("/estimasi", estimasi);
routers.use("/reports", reports);
routers.use("/containerHold", containerHold);
routers.use("/repotarif", repoTarif);
routers.use("/otherwo", otherWorkOrder);
routers.use("/worecept", woRecept);
routers.use("/containerRepair", containerRepair);
routers.use("/wocontainer", woContainer);
routers.use("/worab", woRab);
routers.use("/edi", edi);
module.exports = routers;
