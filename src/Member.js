'use strict';

module.exports = class Member {
    constructor(user) {
        if (typeof user != 'object') throw new Error("Member constructor argument must be an object")

        this.id = user.d.user.id
        this.username = user.d.user.username
        this.discriminator = user.d.user.discriminator
        this.bot = user.d.user.bot
        this.avatarCode = user.d.user.avatar 
    }
}