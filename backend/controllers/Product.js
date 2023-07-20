const Product = require("../models/ProductModels")
const User = require("../models/UserModels")
const { Op } = require("sequelize")

const getProducts = async (req, res) => {
  try {
    let response
    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ["productId", "name", "price"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      })
    } else {
      response = await Product.findAll({
        attributes: ["productId", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      })
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
const getProductById = async (req, res) => {
  try {
    const product = await User.findOne({
      where: {
        productId: req.body.productId,
      },
    })
    if (!product) return res.status(404).json({ msg: "Data not found...!" })
    let response
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ["productId", "name", "price"],
        where: {
          productId: product.productId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      })
    } else {
      response = await Product.findOne({
        attributes: ["productId", "name", "price"],
        where: {
          [Op.and]: [{ productId: product.productId }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const saveProduct = async (req, res) => {
  const { name, price } = req.body
  try {
    await Product.create({
      name: name,
      price: price,
    })
    res.status(201).json({ msg: "Product Created Successfuly" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        productId: req.params.productId,
      },
    })
    if (!response) return res.status(404).json({ msg: "Data not found...!" })
    const { name, price } = req.body
    if (req.role === "admin") {
      await Product.update(
        { name, price },
        {
          where: {
            productId: response.productId,
          },
        }
      )
    } else {
      if (req.userId !== response.userId)
        return res.status(403).json({ msg: "Access forbidden...!" })
      await Product.update(
        { name, price },
        {
          where: {
            [Op.and]: [
              { productId: response.productId },
              { userId: req.userId },
            ],
          },
        }
      )
    }
    res.status(200).json({ msg: "Product updated successfuly" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
const deleteProduct = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        productId: req.params.productId,
      },
    })
    if (!response) return res.status(404).json({ msg: "Data not found...!" })
    if (req.role === "admin") {
      await Product.destroy({
        where: {
          productId: response.productId,
        },
      })
    } else {
      if (req.userId !== response.userId)
        return res.status(403).json({ msg: "Access forbidden...!" })
      await Product.destroy({
        where: {
          [Op.and]: [{ productId: response.productId }, { userId: req.userId }],
        },
      })
    }
    res.status(200).json({ msg: "Product updated successfuly" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
}
