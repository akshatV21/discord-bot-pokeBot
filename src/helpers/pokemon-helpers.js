const config = require("../config")
const PokeModel = require("../models/poke-model")

const getRandomPokemon = async () => {
  try {
    const totalPokemons = 6
    const ramdomPokedexNumber = Math.ceil(Math.random() * totalPokemons)

    const randomPokemon = await PokeModel.findOne({ pokedexNo: ramdomPokedexNumber })
    return { ...randomPokemon._doc }
  } catch (error) {
    console.log(error)
  }
}

module.exports = getRandomPokemon
