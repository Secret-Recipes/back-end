
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe').insert([
        {id: 1, title: 'fried eggs', sourceId: '1', instructions: 'place an egg in a hot pan and fry it'},
        {id: 2, title: 'mashed potatoes', sourceId: '2', instructions: "boil some quartered up peeled potatoes, smash them when soft"},
        
      ]);
    });
};
