'use strict'
const User = use('App/Models/User')
const ForgetedPassword = use('App/Models/ForgetedPassword')
const crypto = require('crypto')
const Util = require('util')
const randomBytes = Util.promisify(crypto.randomBytes)

const Logger = use('Logger')
class AuthController {
  async login({request, auth}) {
    const {email, password} = request.post()
    const result = await auth.attempt(email, password, {email})
    return result
  }

  async signUp({request, auth, response}) {
    const userData = request.only(['email', 'password', 'name'])
    const userCreated = await User.create(userData).catch(error => {
      Logger.error(error)
      response.unauthorized({message: 'user or email already taken'})
    })
    if (userCreated) {
      return this.login({auth, request})
    }
  }
  async forgetPassword({request}) {
    const {email} = request.all()
    const user = await User.findBy('email', email)
    if (user) {
      const forgetedPassword = new ForgetedPassword()
      const token = (await randomBytes(24)).toString('base64').replace(/\W/g, '')
      forgetedPassword.fill({
        requester_id: user.id,
        requested_type: 'client',
        token,
        email
      })
      forgetedPassword.save()
    }
    return {
      message: `If ${email} is user we will sent an email to recover his password`
    }
  }
}

module.exports = AuthController
