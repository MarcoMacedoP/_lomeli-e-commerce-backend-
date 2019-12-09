'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientsPaymentSchema extends Schema {
  up () {
    this.create('clients_payments', (table) => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.enu('type', ['paypal', 'card'])
      table.string('payment_id')
      table.enu('status', ['active', 'inactive']).defaultTo('active').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients_payments')
  }
}

module.exports = ClientsPaymentSchema
