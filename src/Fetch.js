'use strict';

const fetch = require('node-fetch')

/**
 *  
 * @param {String} url Required!!
 * @param {String} v version of discord api defualt: 9
 * @param {String} method defualt: GET
 * @param {String} mode defualt: cors
 * @param {String} tokenType defualt: Bot
 * @param {String} token Required!!!
 * @returns {JSON} 
 */
module.exports = function fetchAPI(url, v, method, mode, tokenType, token) {
    return fetch(`https://discord.com/api/v${v || 9}/${url}`, {
        method: method || 'GET',
        mode: mode || 'cors',
        headers: {
            Authorization: `${tokenType || "Bot"} ${token}`,
            'Content-Type': 'application/json'
        }
    })
}