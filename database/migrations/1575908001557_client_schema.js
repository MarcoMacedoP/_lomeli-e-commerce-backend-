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
      table.integer('number', 12).notNullable()
      table.string('direction', 255).notNullable()
      table.string('colony', 100).notNullable()
      table.integer('cp', 6).notNullable()
      table.string('state', 30).notNullable()
      table.string('municipality', 50).notNullable()
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
