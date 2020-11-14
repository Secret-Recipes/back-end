const router = require('express').Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../auth/users-model")

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
      message: `Welcome ${user.username}`
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router;
