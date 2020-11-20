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
	const recipe = req.body
	const newRecipe = await Recipies.addNewRecipe(recipe)

	res.status(201).json({ message: "new recipe created", recipe: newRecipe })
})

// only a user logged in can edit a recipe
router.put("/:id", restrict(), async (req, res, next) => {
	try {
		const { id } = req.params.id
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
	}

})

module.exports = router;
