'use strict'
const SUPPORT_SCOPES = [/\/clients\/.*/]
const CLIENT_SCOPES = [
  {
    url: /\/clients\/wishlist\/[0-9A-Za-z]+/,  //url: /clients/wishlist/[clientId]
    self: true,
    auth: true
  }
]
const API_VERSION = '/api/v1'
const Logger = use('Logger')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/**@typedef {import ('../Exceptions/InvalidRoleException')} InvalidRoleException */
const InvalidRoleException = use('App/Exceptions/InvalidRoleException')
const JWT = use('App/Controllers/Server/Jwt')

class CheckRequestRole {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const authHeader = request.header('Authorization')
    const token = authHeader && JWT.decodeFromHeader(authHeader)
    const routeId = Number(request.params.id)
    /*  Logger.info(request.params)
     Logger.info(token) */
    const route = request.url()
    if (!token) {
      throw new InvalidRoleException({ route })
    }
    const { data, uid } = token;
    const userCanAccessRoute = this.canAccessRoute({ role: data.role, route, routeId, userId: uid })
    console.log(userCanAccessRoute)
    if (userCanAccessRoute) {
      await next()
    }
  }

  /**
   * Check if user can access determinate route based on his role
   * @returns {boolean} the user access
   * @throws {InvalidRoleException}
   */
  canAccessRoute({ role, route, userId, routeId }) {
    if (!role || !route) {
      throw new InvalidRoleException({ route, message: 'invalid role or route' })
    }
    const normalizedRoute = route.split(API_VERSION)[1]
    let canAccessRoute = false
    switch (role) {
      case 'support':
        SUPPORT_SCOPES.forEach(scope => {
          if (scope.test(normalizedRoute)) {
            canAccessRoute = true
          }
        })
        break;
      case 'client':
        return CLIENT_SCOPES.find(scope =>
          scope.url.test(normalizedRoute) && scope.self ? userId === routeId : true)


      default:
        throw new InvalidRoleException({ route, message: 'dafult, lol' })

    }
    return canAccessRoute
  }

}

module.exports = CheckRequestRole
