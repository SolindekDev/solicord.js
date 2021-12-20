/*
*    File name: WebSocket.js
*
*    Documentation article thats helped: https://discord.com/developers/docs/topics/gateway
*/

'use strict'

const ws = require('ws');

module.exports = class WebSocket {
    /**
     * Constructor of WebSocket class
     * 
     * @param {String} token Token of bot (Is required!)
     * @param {String} encoding Deafult "json"
     * @param {Integer} gatewayVersion Defualt value is "9" and it's the best!
     * @param {Boolean} Log 
     */
    constructor(token, encoding, gatewayVersion, log) {
        if (!token) throw new Error("Token to WebSocket is required!");

        this.log = log || false;
        this.token = token
        this.encoding = encoding || "json"
        this.gwVersion = gatewayVersion || "9"
        this.urlws = `wss://gateway.discord.gg/?v=${this.gwVersion}&encoding=${this.encoding}`
        this.socket = new ws(this.urlws)

        this.socket.onopen = (e) => {

            if (this.log == true) {
                console.log("[WebSocket] Connection established")
                console.log("[WebSocket] Trying to autorized")
                this.socket.send(`{
                    "op": 2,
                    "d": {
                      "token": "${this.token}",
                      "intents": 513,
                      "properties": {
                        "$os": "linux",
                        "$browser": "my_library",
                        "$device": "my_library"
                      }
                    }
                }`)
            } else {
                this.socket.send(`{
                    "op": 2,
                    "d": {
                      "token": "${this.token}",
                      "intents": 513,
                      "properties": {
                        "$os": "linux",
                        "$browser": "my_library",
                        "$device": "my_library"
                      }
                    }
                }`)
            }
        }
    }

    SocketErrorCheck(code, reason) {
        switch (code) {
            case 4004: 
                // This code tell us that Authorization Failed
                throw new Error("Invalid Token Bot!")
            case 4012:
                throw new Error("Invalid API version!")
            case 4000:
                throw new Error("Invalid Error")
            default:
                // New errors will be added soon...
                throw new Error(`Unexpected error: code ${code} ${reason}`)
        }
    }
}