const User = require("../models/UserModels")
const bcrypt = require("bcrypt")

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["userId", "name", "email", "role"],
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getUserByEmail = async (req, res) => {
  const { email } = req.body
  try {
    const response = await User.findOne({
      attributes: ["userId", "name", "email", "role"],
      where: {
        email: email,
      },
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body

  try {
    if (confPassword !== password)
      return res.status(400).json({ msg: "Password Missmatched...!" })
    if (confPassword === null)
      return res.status(403).json({ msg: "Confirn Password Required...!" })
    const hashPassword = await bcrypt.hash(password, 10)
    if (role === "" || role === null)
      return res.status(403).json({ msg: "Role must be 'admin' or 'user'" })

    const response = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    })
    res.status(200).json({
      data: response,
      msg: "Register Successfully",
    })
  } catch (error) {
    res.status(400).json({ msg: "Email already in use ...!" })
  }
}

const updateUser = async (req, res) => {
  const { name, email, password, confPassword, newPassword } = req.body
  const response = await User.findOne({ where: { email: email } })
  const compare = await bcrypt.compare(password, response.password)
  const hashPassword = await bcrypt.hash(newPassword, 10)

  if (compare !== true)
    return res.status(400).json({ msg: "Wrong Password...!" })
  if (confPassword !== newPassword)
    return res.status(400).json({ msg: "Passsword missmatched...!" })
  try {
    const response = await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          email: email,
        },
      }
    )
    res.status(200).json({
      data: response,
      msg: "Users update successfully",
    })
  } catch (error) {
    res.status(404).json({ msg: "Email not found...!" })
  }
}

const deleteUser = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({
    where: {
      email: email,
    },
  })
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" })
  try {
    await User.destroy({
      where: {
        email: email,
      },
    })
    res.status(200).json({ msg: "User Deleted" })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
}
