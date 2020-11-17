
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe').insert([
        {id: 1, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwhatscookingamerica.net%2Fwp-content%2Fuploads%2F2015%2F06%2FFried-Egg.jpg&f=1&nofb=1", title: 'fried eggs', sourceId: '1', instructions: 'place an egg in a hot pan and fry it'},
        {id: 2, image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcookfearless.com%2Fwp-content%2Fuploads%2F2012%2F12%2Fmashed-potatoes.jpg&f=1&nofb=1", title: 'mashed potatoes', sourceId: '2', instructions: "boil some quartered up peeled potatoes, smash them when soft"},
        
      ]);
    });
};
