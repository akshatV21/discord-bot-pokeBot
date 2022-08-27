const PokeModel = require("../../models/poke-model")

const getRandomPokemon = async () => {
  const totalPokemons = 6
  const ramdomPokedexNumber = Math.ceil(Math.random() * totalPokemons)

  const randomPokemon = await PokeModel.findOne({ pokedexNo: ramdomPokedexNumber })
  return randomPokemon
}

module.exports = getRandomPokemon
