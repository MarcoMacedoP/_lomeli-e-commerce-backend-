'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with wishlists
 */
class WishlistController {
  /**
   * Show a list of all wishlists.
   * GET wishlists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return { message: 'hello there' }

  }



  /**
   * Create/save a new wishlist.
   * POST wishlists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    return { message: 'hello there' }
  }

  /**
   * Display a single wishlist.
   * GET wishlists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return { message: 'hello there' }
  }


  /**
   * Update wishlist details.
   * PUT or PATCH wishlists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    return { message: 'hello there' }
  }

  /**
   * Delete a wishlist with id.
   * DELETE wishlists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    return { message: 'hello there' }
  }
}

module.exports = WishlistController
