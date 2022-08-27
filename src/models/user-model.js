const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    user: {
      username: {
        type: String,
        required: true,
      },
      tag: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    level: {
      type: Number,
      default: 1,
    },
    pokecoins: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      default: 0,
    },
    pokemons: {
      type: [Object],
      default: [],
    },
    rareCandies: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const UserModel = model("user", userSchema)

module.exports = UserModel
