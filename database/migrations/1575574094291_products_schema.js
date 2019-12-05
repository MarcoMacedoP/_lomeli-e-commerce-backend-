'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up() {
    this.create('products', table => {
      // alter table
      table.increments('product_id')
      table.string('name', 80).notNullable()
      table.text('description', 'mediumtext')
      table.decimal('price', 16, 2).notNullable()
      table.timestamps(null, true)
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductsSchema
