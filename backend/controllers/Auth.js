const User = require("../models/UserModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const response = await User.findOne({
      where: {
        email: email,
      },
    })
    if (!response) return res.status(404).json({ msg: "Email not found...!" })
    const match = await bcrypt.compare(password, response.password)
    if (match !== true)
      return res.status(400).json({ msg: "Wrong password...!" })
    // req.session.Id = response.userId
    const userId = response.userId
    const name = response.name
    const e_mail = response.email
    const role = response.role
    const accessToken = jwt.sign(
      { userId, e_mail, name, role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    )

    const refreshToken = jwt.sign(
      { userId, e_mail, name, role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    )

    await User.update(
      { refreshToken: refreshToken },
      {
        where: {
          userId: userId,
        },
      }
    )
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const Me = async (req, res) => {
  const user = await User.findOne({
    attributes: ["userId", "name", "email", "role"],
    where: {
      userId: req.userId,
    },
  })
  if (!user) return res.status(404).json({ msg: "User not found...!" })
  res.status(200).json(user)
}

const Logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) return res.status(204).json({ msg: "No token...!" })
    const response = await User.findOne({
      where: {
        refreshToken: refreshToken,
      },
    })
    if (!response) return res.status(404).json({ msg: "User not found...!" })
    const userId = response.userId
    await User.update(
      { refreshToken: null },
      {
        where: {
          userId: userId,
        },
      }
    )
    res.clearCookie("refreshToken")
    return res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = { Login, Logout, Me }
