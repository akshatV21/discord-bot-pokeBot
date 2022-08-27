const { Schema, model } = require("mongoose")

const pokeSchema = new Schema({
  name: String,
  type: [String],
  tag: String,
  pokedexNo: Number,
  stage: Number,
  imageUrl: String,
})

const PokeModel = model("pokemon", pokeSchema)

module.exports = PokeModel
