const PokeModel = require("../models/poke-model")

const getRandomPokemon = async () => {
  try {
    const chance = Math.random()
    let stage
    if (chance < 0.1) {
      stage = 3
    } else if (chance < 0.4) {
      stage = 2
    } else {
      stage = 1
    }

    const randomPokemons = await PokeModel.find({ stage: stage })

    const pokedexNos = randomPokemons.map(poke => poke.pokedexNo)
    const totalPokemons = randomPokemons.length
    const ramdomPokedexNumber = pokedexNos[Math.ceil(Math.random() * totalPokemons)]
    const randomPokemon = randomPokemons[ramdomPokedexNumber]

    return { ...randomPokemon._doc }
  } catch (error) {
    console.log(error)
  }
}

module.exports = getRandomPokemon
