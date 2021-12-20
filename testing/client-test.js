const { Client } = require('../src/Main')
const client = new Client("Njc4NjMzNzYwNDAwNjA1MjA4.Xklo8A.cKshYWKcAwGG3EiHwE5SMWy00mw")

client.event("ready", (bot) => {
    console.log("Client ready!")
    console.log(bot)
})
