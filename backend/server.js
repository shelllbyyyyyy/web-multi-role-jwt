const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const db = require("./config/Database")
// const session = require("express-session")
// const SequelizeStore = require("connect-session-sequelize")
// const sessionStore = SequelizeStore(session.Store)
// const store = new sessionStore({
//   db: db,
// })
dotenv.config()

const UserRoute = require("./routes/UserRoute")
const AuthRoute = require("./routes/AuthRoute")
const { Sequelize } = require("sequelize")
// const ProductRoute = require("./routes/ProductRoute")

const app = express()

// ;(async () => {
//   await db.sync()
// })()

// app.use(
//   session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//       secure: "auto",
//     },
//   })
// )

app.use(
  cors({
    credential: true,
    origin: "http://localhost:3000",
  })
)
app.use(cookieParser())
app.use(express.json())
app.use(UserRoute)
app.use(AuthRoute)
// app.use("/product", ProductRoute)

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log("server up and running...")
})
