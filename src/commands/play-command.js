require("dotenv").config()
const { EmbedBuilder, MessageCollector } = require("discord.js")
const getRandomPokemon = require("../helpers/pokemon-helpers")
const { registerPokemonCaught } = require("../helpers/user-helpers")

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

    messageCollector.on("collect", async msg => {
      const { coinsgained, xpGained, candyGained, level } = await registerPokemonCaught(msg.author, pokemon)
      msg.reply({
        content: `${msg.author} caught a level ${pokemon.level} ${pokemon.name}.\nYou Gained:\n+${xpGained}xp\n+${coinsgained} pokecoins\n+${candyGained} rare candies`,
      })

      // only send when the user level ups
      if (level.increased) {
        channel.send({
          content: `${msg.author} Congratulations!! You have now reached level ${level.currentLevel}\nYou Gained:\n+${level.xpGained}xp\n+${level.coinsgained} pokecoins\n+${level.candyGained} rare candies`,
        })
      }

      messageCollector.stop()
    })

    messageCollector.on("ignore", msg => {
      if (msg.author.bot) return
      msg.reply({ content: `${msg.author} wrong reply!!` })
    })
  },
}

module.exports = command
