const express = require("express")
const { Login, Logout, Me } = require("../controllers/Auth")
const { verifyToken } = require("../middlewere/VerifyToken")

const router = express.Router()

router.get("/me", verifyToken, Me)
router.post("/login", Login)
router.delete("/logout", Logout)

module.exports = router
