'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WishlistProductsSchema extends Schema {
  up() {
    this.create('wishlist_products', (table) => {
      table.increments()
      table.integer('wishlist_id').unsigned().references('id').inTable('wishlists')
      table.integer('product_id').unsigned().references('id').inTable('products')
    })
  }

  down() {
    this.drop('wishlist_products')
  }
}

module.exports = WishlistProductsSchema
