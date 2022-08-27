const event = {
  event: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} has logged in!!`)
  },
}

module.exports = event
