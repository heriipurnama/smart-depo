"use strict";

module.exports = {
	user: require("./users/UserController"),
	message: require("./message/MessageController"),
	container_code: require("./container_code/ContainerCodeController"),
	containerType: require("./container_type/ContainerTypeController"),

	damageType: require("./damage_type/DamageTypeController"),
	group: require("./group/GroupController"),
	principal: require("./principal/PrincipalController"),
	location: require("./location/LocationController"),

	param: require("./param/ParamController"),
	groups: require("./groups/GroupsController"),
	container: require("./container/ContainerController"),
	privilege: require("./privilege/PrivilegeController"),

	city: require("./city/CityController"),
	component: require("./component/ComponentController"),
	country: require("./country/CountryController"),
	vessel: require("./vessel/VesselController"),

	voyage: require("./voyage/VoyageController"),
	port: require("./port/PortController"),
	currency: require("./currency/CurrencyController"),
	material: require("./material/MaterialController"),

	damageTariff: require("./damage_tarif/DamageTariffController"),
	depo: require("./depo/DepoController"),
	debitur: require("./debitur/DebiturController"),
	repoTariffDetail: require("./repo_tariff_detail/RepoTariffDetail"),

	repairMethod: require("./repair_method/RepairMethodController"),
	logActivity: require("./log_activity/LogActivityController"),
	company: require("./company/CompanyController"),
	contract: require("./contract/ContractController"),

	damageTariffDetail: require("./damage_tariff_detail/DamageTariffDetailController"),
	modules: require("./modul/ModulController"),
	orderPra: require("./order_pra/OrderPraController"),
	orderPraContainer: require("./order_pra_container/OrderPraContainerController"),

	orderPraRecept: require("./order_pra_recept/OrderPraReceptController"),
	notification: require("./notification/NotificationController"),
	orderRepo: require("./order_repo/OrderRepoController"),
	orderRepoContainer: require("./order_repo_container/OrderRepoContainerController"),

	gateOut: require("./gateout/GateOutController"),
	survey: require("./survey/SurveyController"),
	estimation: require("./estimation/EstimationController"),
	approval: require("./approval/ApprovalController"),

	workOrder: require("./work_order/WorkOrderController"),
	eorcost: require("./eor_cost/EorCostController"),
	repoin: require("./repoin/RepoInController"),
	repoout: require("./repoout/RepoOutController"),

	sumconttype: require("./sum_cont_type/SumContTypeController"),
	stockcontout: require("./stock_cont_out/StockContOutController"),
	stockcontinventory: require("./stock_cont_inventory/StockContInventoryController"),
	stockcontin: require("./stock_cont_in/StockContInController"),

	rekapStockContInv: require("./rekap_stock_cont_inv/RekapStockContInvController"),
	losContainer: require("./los_container/LosContainerController"),
	inventorySum: require("./inventory_sum/InventorySumController"),
	inventory: require("./inventory/InventoryController"),

	inventoryNotAvailable: require("./inventory_not_available/InventoryNotAvailableController"),
	inventoryMsc: require("./inventory_msc/InventoryMscController"),
	depoInfoDaily: require("./depo_info_daily/DepoInfoDailyController"),
	depoInfoMonthly: require("./depo_info_monthly/DepoInfoMonthlyController"),

	damageStatStockContainer: require("./damage_stat_stock_container/DamageStatStockContainerController"),
	damageProgress: require("./damage_prog/DamageProgressController"),
	dailyRepairActivity: require("./daily_repair_activity/DailyRepairActivityController"),
	dailyMovementOutSum: require("./daily_movement_out_sum/DailyMovementOutSumController"),

	dailyMovementOutMsc: require("./daily_movement_out_msc/DailyMovementOutMscController"),
	orderContainerRepo: require("./order_container_repo/OrderContainerRepoController"),
	praIn: require("./pra_in/PraInController"),
	containerProcess: require("./container_process/ContainerProcessController"),

	dataListReport: require("./data_list_reports/dataListReportController"),
	inventoryContainerIn: require("./inventory_container_in/InventoryContainerInController"),
	inventoryContainerOut: require("./inventory_container_out/InventoryContainerOutController"),
	inventoryStockContainer: require("./inventory_stock_container/InventoryStockContainerController"),

	dailyMovementInMsc: require("./daily_movement_in_msc/DailyMovementInMscController"),
};
