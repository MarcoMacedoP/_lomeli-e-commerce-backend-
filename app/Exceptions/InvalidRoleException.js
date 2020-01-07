'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidRoleException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  constructor({ route, message = '' }) {
    const messageException = message ? ` ${message}\n You can't access to ${route}` : `You can't access to ${route}`
    super(messageException, 401)
  }
}

module.exports = InvalidRoleException
