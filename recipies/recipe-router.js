const axios = require('axios');

const router = require('express').Router();
const Recipies = require("./recipies-model");

const { restrict } = require("../auth/authenticate-middleware")

router.get("/", async (req, res, next) => {
	try {
		const recipies = await Recipies.getAll()
		if(!recipies) {
			res.status(404).json({message: "no list avalible"})
		}
		
		/*const ingredients = await Recipies.findIngredients(recipe.id)
		if(!ingredients){
			res.status(404).json({message: "no ingredeients list"})
		}*/
		
		//const fullRecipe = {...recipe, ...ingredients}
		//res.status(200).json(await Recipies.getAll())
		res.status(200).json(recipies)
	} catch(err) {
		next(err)
	}
})

// only a user logged in can add a new recipe
router.post("/recipies", restrict(), async (req, res, next) => {
	const recipe = req.body
	const newRecipe = await Recipies.addNewRecipe(recipe)

	res.status(201).json(newRecipe)
})

module.exports = router;
