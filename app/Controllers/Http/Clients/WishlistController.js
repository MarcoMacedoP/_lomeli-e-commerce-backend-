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
    const result = await this.checkProductStatusInWishlist({
      params,
      request
    })
    const { wishlist, wishlistProducts, isProductAdded, productExist, productId } = result // prettier-ignore

    if (isProductAdded) {
      response.badRequest({message: 'product already in wishlist'})
    } else if (!productExist) {
      response.badRequest({message: 'This product does not exists'})
    } else {
      await WishlistProductsModel.create({
        product_id: productId,
        wishlist_id: wishlist.id
      })
      const updatedProducts = await wishlist.products()

      return {
        message: 'added product to wishlist',
        data: {
          ...wishlist.$attributes,
          products: updatedProducts
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
    const result = await this.checkProductStatusInWishlist({
      params,
      request
    })
    const { wishlist, wishlistProducts, isProductAdded, productExist, productId } = result // prettier-ignore
    if (!isProductAdded) {
      response.badRequest({message: `This product isn't in wishlist`})
    } else if (!productExist) {
      response.badRequest({message: ' does not exists'})
    } else {
      const pivotProductInWishlist = await WishlistProductsModel.query()
        .where('product_id', '=', productExist.id)
        .where('wishlist_id', '=', wishlist.id)
        .delete()
      const updatedProducts = await wishlist.products()
      return {message: 'hello there', data: updatedProducts}
    }
  }

  /**Fetch the wishlist usign the client id in Params.
   * After that search the product usign the productId recievied in request.
   * @returns { wishlist, wishlistProducts, isProductAdded, productExist}
   *
   * @param {*} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async checkProductStatusInWishlist({params, request}) {
    const {id: clientId} = params
    const wishlist = await WishlistModel.findBy('client_id', clientId)
    const {productId} = request.all()
    const wishlistProducts = await wishlist.products()
    const isProductAdded = wishlistProducts.find(
      product => product && product.id === Number(productId)
    )
    Logger.info(typeof productId)
    const productExist = await Product.find(productId)
    Logger.info(JSON.stringify(productExist))
    return {wishlist, wishlistProducts, isProductAdded, productExist, productId}
  }
}

module.exports = WishlistController
