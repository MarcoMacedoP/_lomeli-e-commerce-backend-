'use strict'
const User = use('App/Models/User')
const ForgetedPassword = use('App/Models/ForgetedPassword')
const JWT = require('../../Server/Jwt')
const Logger = use('Logger')
class AuthController {
  async login({request, auth}) {
    const {email, password} = request.post()
    const user = await User.findBy('email', email)
    const result = await auth.attempt(email, password, {email, role: user.type})
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
      const token = await JWT.sign({
        email
      })
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
  async recoverPassword({request, response}) {
    const {token, newPassword} = request.all()
    if (!token || !newPassword) {
      response.unauthorized({message: 'No token provided'})
    } else {
      //query the token and the status of token
      const passwordToken = await ForgetedPassword.findBy('token', token)
      //if token is not valid this will be false.
      const isValidToken = await JWT.verify(token).catch(error => {
        Logger.error(error)
        return false
      })
      //everthing fine with the token?
      if (passwordToken && passwordToken.status === 'active' && isValidToken) {
        //update user
        const user = await User.find(passwordToken.requester_id)
        user.password = newPassword
        user.save()
        //set token as inactive
        passwordToken.status = 'inactive'
        passwordToken.save()
        return {
          message: 'updated user',
          data: {
            userId: user.id
          }
        }
      } else {
        response.unauthorized({message: 'Token is not valid'})
      }
    }
  }
}

module.exports = AuthController
