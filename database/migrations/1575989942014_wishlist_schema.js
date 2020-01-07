'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WishlistSchema extends Schema {
  up() {
    this.create('wishlists', table => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.timestamps()
    })
  }

  down() {
    this.drop('wishlists')
  }
}

module.exports = WishlistSchema
