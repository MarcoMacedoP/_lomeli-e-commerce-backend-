'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Wishlist extends Model {
  user() {
    return this.hasOne('App/Models/Clients/Client')
  }
  products() {
    return this.belongsToMany('App/Models/Products/Product')
      .pivotModel('App/Models/Clients/WishlistProduct')
      .fetch()
  }
}

module.exports = Wishlist
