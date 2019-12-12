'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')
const Logger = use('Logger')
const statusCode = 401
const code = 'BAD_RECOVER_TOKEN'
const message =
  'Your token for recover your password is invalid, please generate another instead.'
class InvalidRecoverPasswordException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  constructor({reason}) {
    super(message, statusCode, code)
    this.reason = reason
    Logger.error(`InvalidRecoverPasswordException because ${this.reason}`)
  }
}

module.exports = InvalidRecoverPasswordException
