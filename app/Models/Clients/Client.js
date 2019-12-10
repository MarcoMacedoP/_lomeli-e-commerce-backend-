'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
  payments() {
    return this.hasMany('App/Clients/Payment')
  }
}

module.exports = Client
