require("dotenv").config()
const { Client, GatewayIntentBits } = require("discord.js")

const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN

const pokeBot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
})

const startBotServer = async () => {
  pokeBot.login(DISCORD_TOKEN)
}
