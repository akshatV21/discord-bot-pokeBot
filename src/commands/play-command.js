require("dotenv").config()
const { EmbedBuilder, MessageCollector } = require("discord.js")
const getRandomPokemon = require("../helpers/mongo-helpers/random-pokemon")

const command = {
  name: "play",
  async execute(message) {
    const channel = message.guild.channels.cache.get(process.env.POKE_CH_ID)

    // getting the pok and building the embed
    const pokemon = await getRandomPokemon()
    const pokeEmbed = new EmbedBuilder()
      .setTitle(`Wooh! A Wild ${pokemon.name} appeared.`)
      .setDescription(`To catch it, type: !catch ${pokemon.tag}`)
      .setImage(pokemon.imageUrl)
      .setFooter({ text: "The first one the send correct reply will catch it!" })

    await channel.send({ content: "@everyone", embeds: [pokeEmbed] })

    const filter = msg => msg.content === `!catch ${pokemon.tag}`
    const messageCollector = new MessageCollector(channel, { filter, max: 1 })

    messageCollector.on("collect", msg => {
      channel.send({ content: `${msg.author} You caught a ${pokemon.name}` })
      messageCollector.stop()
    })

    messageCollector.on("ignore", msg => {
      console.log(msg.content)
    })
  },
}

module.exports = command
