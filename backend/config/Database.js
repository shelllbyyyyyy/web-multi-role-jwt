const { Sequelize } = require("sequelize")

const db = new Sequelize("auth", "root", "", {
  host: "localhost",
  dialect: "mysql",
})

module.exports = db
