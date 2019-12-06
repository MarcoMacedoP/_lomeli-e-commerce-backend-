'use strict'
const User = use('App/Models/User')
const Logger = use('Logger')
class AuthController {
  async login({request, auth}) {
    const {email, password} = request.post()
    const result = await auth.attempt(email, password, {email})
    return result
  }

  async signUp({request, auth, response}) {
    const userData = request.only(['email', 'password'])
    try {
      await User.create(userData)
      return this.login({auth, request})
    } catch (error) {
      Logger.error(error)
      response.unauthorized({message: 'user or email already taken'})
    }
  }
  async forgetPassword({request}) {
    const {email} = request.all()
  }
}

module.exports = AuthController
