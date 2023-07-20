const Users = require("../models/UserModels")
const jwt = require("jsonwebtoken")

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) return res.sendStatus(401)
    const response = await Users.findOne({
      where: {
        refreshToken: refreshToken,
      },
    })
    if (!response) return res.sendStatus(403)
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403)
        const userId = response.userId
        const name = response.name
        const email = response.email
        const role = response.role
        const accessToken = jwt.sign(
          { userId, name, email, role },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        )
        res.json({ accessToken })
      }
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = { refreshToken }
