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
	stockcontout: require("./stock_cont_out/StockContOutController")


	

};
