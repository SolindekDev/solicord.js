'use strict'

module.exports = class ClientOptions {
    /**
     * Constructor of Client Options     
     * @param {String} token Token of bot
     * @param {Boolean} log Print log websocket
     */
    constructor(token, log) {
        return { token: token, log: log };
    }
}