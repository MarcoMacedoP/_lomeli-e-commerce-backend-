'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductImageSchema extends Schema {
  up () {
    this.create('products_images', (table) => {
      table.increments()
      table.integer('product_id',).notNullable().unsigned().references('id').inTable('products')
      table.string('image_url', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_images')
  }
}

module.exports = ProductImageSchema
