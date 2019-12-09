'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersDetailSchema extends Schema {
  up () {
    this.create('orders_details', (table) => {
      table.increments()
      table.integer('order_id').unsigned().references('id').inTable('orders').notNull()
      table.integer('product_id').unsigned().references('id').inTable('products').notNull()
      table.integer('qtty').notNull().defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('orders_details')
  }
}

module.exports = OrdersDetailSchema
