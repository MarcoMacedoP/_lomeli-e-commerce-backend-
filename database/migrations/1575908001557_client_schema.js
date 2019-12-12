'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', table => {
      table.increments()
      table.string('email', 255).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('name', 255).notNullable()
      table.integer('number', 12)
      //Check nullable values
      table.string('direction', 255)
      table.string('colony', 100)
      table.integer('cp', 6)
      table.string('state', 30)
      table.string('municipality', 50)
      table.string('reference', 255)
      table.date('birthday')
      table.enu('sex', ['male', 'female'])
      table.enu('status', ['active', 'inactive']).defaultTo('active').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
