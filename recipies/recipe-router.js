const axios = require('axios');

const router = require('express').Router();
const Recipies = require("./recipies-model");

const { restrict } = require("../auth/authenticate-middleware")

router.get("/", async (req, res, next) => {
	try {
		const recipies = await Recipies.getAllRecipies()
		if (!recipies) {
			res.status(404).json({ message: "no list avalible" })
		}

		/*const ingredients = await Recipies.findIngredients(recipe.id)
		if(!ingredients){
			res.status(404).json({message: "no ingredeients list"})
		}*/

		//const fullRecipe = {...recipe, ...ingredients}
		//res.status(200).json(await Recipies.getAll())
		res.status(200).json(recipies)
	} catch (err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const recipe = await Recipies.findById(req.params.id)
		if (!recipe) {
			res.status(404).json({ message: `There is no recipe with the id of ${req.params.id}` })
		}

		res.status(200).json(recipe)
	} catch (err) {
		next(err)
	}
})

// only a user logged in can add a new recipe
router.post("/", restrict(), async (req, res, next) => {
	try {
		const recipe = req.body
		const newRecipe = await Recipies.addNewRecipe(recipe)

		res.status(201).json({ message: "new recipe created", recipe: newRecipe })
	} catch (error) {
		next(error)
	}

})

// only a user logged in can edit a recipe
router.put("/:id", restrict(), async (req, res, next) => {
	try {
		const id = req.params.id
		const changes = req.body

		const recipe = await Recipies.findById(id)
		if (recipe) {
			const updatedRecipe = await Recipies.update(changes, id)
			res.status(201).json({ message: "recipe updated", recipe: updatedRecipe })
		} else {
			res.status(404).json({ message: `Could not find recipe with id of ${id}` });
		}


	} catch (error) {
		res.status(500).json({ message: 'Failed to update recipe' });
		console.log(error)
	}

})

// only a user logged in can add a category to a recipe
router.post("/c/:id", restrict(), async (req, res, next) => {
	try {
		const id = req.params.id
		const changes = req.body

		//console.log(id)
		//const category = await Recipies.findCategoryById(id)
		//if(category) {
		const addedCat = await Recipies.addCategory(id, changes)
		res.status(201).json({ message: "category added", category: addedCat })
		//}else{
		//	res.status(404).json({message : `couldn't find a category with id ${id}`})
		//}
	} catch (error) {
		res.status(500).json({ message: 'Failed to add category' });
		console.log(error)
	}
})

// only a user logged in can update a category
router.put("/c/:id", restrict(), async (req, res, next) => {
	try {
		const id = req.params.id
		const changes = req.body

		console.log(id)
		const category = await Recipies.findCategoryById(id)
		if (category) {
			const updatedCat = await Recipies.updateCategory(id, changes)
			res.status(201).json({ message: "category updated", category: updatedCat })
		} else {
			res.status(404).json({ message: `couldn't find a category with id ${id}` })
		}
	} catch (error) {
		res.status(500).json({ message: 'Failed to update category' });
		console.log(error)
	}
})

// only a user logged in can add an ingredient to a recipe
router.post("/i/:id", restrict(), async (req, res, next) => {
	try {
		const id = req.params.id
		const changes = req.body

		//console.log(id)
		//const category = await Recipies.findCategoryById(id)
		//if(category) {
		const addedIngr = await Recipies.addIngredient(id, changes)
		res.status(201).json({ message: "ingredient added", ingredient: addedIngr })
		//}else{
		//	res.status(404).json({message : `couldn't find a category with id ${id}`})
		//}
	} catch (error) {
		res.status(500).json({ message: 'Failed to add category' });
		console.log(error)
	}
})

// only a user logged in can update a ingredient
router.put("/i/:id", restrict(), async (req, res, next) => {
	try {
		const id = req.params.id
		const changes = req.body

		const ingredient = await Recipies.findIngredientById(id)
		if (ingredient) {
			const updatedIngr = await Recipies.updateIngredient(id, changes)
			res.status(201).json({ message: "ingredient updated", ingredient: updatedIngr })
		} else {
			res.status(404).json({ message: `couldn't find a ingredient with id ${id}` })
		}
	} catch (error) {
		res.status(500).json({ message: 'Failed to update ingredient' });
		console.log(error)
	}
})

// only a user logged in can update the header part of the recipe
// this part includes the image, title, and instructions
router.put("/h/:id", restrict(), async (req, res, next) => {
	try {
		const id = req.params.id
		const changes = req.body

		const recipe = await Recipies.findById(id)
		if (recipe) {
			const updatedRec = await Recipies.updateRecipeHeader(id, changes)
			res.status(201).json({ message: "recipe updated", recipe: updatedRec })
		} else {
			res.status(404).json({ message: `couldn't find a recipe with id ${id}` })
		}
	} catch (error) {
		res.status(500).json({ message: 'Failed to update recipe' });
		console.log(error)
	}
})

module.exports = router;
