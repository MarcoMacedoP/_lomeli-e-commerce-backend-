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
  }
}

module.exports = AuthController
