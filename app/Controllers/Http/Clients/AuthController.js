'use strict'
const Client = use('App/Models/Clients/Client')
const ForgetedPassword = use('App/Models/ForgetedPassword')
const InvalidRecoverPasswordException = use(
  'App/Exceptions/InvalidRecoverPasswordException'
)
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
  async forgetPassword({request}) {
    const {email} = request.all()
    const client = await Client.findBy('email', email)
    const data = {
      message: ForgetedPassword.message
    }
    if (client) {
      const token = await ForgetedPassword.generate({
        email,
        type: 'client',
        id: client.id
      })
      data.token = token
    }
    return data
  }
  async recoverPassword({request, response}) {
    const {token, newPassword, email} = request.post()
    const forgetPassword = await ForgetedPassword.findBy('token', token)
    if (!forgetPassword) {
      throw new InvalidRecoverPasswordException({reason: `Don't found`})
    } else if (forgetPassword.requested_type !== 'client') {
      throw new InvalidRecoverPasswordException({
        reason: `Trying to modify a client.`
      })
    } else {
      const client = await Client.findBy('email', email)
      client.password = newPassword
      client.save()
      return {message: 'updated client password'}
    }
  }
}

module.exports = AuthController
