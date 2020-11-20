/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken")

function restrict() {
  return async (req, res, next) => {
    try {
      // get the token value from a cookie, which is automatically sent from the client
      //const token = req.cookies.token
      const token = req.headers.authorization
      
			if (!token) {
				return res.status(401).json({
					message: "access denied, you must be logged in.",
				})
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						message: "Invalid credentials",
					})
        }
        
        req.token = decoded

      
      next()
      })

    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  restrict,
}
