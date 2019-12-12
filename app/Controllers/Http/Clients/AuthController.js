'use strict'
const Client = use('App/Models/Clients/Client')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class AuthController {
  _authClient({email, password, auth}) {
    const clientAuth = auth.authenticator('client')
    const normalizedPassword = String(password)
    return clientAuth.attempt(email, normalizedPassword, {email, role: 'client'})
  }
  /**
   *  Get's the user from the Authorization: Basic header,
   * @param {*} ctx
   * @param {Request} request
   * @param {Response} response
   */
  async login({request, auth}) {
    const {email, password} = request.post()
    const token = await this._authClient({
      email,
      password,
      auth
    })
    return {
      message: 'loged client',
      data: {...token}
    }
  }
  async signUp({request, auth}) {
    const clientData = request.only(['name', 'email', 'password', 'number'])
    if (clientData.password && typeof clientData.password !== 'string') {
      clientData.password = String(clientData.password)
    }
    const client = await Client.create(clientData)
    const token = await this._authClient({
      email: clientData.email,
      password: clientData.password,
      auth
    })
    return {
      message: 'client signed up',
      data: {
        client,
        token
      }
    }
  }
  forgetPassword() {}
  recoverPassword() {}
}

module.exports = AuthController
