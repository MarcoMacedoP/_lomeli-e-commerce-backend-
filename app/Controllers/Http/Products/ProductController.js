'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Products/Product')
const Category = use('App/Models/Products/Category')
/**
 * Resourceful controller for interacting with products
 */
class ProductController {

  constructor() {
    this.notFound = { message: 'Product not found' }
  }

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
    return { message: 'get all products', data: products }
  }
  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const productData = request.only([
      'name',
      'description',
      'price',
      'categorie_id',
      'user_id',
      'status'
    ])
    if (!productData.categorie_id) {
      const { categoryName } = request.post()
      const category = new Category()
      category.name = categoryName
      category.user_id = productData.user_id
      await category.save()
      productData.categorie_id = category.id
    }
    const createdProduct = await Product.create(productData)
    return {
      message: 'created product',
      data: {
        createdProduct
      }
    }


  }

  /**
   * Display a single product.
   * GET products/:id
   */
  async show({ params, response }) {
    const { id } = params
    const product = await Product.find(id)
    if (product) {
      return {
        message: 'get product',
        data: { product }
      }
    }
    else response.notFound(this.notFound)
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params
    const productData = request.only(['name', 'description', 'price'])
    const product = id && await Product.find(id)

    if (product) {

      Object.keys(productData).forEach(key => key &&
        product.merge({ [key]: productData[key] }))

      await product.save()
      response.created({
        message: 'updated product',
        data: { product }
      })
    } else {
      return response.notFound(this.notFound)
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
  async destroy({ params, response }) {
    const { id } = params
    const product = await Product.find(id)
    if (product) {
      await product.delete()
      response.accepted({
        message: 'deleted product',
        data: { product }
      })
    } else {
      response.notFound(this.notFound)
    }
  }
}

module.exports = ProductController
