const Config = use('Config')
const jwtSecret = Config.get('auth.jwt.options.secret')
const Logger = use('Logger')
const jsonWebToken = require('jsonwebtoken')
const TEN_MINUTES_EXP = Math.floor(Date.now() / 1000) + 60 * 10

class JWT {
  static sign(payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      const finalPayload = payload.exp
        ? {payload}
        : {...payload, exp: TEN_MINUTES_EXP}
      jsonWebToken.sign(finalPayload, jwtSecret, {}, (errr, token) => {
        if (errr) {
          Logger.error(errr)
          reject(errr)
        } else if (token) {
          resolve(token)
        }
      })
    })
  }
  static verify(token) {
    return new Promise((resolve, reject) => {
      jsonWebToken.verify(token, jwtSecret, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }
}
module.exports = JWT
