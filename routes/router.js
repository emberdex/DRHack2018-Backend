var config;

try {
	config = require("./../config/config.json");	
} catch (ex) {
	console.log("[Router] failed to import config.json.");
	console.log("[Router] Please check that the file exists, and try again.")
	process.exit(1);
}

const MongoClient = require('mongodb').MongoClient;

exports.getRankings = (req, res) => {
	// TODO: Get rankings for countryID and fieldName.
}

exports.getAll = (req, res) => {

	res.header('Access-Control-Allow-Origin', '*');

	(async function(req, res) {
		let client;

		try {
			client = await MongoClient.connect(config.mongodb.connectionString);

			console.log(`[Router] connected to MongoDB server ${config.mongodb.connectionString}`);
			console.log(`[Router] getting all countries, oh man i am not good with database plz to help`);

			const db = client.db('drhack2018');
			const collection = db.collection('countries');

			const result = await collection.find({year: 2012}).toArray();

			res.status(200).json({status: "success", data: result});

			client.close();
		} catch (ex) {
			console.log(ex.stack);
		}
	})(req, res);
}

exports.search = (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');

	(async function(req, res) {
		let client;

		try {
			client = await MongoClient.connect(config.mongodb.connectionString);

			console.log(`[Router] connected to MongoDB server ${config.mongodb.connectionString}`);
			console.log(`[Router] searching for country \"${req.params.countryName}\"`);

			const db = client.db('drhack2018');
			const collection = db.collection('countries');

			const result = await collection.find({year: 2012}).toArray();

			let results = [];
			for(var i = 0; i < result.length; i++) {
				if(result[i].state.includes(req.params.countryName)) {
					results.push(result[i]);
				}
			}

			if (results.length == 0) { res.status(404).json({status: "not-found"}); }
			else { res.status(200).json({status: "success", data: results}); }

			client.close();
		} catch (ex) {
			console.log(ex.stack);
		}
	})(req, res);
}

exports.getCountryNames = (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');

	(async function() {
		let client;

		try {
			client = await MongoClient.connect(config.mongodb.connectionString);

			console.log(`[Router] connected to MongoDB server ${config.mongodb.connectionString}`);
			console.log(`[Router] getting country names`);

			const db = client.db('drhack2018');
			const collection = db.collection('countries');

			const result = await collection.find({ year: 2012 }, { fields: { state: 1, _id: 0 } }).toArray();

			let countries = [];
			for(var i = 0; i < result.length; i++) {
				countries.push(result[i].state);
			}

			res.status(200).json({status: "success", data: countries});

			client.close();
		} catch (ex) {
			console.log(ex.stack);
		}
	})(req, res);
}