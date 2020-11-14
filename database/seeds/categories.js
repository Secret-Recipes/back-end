
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {id: 1, name: 'breakfast', recipeId: '1'},
        {id: 2, name: 'dinner', recipeId: '2'},
        {id: 3, name: 'lunch', recipeId: '1'},
        
      ]);
    });
};
