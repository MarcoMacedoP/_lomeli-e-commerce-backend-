'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClientsPayment extends Model {
  client() {
    return this.belongsTo('App/Models/Clients/Client')
  }
}

module.exports = ClientsPayment
