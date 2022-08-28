const config = require("../config")
const PokeModel = require("../models/poke-model")

const getRandomPokemon = async () => {
  try {
    const totalPokemons = 6
    const ramdomPokedexNumber = Math.ceil(Math.random() * totalPokemons)

    const randomPokemon = await PokeModel.findOne({ pokedexNo: ramdomPokedexNumber })
    return { ...randomPokemon._doc, level: getGeneratedPokeLevel(randomPokemon) }
  } catch (error) {
    console.log(error)
  }
}

const getGeneratedPokeLevel = pok => {
  const stage = pok.stage
  const levelCaps = config.level_caps
  const level = Math.ceil(Math.random() * (levelCaps[stage] - levelCaps[stage - 1]) + levelCaps[stage - 1])
  return level
}

module.exports = getRandomPokemon
