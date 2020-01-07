'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Wishlist extends Model {
    user() {
        return this.hasOne('App/Models/Clients/Client')
    }
}

module.exports = Wishlist
