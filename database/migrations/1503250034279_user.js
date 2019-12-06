'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table =>
      // prettier-ignore
      {
        table.increments()
        table.string('email', 254).notNullable().unique() 
        table.string('name', 100).notNullable()
        table.string('password', 60).notNullable()
        table.enu('type', ['root', 'admin', 'support']).defaultTo('support').notNullable()
        table.enu('status', ['active', 'inactive']).defaultTo('active').notNullable()
        table.timestamps()
      }
    )
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
