const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) return res.status(401).json({ msg: "Please login first...!" })
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.userId = user.userId
    req.email = user.email
    req.name = user.name
    req.role = user.role
    next()
  })
}

module.exports = { verifyToken }
