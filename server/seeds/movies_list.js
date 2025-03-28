/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {title: 'The Dark Knight Rises', info: "The epic conclusion to Christopher Nolan's Batman trilogy, where Bruce Wayne returns to face Bane, a ruthless terrorist threatening Gotham."},
    {title: 'Toy Story', info: "Pixar's groundbreaking animated film about a group of toys, led by Woody and Buzz Lightyear, that come to life when humans aren't around."},
    {title: 'Transformers', info: "A sci-fi action film featuring the battle between Autobots and Decepticons, with giant alien robots disguising themselves on Earth."},
    {title: 'Harry Potter', info: "A fantasy saga following Harry Potter, a young wizard, as he discovers his magical heritage and battles the dark wizard Voldemort."},
    {title: 'Star Wars', info: "A legendary space opera franchise centered on the battle between the Sith and Jedi, featuring iconic characters like Luke Skywalker and Darth Vader."},
  ]);
};
