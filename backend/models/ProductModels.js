const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/Database")
const Users = require("./UserModels")
const randomstring = require("randomstring")

class Products extends Model {}

Products.init(
  {
    productId: {
      type: DataTypes.STRING,
      defaultValue: randomstring.generate({
        length: 8,
        charset: "numeric",
      }),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "Products",
  }
)

Users.hasMany(Products)
Products.belongsTo(Users, { foreignKey: "userId" })

module.exports = Products
