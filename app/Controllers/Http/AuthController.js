'use strict'
const User = use('App/Models/User')
class AuthController {

    async login({request, auth}){
        const {email, password} = request.post()
        const result = await auth.attempt(email, password, {email})
        return result
    }
    
    async signUp(http){
        const {request} = http;
        const userData = request.only(['username', 'email', 'password']);
        await User.create(userData)
        return this.login(http)
    }
}

module.exports = AuthController
