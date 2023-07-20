const User = require("../models/UserModels")

const adminOnly = async (req, res, next) => {
  const response = await User.findOne({
    where: {
      userId: req.userId,
    },
  })
  if (!response) return res.status(404).json({ msg: "User not found...!" })
  if (response.role !== "admin")
    return res.status(403).json({ msg: "Access forbidden...!" })
  next()
}

module.exports = { adminOnly }
