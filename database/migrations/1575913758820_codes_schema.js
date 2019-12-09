'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodesSchema extends Schema {
  up () {
    this.create('codes', table => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('code', 255).unique().index().notNullable()
      table.decimal('discount', 6).notNullable()
      table.integer('used_times').defaultTo(0).notNullable()
      table.timestamp('expire_date').notNullable()
      table.enu('status', ['active', 'inactive']).defaultTo('active').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('codes')
  }
}

module.exports = CodesSchema
