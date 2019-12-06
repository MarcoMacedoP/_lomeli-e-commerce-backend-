'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ForgetedPasswordSchema extends Schema {
  up() { //prettier-ignore
    this.create('forgeted_passwords', table => {
      table.increments()
      table.integer('requester_id').notNullable()
      table.string('email', 150).notNullable()
      table.enum('requested_type', ['client', 'user']).defaultTo('client')
      table.string('token', 255).notNullable()
      table
        .enu('status', ['active', 'inactive'])
        .defaultTo('active')
        .notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('forgeted_passwords')
  }
}

module.exports = ForgetedPasswordSchema
