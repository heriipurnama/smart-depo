"use strict";

const express = require("express");
const routers = express.Router();

const user = require("./users/UserRouter");
const messages = require("./message/MessageRouter");
const container_code = require("./container_code/ContainerCodeRouter");
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
const damageTariffDetail = require("./damage_tariff_detail/DamageTariffDetailRouter");

const modules = require("./modules/ModulesRouter");

// base router
routers.use("/users", user);
routers.use("/messages", messages);
routers.use("/containercode", container_code);
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
routers.use("/damage_tariff_details", damageTariffDetail);

routers.use("/modules", modules);

module.exports = routers;
