require("dotenv").config()
const { default: mongoose } = require("mongoose")

const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL)
}

module.exports = { connectToMongo }
