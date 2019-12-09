'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const products = await Product.all()
    return {message: 'get all products', data: products}
  }
  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request}) {
    const productData = request.only([
      'name',
      'description',
      'price',
      'categorie_id',
      'sku',
      'user_id',
      'status'
    ])
    const createdProduct = await Product.create(productData)
    return {
      message: 'created product',
      data: createdProduct
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   */
  async show({params}) {
    const {id} = params
    console.log(id)
    const product = await Product.find(id)
    return {
      message: 'get product',
      data: product
    }
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
    const {id} = params
    const {name, description, price} = request.post()
    console.log(request.post())
    if (id) {
      const product = await Product.find(id)
      if (product) {
        if (name) {
          product.merge({
            name
          })
        }
        if (description) {
          product.merge({
            description
          })
        }
        if (price) {
          product.merge({
            price
          })
        }
        console.log(product)
        try {
          await product.save()
          response.status(201).json({
            message: 'updated product',
            data: product
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, response}) {
    const {id} = params
    const product = await Product.find(id)
    await product.delete()
    response.status(201).json({
      message: 'deleted product',
      data: product
    })
  }
}

module.exports = ProductController
