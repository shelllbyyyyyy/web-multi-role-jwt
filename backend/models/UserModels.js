const sequelize = require("../config/Database")
const { Model, DataTypes } = require("sequelize")
const randomstring = require("randomstring")

class Users extends Model {}

Users.init(
  {
    userId: {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    id: "userId",
    sequelize,
    freezeTableName: true,
    modelName: "Users",
  }
)

module.exports = Users
