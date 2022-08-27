const event = {
  event: "messageCreate",
  once: false,
  async execute(message, client) {
    try {
      if (message.channelId !== process.env.POKE_CH_ID) {
        const chance = Math.random()
        if (chance < 0.4) {
          const command = client.commands.get("play")
          await command.execute(message)
          return
        }
      }
      const commandused = message.content.split(" ")[0]
      const commands = []

      if (commands.includes(commandused)) {
        const command = client.commands.get(commandused)
        await command.execute(message)
      }
    } catch (error) {
      console.log(error)
      message.channel.send({ content: "Internal server error!!" })
    }
  },
}
