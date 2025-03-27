/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {title: 'The Dark Knight Rises'},
    {title: 'Toy Story'},
    {title: 'Transformers'},
    {title: 'Harry Potter'},
    {title: 'Star Wars'},
  ]);
};
