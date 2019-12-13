'use strict'

class ProductsStore {
  get rules() {
    return {
      categorie_id: 'required',
      user_id: 'required',
      name: 'required',
      description: 'required',
      price: 'required|float',
      status: 'boolean'
    }
  }
}

module.exports = ProductsStore
