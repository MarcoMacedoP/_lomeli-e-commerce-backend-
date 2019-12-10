'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketsSchema extends Schema {
  up () {
    this.create('tickets', table => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.string('issue', 255).notNullable()
      table.string('answer', 255)
      table.string('message', 255)
      table.timestamp('tracking_date')
      table.timestamp('close_date')
      table.enu('status', ['active', 'inactive']).defaultTo('active').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tickets')
  }
}

module.exports = TicketsSchema
