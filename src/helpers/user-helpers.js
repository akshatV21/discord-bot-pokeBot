const { coin_gains, xp_gains, candy_gains, xp_level_caps } = require("../config/index")
const UserModel = require("../models/user-model")

const registerPokemonCaught = async (member, pokemon) => {
  const user = (await UserModel.findOne({ id: member.id })) || (await createUserInMongo(member))
  const userCurrentLevel = user.level

  user.pokemons.push(pokemon)
  user.pokecoins += coin_gains[pokemon.stage - 1]
  user.xp += xp_gains[pokemon.stage - 1]
  user.rareCandies += candy_gains[pokemon.stage - 1]

  if (user.xp > xp_level_caps[userCurrentLevel]) {
    user.level += 1
    user.pokecoins += 50
    user.rareCandies += 50
    user.xp = (xp_level_caps[userCurrentLevel] * 10) / 100
  }

  await user.save()
  return {
    coinsgained: coin_gains[pokemon.stage - 1],
    xpGained: xp_gains[pokemon.stage - 1],
    candyGained: candy_gains[pokemon.stage - 1],
    level: {
      increased: userCurrentLevel < user.level,
      currentLevel: user.level,
      xpGained: (xp_level_caps[userCurrentLevel] * 10) / 100,
      coinsgained: 50,
      candyGained: 50,
    },
  }
}

const createUserInMongo = async member => {
  const { username, discriminator } = member

  const newUser = new UserModel({ username, tag: discriminator, id: member.id })
  await newUser.save()

  return newUser
}

module.exports = { registerPokemonCaught }
