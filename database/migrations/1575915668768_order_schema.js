'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', table => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients').notNull(9)
      table.integer('code_id').unsigned().references('id').inTable('codes')
      table.decimal('mount', 10).notNull()
      table.enu('status', ['active', 'inactive']).defaultTo('active').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
