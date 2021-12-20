const { Client } = require('../src/Main')
const client = new Client("Njc4NjMzNzYwNDAwNjA1MjA4.Xklo8A.7zSdz2P1_NaUsYyxy7_ARRKLluo")

client.event("ready", (bot) => {
    console.log("Bot ready")
})