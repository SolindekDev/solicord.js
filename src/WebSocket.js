/*
*    File name: WebSocket.js
*
*    Documentation article thats helped: https://discord.com/developers/docs/topics/gateway
*/

const ws = require('ws');

module.exports = class WebSocket {
    /**
     * Constructor of WebSocket class
     * 
     * @param {String} token Token of bot (Is required!)
     * @param {*} encoding Deafult "json"
     * @param {*} gatewayVersion Defualt value is "9" and it's the best!
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

        this.socket.onmessage = (event) => {
            if (this.log == true) {
            
                console.log(`[WebSocket] Message: ${event.data}`)
                SocketMessageCheck(event.data)
            } else {
                console.log(`${event.data}`)
            }
        }
    }

    SocketMessageCheck(message) {

    }


}