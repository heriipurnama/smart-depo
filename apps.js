"use strict";

const express = require("express");
const ip = require("ip");
const colors = require("colors");
const cors = require("cors");

const errorHandler = require("./src/utils/middleware/ErrorHandler");
const routers = require("./src/router");
const logMorgan = require("./src/utils/middleware/LogApplication");

colors.setTheme({
	info: "green",
	help: "cyan",
	warn: "yellow",
	success: "bgBlue",
	error: "red"
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logMorgan);

// eslint-disable-next-line no-undef
const port = process.env.PORT || 4000;

app.use("/api/v1", routers);
errorHandler.forEach((handler) => app.use(handler));

app.listen(port, () => {
	console.log("Compiled successfully!".info);
	console.log("App listening at.");
	console.log(`local             : 127.0.0.1:${port}`);
	console.log(`On Your Network   : ${ip.address()}:${port}`);
});
