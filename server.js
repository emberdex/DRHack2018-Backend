const router = require('./routes/router.js');

const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');

var config;

try {
	config = require("./config/config.json");	
} catch (ex) {
	console.log("[Server-Main] failed to import config.json.");
	console.log("[Server-Main] Please check that the file exists, and try again.");
	process.exit(1);
}

const app = express();

app.use(bp.json());

app.get('/api/search/:countryName', router.search);
app.get('/api/get_all', router.getAll);
app.get('/api/get_rankings/:countryID/:fieldName', router.getRankings);
app.get('/api/get_countries', router.getCountryNames);

app.listen(config.express.port, () => {
	console.log(`[Server-Main] API listening on TCP port ${config.express.port}.`);
})