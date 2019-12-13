'use strict'



/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @typedef {import('../../../Models/Products/Category')}  */
const Category = use('App/Models/Products/Category')
const BaseController = require('../BaseController')
/**
 * Resourceful controller for interacting with categories
 */
class CategoryController extends BaseController {

  constructor() {
    super({ controllerName: 'product' })
  }

  /**
   * Show a list of all categories.
   * GET categories
   */
  async index() {
    const categories = await Category.all()
    return {
      message: 'get all categories',
      data: categories
    }
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const categoryData = request.only(['name', 'user_id'])
    const category = await Category.create(categoryData)
    return {
      message: 'created category',
      data: { category }
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const category = await Category.find(params.id)
    if (category) {
      return {
        message: 'get a category',
        data: { category }
      }
    } else return this.notFound({ response })

  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const category = await Category.find(params.id)

    if (!category) {
      return this.notFound({ response })
    }
    const categoryUpdatedData = request.only(['name'])
    this.forInObject(categoryUpdatedData, key => category[key] = categoryUpdatedData[key])
    await category.save()
    return {
      message: 'updated object',
      data: {
        category
      }
    }
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const category = await Category.find(params.id)
    if (category) {
      const id = category.id
      await category.delete()
      return {
        message: 'deleted category',
        data: { id }
      }
    } else return this.notFound({ response })
  }
}

module.exports = CategoryController
