'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('categorie_id').notNullable().unsigned().references('id').inTable('categories')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.string('name', 80).notNullable()
      table.string('sku', 80)
      table.text('description', 'mediumtext')
      table.decimal('price', 16).notNullable()
      table.decimal('rating', 3).notNullable().defaultTo(5.0)
      table.integer('visitas')
      table.enu('status', ['active', 'inactive']).defaultTo('active').notNullable()
      table.timestamps(null, true)
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductsSchema
