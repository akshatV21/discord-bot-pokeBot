require("dotenv").config()
const { readdirSync } = require("fs")
const { Client, GatewayIntentBits, Collection } = require("discord.js")
const { connectToMongo } = require("./mongo")

const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN

const pokeBot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent],
})

const startBotServer = async () => {
  await connectToMongo()
  pokeBot.login(DISCORD_TOKEN)
}

// commands
const COMMAND_FILES = readdirSync("./src/commands").filter(file => file.endsWith(".js"))
pokeBot.commands = new Collection()

COMMAND_FILES.forEach(file => {
  const command = require(`./commands/${file}`)
  pokeBot.commands.set(command.name, command)
})

// events
const EVENT_FILES = readdirSync("./src/events").filter(file => file.endsWith(".js"))

EVENT_FILES.forEach(file => {
  const event = require(`./events/${file}`)
  if (event.once) {
    pokeBot.once(event.event, (...args) => event.execute(...args))
  } else {
    pokeBot.on(event.event, (...args) => event.execute(...args, pokeBot))
  }
})

startBotServer()
