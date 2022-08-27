const { coin_gains, xp_gains, candy_gains } = require("../config/index")
const UserModel = require("../models/user-model")

const registerPokemonCaught = async (member, pokemon) => {
  const user = (await UserModel.findOne({ user: { id: member.id } })) ?? (await createUserInMongo(member))

  user.pokemons.push(pokemon)
  user.pokecoins += coin_gains[pokemon.stage - 1]
  user.xp += xp_gains[pokemon.stage - 1]
  user.rareCandies += candy_gains[pokemon.stage - 1]

  await user.save()
  return {
    coinsgained: coin_gains[pokemon.stage - 1],
    xpGained: xp_gains[pokemon.stage - 1],
    candyGained: candy_gains[pokemon.stage - 1],
  }
}

const createUserInMongo = async member => {
  const { username, discriminator } = member

  const newUser = new UserModel({ user: { username, tag: discriminator, id: member.id } })
  await newUser.save()

  return newUser
}

module.exports = { registerPokemonCaught }
