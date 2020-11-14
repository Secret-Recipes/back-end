const db = require("../database/dbConfig")

async function getAllRecipies() {
	const recipies = await db("recipe as r")
		.innerJoin("users as u", "u.id", "r.sourceId")
		.select("r.id", "r.image", "r.title", "u.username as source")

		return recipies;
}

async function getAll() {
	// get all the recipies first
	const recipies = await db("recipe as r")
		.innerJoin("users as u", "u.id", "r.sourceId")
		.select("r.id", "r.title", "u.username as source", "r.instructions")

	// if there are recipies loop through them	
	if (recipies) {
		var r = 0;
		// loop over all the recipies, this seems way to inefficient. Has to be a way
		// to work this into a few joins what if I had a million recipies
		do {
			console.log(r)
			const ingredients = await findIngredients(recipies[r].id)
			recipies[r]['ingredients'] = ingredients // add the ingredient to the recipe

			// now find all the categories for each recipe using a helper function
			const categories = await findCategories(recipies[r].id)
			recipies[r]['categories'] = categories // add the category to the recipe

			r++; // increment the recipe

		} while (r <= recipies.length - 1)

	}

	return recipies;
}

async function findIngredients(id) {
	return await db("ingredients")
		.where("recipeId", id)
		.select("name") // all we want is the description
}

async function findCategories(id) {
	return await db("category")
		.where("recipeId", id)
		.select("name") // all we want is the name
}

async function findById(id) {
	const recipe = await db("recipe").where({ id }).first()
	
	// get all the ingredients for the recipe
	const ingredients = await findIngredients(recipe.id)
			recipe['ingredients'] = ingredients // add the ingredient to the recipe

	// now find all the categories for each recipe using a helper function
	const categories = await findCategories(recipe.id)
	recipe['categories'] = categories // add the category to the recipe		
	
	return recipe 
}

function findByRecipiname(recipiename) {
	return db("recipies as r")
		.where("r.recipiename", recipiename)
		.first("r.id", "r.recipiename")
}

/*async function create(data) {
	console.log(data)

	const recipe = { title: data.title, sourceId: data.sourceId, instructions: data.instructions }
	const [id] = await db("recipe").insert(recipe)

	data.ingredients.recipeId = id
	const [ingredients] = data.ingredients
	const [ing] = await db("ingredients").insert(ingredients)

	data.categories.recipeId = id
	const [categories] = data.categories
	const [cat] = await db("category").insert(categories)
	return findById(id)

}*/

async function addNewRecipe(data) {
	const recipe = { title: data.title, sourceId: data.sourceId, instructions: data.instructions }
	const [id] = await db("recipe").insert(recipe)

	await addIngredients(id, data.ingredients)

	await addCategories(id, data.categories)
}

async function addIngredients(id, data) {
	data.forEach(async ingredient => {
		console.log(ingredient)

		const ingr = {
			recipeId: id,
			name: ingredient.name
		}

		const [ing] = await db("ingredients").insert(ingr)
	});


}

async function addCategories(id, data) {
	data.forEach(async category => {
		console.log(category)

		//if (!findCategoryByName(category)) {
		const cat = {
			recipeId: id,
			name: category.name
		}

		const [c] = await db("category").insert(cat)
		//}
	});
}

async function checkCategoryName(name) {

}

async function findCategoryByName(name) {
	return await db("category as c")
		.where("c.name", name)
		.first("c.id", "c.name")
}

async function update(id, data) {
	await db("recipies").where({ id }).update(data)
	return findById(id)
}

function remove(id) {
	return db("recipies").where({ id }).del()
}

module.exports = {
	findById,
	findByRecipiname,
	update,
	remove,
	addNewRecipe,
	getAllRecipies
}

//console.log(recipies)

/*recipies.forEach(async recipe =>  {
	const ingredients = await findIngredients(recipe.id)
	recipe['ingredients'] = ingredients
	//console.log(recipe)
});

recipies.forEach(async recipe =>  {
	const categories = await findIngredients(recipe.id)
	recipe['categories'] = categories

	console.log(recipe)
});*/


/*const ingredients = await db('ingredients as i')
	//.join('ingredients', 'ingredients.recipeId', 'r.id')
	.select("i.description")
	.where('i.recipeId', recipies.id)*/

/*const categories = await db('category as c')
	//.join('ingredients', 'ingredients.recipeId', 'r.id')
	.select("c.name")
	.where('c.recipeId', recipies.id)*/


	//recipies['ingredients'] = ingredients;

	//recipies['ingredients'] = ingredients;

	// loop over all the recipies, this seems why to inefficient. Has to be a way
		// to work this into a few joins what if I had a million recipies	
/*for (r = 0; r < recipies.length - 1; r++) {
	// now find all the ingredients for each recipe using a helper function
	const ingredients = await findIngredients(recipies[r].id)
	recipies[r]['ingredients'] = ingredients // add the ingredient to the recipe

	// now find all the categories for each recipe using a helper function
	const categories = await findCategories(recipies[r].id)
	recipies[r]['categories'] = categories // add the category to the recipe
}*/