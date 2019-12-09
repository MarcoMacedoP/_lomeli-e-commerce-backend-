'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorieSchema extends Schema {
  up() {
    this.create('categories', table => {
      table.increments()
      table.integer('parent_id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 100).notNullable()
      table.enu('status', ['active', 'inactive']).defaultTo('active').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('categories')
  }
}

module.exports = CategorieSchema
