'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const WishlistModel = use('App/Models/Clients/Wishlist')
const WishlistProductsModel = use('App/Models/Clients/WishlistProduct')
const Logger = use('Logger')

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
    const wishlists = await WishlistModel.all()
    return { message: 'get all wishlists', data: wishlists }

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
    response.serviceUnavailable({ message: 'wishlist are created everytime that a client is registered' })
  }

  /**
   * Display a single wishlist.
   * GET wishlists/:id´where 
   * :id is there client id on the wishlist
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const { id: clientId } = params;
    const wishlist = await WishlistModel.findBy('client_id', clientId)
    return { message: 'get a client wishlist', data: wishlist }

  }


  /**
   * Update wishlist details.
   * PUT or PATCH wishlists/:id
   * :id is there client id on the wishlist
   * 
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id: clientId } = params;
    const { products = [] } = request.all()
    const wishlist = await WishlistModel.findBy('client_id', clientId)
    Logger.info('wishlist_id' + wishlist.id)
    const wishlistProducts = (await WishlistProductsModel.findBy('wishlist_id', wishlist.id)) || []
    Logger.info(JSON.stringify(wishlistProducts))
    const addedProducts = products.map(product => {
      const isAlreadyInWhislist = wishlistProducts.find(({ id }) => id === product.id)
      return !isAlreadyInWhislist && product
    })
    addedProducts.forEach(async product => {
      await WishlistProductsModel.create({
        product_id: product.id,
        wishlist_id: wishlist.id
      })
    });
    //update the wishlist-products
    return { message: 'hello there' }
  }

  /**
   * Delete a wishlist with id.
   * DELETE wishlists/:id
   * :id is there client id on the wishlist
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id: clientId } = params;
    const wishlist = await WishlistModel.findBy('client_id', clientId)
    //clean the wishlist-products
    return { message: 'hello there' }
  }
}

module.exports = WishlistController
