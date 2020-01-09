'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const WishlistModel = use('App/Models/Clients/Wishlist')
const WishlistProductsModel = use('App/Models/Clients/WishlistProduct')
const Logger = use('Logger')
const Product = use('App/Models/Products/Product')
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
  async index({request, response, view}) {
    const wishlists = await WishlistModel.all()
    return {message: 'get all wishlists', data: wishlists}
  }

  /**
   * Create/save a new wishlist.
   * POST wishlists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
    response.serviceUnavailable({
      message: 'wishlist are created everytime that a client is registered'
    })
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
  async show({params}) {
    const {id: clientId} = params
    const wishlist = await WishlistModel.findBy('client_id', clientId)
    return {message: 'get a client wishlist', data: wishlist}
  }

  /**
   * Add an intem to the whislist.
   * PUT or PATCH wishlists/:id
   * :id is there client id on the wishlist
   *
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
    const {id: clientId} = params
    const {productId} = request.all()
    const wishlist = await WishlistModel.findBy('client_id', clientId)
    const wishlistProducts = await wishlist.products()
    const isProductAdded = wishlistProducts.find(
      product => product && product.id === Number(productId)
    )
    if (isProductAdded) response.badRequest({message: 'product already in wishlist'})
    else {
      const productExist = await Product.find(productId)

      if (!productExist)
        response.badRequest({message: 'This product does not exists'})
      else {
        await WishlistProductsModel.create({
          product_id: productId,
          wishlist_id: wishlist.id
        })
        return {
          message: 'added product to wishlist',
          data: {
            ...wishlist.$attributes,
            products: wishlistProducts
          }
        }
      }
    }
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
  async destroy({params, request, response}) {
    const {id: clientId} = params
    const wishlist = await WishlistModel.findBy('client_id', clientId)
    //clean the wishlist-products
    return {message: 'hello there'}
  }
}

module.exports = WishlistController
