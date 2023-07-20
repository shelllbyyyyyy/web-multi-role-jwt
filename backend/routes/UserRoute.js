const express = require("express")
const {
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/Users")
const { adminOnly } = require("../middlewere/AuthUser")
const { verifyToken } = require("../middlewere/VerifyToken")
const { refreshToken } = require("../controllers/RefreshToken")

const router = express.Router()

router.get("/user", verifyToken, adminOnly, getUsers)
router.get("/user", verifyToken, adminOnly, getUserByEmail)
router.post("/user", createUser)
router.put("/user", verifyToken, updateUser)
router.delete("/user", verifyToken, deleteUser)

router.get("/token", refreshToken)

module.exports = router
