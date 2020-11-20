const router = require('express').Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../auth/users-model");
const dbConfig = require('../database/dbConfig');

const { restrict } = require("./authenticate-middleware")

router.post('/signup',  async (req, res, next) => {
  // impliment register
  try {
		const { username, email, password } = req.body
		const user = await Users.findByUsername(username)

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.create({
      username,
      email,
			// hash the password with a time complexity of "14"
			password: await bcrypt.hash(password, 14),
		})

		res.status(201).json(newUser)
	} catch(error) {
		next(error)
	}
})

router.post('/login', async (req, res, next) => {
  // implement login
  //console.log(req.body)
  try {
    const {username, password} = req.body
    const user = await Users.findByUsername(username)

    if(!user) {
      return res.status(401).json({
        message: "Invalid user name"
      })
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid){
      return res.status(401).json({
        message: "Invalid password"
      })
    }

    const token = jwt.sign({
      id: user.id,
      username: user.username,

    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
      message: `Welcome ${user.username}`,
      userId: user.id,
      token: token,
      
    })
  } catch (error) {
    next(error)
  }
});

router.get('/recipies/:id', restrict(), async (req, res, next) => {
  try {
    const [id] = req.params.id

    const user = await Users.findById(id)
    if(!user) {
      return res.status(401).json({
        message: "Invalid user id"
      })
    }

    const recipies = await Users.findUserRecipies(id)
    res.status(200).json(recipies)
  } catch (error) {
    res.status(500).json({message: "Something bad happend in get all recipies"})
    console.log(error)
  }
})

module.exports = router;
