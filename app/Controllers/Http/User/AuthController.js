'use strict'
const User = use('App/Models/Users/User')
const ForgetedPassword = use('App/Models/ForgetedPassword')
const InvalidRecoverPasswordException = use(
  'App/Exceptions/InvalidRecoverPasswordException'
)

class AuthController {
  async _authUser({email, password, auth, response}) {
    const userAuth = auth.authenticator('user')
    const user = await User.findBy('email', email)
    if (!user) {
      response.unauthorized({message: 'Unauthorized'})
    } else {
      const token = await userAuth.attempt(email, password, {email, role: user.type})
      //remove user password from response
      delete user['$attributes'].password

      return {
        token,
        user
      }
    }
  }
  async login({request, auth, response}) {
    const {email, password} = request.post()
    const result = await this._authUser({response, email, password, auth})
    return {message: 'user loged ', data: result}
  }

  async signUp({response, request, auth}) {
    const userData = request.only(['email', 'password', 'name'])
    await User.create(userData)
    const result = await this._authUser({
      email: userData.email,
      password: userData.password,
      auth,
      response
    })
    return {
      message: 'user signed up',
      data: result
    }
  }
  async forgetPassword({request}) {
    const {email} = request.all()
    const user = await User.findBy('email', email)
    const data = {message: ForgetedPassword.message}
    if (user) {
      const token = await ForgetedPassword.generate({
        email,
        type: 'user',
        id: user.id
      })
      data.token = token && token
    }
    return data
  }
  async recoverPassword({request}) {
    const {token, newPassword} = request.post()
    const forgetPassword = await ForgetedPassword.findBy('token', token)
    if (!forgetPassword) {
      throw new InvalidRecoverPasswordException({reason: `Don't found`})
    } else if (forgetPassword.requested_type !== 'user') {
      throw new InvalidRecoverPasswordException({
        reason: `Trying to modify a user.`
      })
    } else {
      const user = await User.find(passwordToken.requester_id)
      user.password = newPassword
      user.save()
      return {
        message: 'updated user',
        data: {
          userId: user.id
        }
      }
    }
  }
}

module.exports = AuthController
