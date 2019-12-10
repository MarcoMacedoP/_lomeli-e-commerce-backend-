'use strict'
const User = use('App/Models/User')
class UserController {
  async create({request, response}) {
    const userData = request.only(['email', 'password', 'name'])
    const user = await User.create(userData)
    response.ok({user})
  }
}

module.exports = UserController
