'use strict'

const ws = require('../WebSocket')
const member = require('../Member')
const guilds = require("../Guild")

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
                // console.log(`[WebSocket] Message: ${event.data}`)
                this.checkEvent(event.data);
            } else {
                this.checkEvent(event.data);
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
        if (typeof nameEvent != 'string') throw new Error("Name event must be a string type")
        if (typeof functionEvent != 'function') throw new Error("Function event must be a function type")

        switch (nameEvent.toLowerCase()) {
            case "ready":
                this.events.readyEvent = functionEvent
        }
    }

    checkEvent(data) {
        const par = JSON.parse(data)
        
        switch(par.t) {
            case null:
                return;
            case 'READY':
                if (this.events.readyEvent == null || this.events.readyEvent == undefined) {
                    return;
                } else {
                    if (typeof this.events.readyEvent != 'function') throw new Error("Event must be a function")

                    const guildsToSend = [];

                    par.d.guilds.forEach(guild => {
                        guildsToSend.push({ id: guild.id })
                    })

                    const objectToSend = {
                        user: new member(par),
                        guilds: guildsToSend
                    }

                    this.events.readyEvent(objectToSend)
                }
        }
    }
}