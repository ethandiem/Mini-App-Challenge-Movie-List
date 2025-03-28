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

app.post('/movies', async (req, res) => {
  const { title, info } = req.body;
  if (!title || !info) {
    return res.status(400).json({ error: 'Title and info are required' });
  }
  try {
    const [id] = await knex('movies').insert({ title, info }).returning('id');
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Failed to add movie' });
  }
});

app.delete('/movies/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await knex('movies').where({ id }).del();
		res.status(200).json({ message: 'Movie deleted successfully' });
	} catch (error) {
		console.error('Error deleting movie:', error);
		res.status(500).json({ error: 'Failed to delete movie' });
	}
})

const server = app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await knex('movies').where({ id }).first();
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

module.exports = { app, server, PORT };
