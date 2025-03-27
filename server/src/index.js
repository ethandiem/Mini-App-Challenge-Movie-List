const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
const express = require("express");
const app = express();
var PORT = process.env.SERVER_PORT;
const cors = require("cors");
const knex = require("knex")(require("../knexfile")["development"]);

if (!PORT) {
	dotenv.config({ path: path.resolve(__dirname, "../../.env") });
	PORT = process.env.SERVER_PORT;
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({message: "MOOOOOVIES HOME"});
});

app.get('/movies', async (req, res) => {
	try {
			const query = await knex('movies')
															.select('*')
			res.status(200).json(query)
	} catch (error) {
			console.error('Error fetching units:', error);
			res.status(500).json({ error: 'Failed to retrieve units' });
	}
})

const server = app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = { app, server, PORT };
