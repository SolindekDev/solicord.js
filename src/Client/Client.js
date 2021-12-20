'use strict'

const ws = require('../WebSocket')

module.exports = class Client {
    /**
     * Consturctor of discord client
     * @param {String} token Token from https://discord.com/developers/applications
     */
    constructor(token) {
        if (!token) throw new Error("Token is required for Client Constructor");

        this.events = {};
        this.token = token;

        const socket = new ws(token, "json", 9, false)

        this.socket = socket

        socket.socket.onmessage = (event) => {
            if (socket.log == true) {
                console.log(`[WebSocket] Message: ${event.data}`)
                socket.SocketMessageCheck(event.data)
            } else {
                console.log(`${event.data}`)
            }
        }

        socket.socket.onclose = (event) => {
            if (event.wasClean) {
                if (socket.log == true) {
                    console.log(`[WebSocket] Connection closed. Code: ${event.code}, Reason: ${event.reason}`)
                    socket.SocketErrorCheck(event.code, event.reason)
                } else {
                    socket.SocketErrorCheck(event.code, event.reason)
                }
            } else {
                // Server process killed or network is down
                if (socket.log == true) {
                    console.log(`[WebSocket] Connection died`);
                }
            }
        }
    }

    event(nameEvent, functionEvent) {
        if (nameEvent != String) throw new Error("Name event must be a string type")
        if (functionEvent != Function) throw new Error("Function event must be a function type")

        switch (nameEvent.toLowerCase()) {
            case "ready":
                this.events.readyEvent = functionEvent
        }
    }
}