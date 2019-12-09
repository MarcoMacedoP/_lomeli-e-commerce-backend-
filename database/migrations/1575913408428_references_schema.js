'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReferencesSchema extends Schema {
  up () {
    this.create('references', table => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('code', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('references')
  }
}

module.exports = ReferencesSchema
