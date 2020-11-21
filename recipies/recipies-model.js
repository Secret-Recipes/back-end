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
		.select("id", "name") // all we want is the description
}

async function findCategories(id) {
	return await db("category")
		.where("recipeId", id)
		.select("id", "name") // all we want is the name
}

async function findById(id) {
	// find the recipe for the id provided
	const recipe = await db("recipe").where({ id }).first()


	// get all the ingredients for the recipe
	const ingredients = await findIngredients(id)
	recipe['ingredients'] = ingredients // add the ingredient to the recipe

	// now find all the categories for each recipe using a helper function
	const categories = await findCategories(id)
	recipe['categories'] = categories // add the category to the recipe		

	return recipe
}

function findByRecipiname(recipiename) {
	return db("recipies as r")
		.where("r.recipiename", recipiename)
		.first("r.id", "r.recipiename")
}

async function addNewRecipe(data) {
	const recipe = { title: data.title, sourceId: data.sourceId, instructions: data.instructions, image: data.image }

	const [id] = await db("recipe").insert(recipe, "id")
	console.log(id)

	// grab all the ingredients from the data/body and add them to the recipe
	await addIngredients(id, data.ingredients)

	// grab all the categories from the data/body and add them to the recipe
	await addCategories(id, data.categories)

	return recipe
}

async function addIngredients(id, data) {
	// loop through all the ingredients 
	return Promise.all(data.map(async ingredient => {
		// build the object
		const ingr = {
			recipeId: parseInt(id),
			name: ingredient.name
		}


		// add it to the DB
		const ing = await db("ingredients").insert(ingr, "id")
	}))


	/*data.forEach(async ingredient => {
		console.log(ingredient)

		// build the object
		const ingr = {
			recipeId: id,
			name: ingredient.name
		}


		// add it to the DB
		const ing = await db("ingredients").insert(ingr, "id")

	});*/



}

async function addCategories(id, data) {
	// loop through all the categories 
	return Promise.all(data.map(async category =>{
		// build the object
		const cat = {
			recipeId: parseInt(id),
			name: category.name
		}

		// add it to the DB
		const c = await db("category").insert(cat, "id")
	}))

	/*data.forEach(async category => {
		console.log(category)

		// build the object
		const cat = {
			recipeId: id,
			name: category.name
		}

		// add it to the DB
		const c = await db("category").insert(cat, "id")

	});*/
}

async function checkCategoryName(name) {

}

async function findCategoryByName(name) {
	return await db("category as c")
		.where("c.name", name)
		.first("c.id", "c.name")
}

async function update(data, id) {
	// update the recipe with the changes provided
	const changes = { title: data.title, sourceId: data.sourceId, instructions: data.instructions, image: data.image }
	const recipeId = await db("recipe").update(changes).where("id", id)

	// update ingedients and categories as needed, add any new ones.
	await updateIngredients(recipeId, data.ingredients)
	await updateCategories(recipeId, data.categories)


	return findById(recipeId)
}

async function updateIngredients(id, data) {
	// loop over all the ingredients
	data.forEach(async ingredient => {
		if (ingredient.id) {
			ingr = await findIngredientById(ingredient.id)
			if (ingr) {
				// if the ingredient exits try to update it
				try {
					const [i] = await db("ingredients").update(ingredient).where("id", ingr.id)
				} catch (error) {

				}
			}
		} else {
			// if the ingredient does not exist build a new object and add it to the DB

			const ingr = {
				recipeId: id,
				name: ingredient.name
			}

			const [i] = await db("ingredients").insert(ingr, "id")

		}

	});

}

async function updateCategories(id, data) {
	// loop over all the categories
	data.forEach(async category => {
		if (category.id) {
			cat = await findCategoryById(category.id)
			if (cat) {
				// if the category exits try to update it
				const [c] = await db("category").update(category).where("id", cat.id)

			}
		} else {
			// if the category does not exist build a new object and add it to the DB

			const cat = {
				recipeId: id,
				name: category.name
			}

			const [c] = await db("category").insert(cat, "id")
			console.log(`cateroty created ${cat}`)


		}

	});
}

async function updateCategory(id, data) {
	const cat = await findCategoryById(id)

	if (cat) {
		return await db("category").update(data).where("id", id)
	}
}

async function updateIngredient(id, data) {
	const ingr = await findIngredientById(id)

	if (ingr) {
		return await db("ingredients").update(data).where("id", id)
	}
}

async function addCategory(recipeId, data) {
	const recipe = await findById(recipeId)
	if (recipe) {
		const cat = {
			recipeId: recipeId,
			name: data.name
		}

		const [c] = await db("category").insert(cat, "id")


	}
}

async function addIngredient(recipeId, data) {
	const recipe = await findById(recipeId)
	if (recipe) {
		const ingr = {
			recipeId: recipeId,
			name: data.name
		}

		const [c] = await db("ingredients").insert(ingr, "id")


	}
}

async function updateRecipeHeader(recipeId, data) {
	const recipe = await findById(recipeId)

	if (recipe) {
		return await db("recipe").update(data).where("id", recipeId)
	}
}

async function findCategoryById(id) {
	const category = await db("category").where({ id }).first()
	return category
}

async function findIngredientById(id) {
	const ingredient = await db("ingredients").where({ id }).first()
	return ingredient
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
	getAllRecipies,
	updateCategory,
	findCategoryById,
	findIngredientById,
	updateIngredient,
	updateRecipeHeader,
	addCategory,
	addIngredient
}

