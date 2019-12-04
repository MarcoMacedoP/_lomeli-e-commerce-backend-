'use strict'
const Logger = use('Logger')

class AuthController {
    login({request, response}){
        const {email, password} = request.post()
        
        return {message: "Auth endpoint"}
    }
}

module.exports = AuthController
