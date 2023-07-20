const express = require("express")
const {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Product")

const router = express.Router()

router.get("/", getProducts)
router.get("/", getProductById)
router.post("/", saveProduct)
router.put("/", updateProduct)
router.delete("/", deleteProduct)

module.exports = router
