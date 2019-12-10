'use strict'
const SUPPORT_SCOPES = [/\/clients\/.*/]

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
  async handle({request, response}, next) {
    const token = JWT.decodeFromHeader(request.header('Authorization'))
    const route = request.url()
    if (!token) {
      throw new InvalidRoleException({route})
    }

    const userCanAccessRoute = this.canAccessRoute({role: token.data.role, route})

    if (userCanAccessRoute) {
      await next()
    }
  }

  /**
   * Check if user can access determinate route based on his role
   * @returns {boolean} the user access
   * @throws {InvalidRoleException}
   */
  canAccessRoute({role, route}) {
    if (!role) {
      throw new InvalidRoleException({route})
    }
    let canAccessToRoute = false

    if (role === 'support') {
      SUPPORT_SCOPES.forEach(scope => {
        if (route.match(scope)) {
          canAccessToRoute = true
        }
      })
    }
    if (!canAccessToRoute) {
      throw new InvalidRoleException({route})
    } else {
      return canAccessToRoute
    }
  }
}

module.exports = CheckRequestRole
