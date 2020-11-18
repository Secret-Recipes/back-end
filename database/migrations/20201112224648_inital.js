exports.up = function (knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments();
            users.string('username', 255).notNullable().unique();
            users.string('email', 255).notNullable().unique();
            users.string('password', 255).notNullable();
        })

        .createTable('recipe', recipie => {
            recipie.increments()
            recipie.string('image', 255)
            recipie.string('title', 255).notNullable();
            
            recipie.integer('sourceId').unsigned().notNullable()
                .references('id')
                .inTable('users');
            
            recipie.text('instructions').notNullable();
        })
        
        .createTable('category', category =>{
            category.increments();
            category.string('name').notNullable();
            category.integer('recipeId').unsigned().notNullable()
                .references('id')
                .inTable('recipe');
        })

        .createTable('ingredients', ingredients => {
            ingredients.increments();
            ingredients.string('name').notNullable();
            ingredients.integer('recipeId').unsigned().notNullable()
                .references('id')
                .inTable('recipe');
        });
};



exports.down = function (knex, Promise) {
    return knex.schema
         .dropTableIfExists('users')
         .dropTableIfExists('recipe')
         .dropTableIfExists('category')
         .dropTableIfExists('ingredients');
};

