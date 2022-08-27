require("dotenv").config()
const { EmbedBuilder } = require("discord.js")
const PokeModel = require("../models/poke-model")

const command = {
  name: "play",
  async execute(message) {
    const totalPokemons = 6
    const ramdomPokedexNumber = Math.ceil(Math.random() * totalPokemons)
    const channel = message.guild.channels.cache.get(process.env.POKE_CH_ID)

    const pokemon = await PokeModel.findOne({ pokedexNo: ramdomPokedexNumber })
    const pokeEmbed = new EmbedBuilder()
      .setTitle(`Wooh! A Wild ${pokemon.name} appeared.`)
      .setDescription(`To catch it, type: !catch ${pokemon.tag}`)
      .setImage(pokemon.imageUrl)

    channel.send({ content: "@everyone", embeds: [pokeEmbed] })
  },
}

module.exports = command