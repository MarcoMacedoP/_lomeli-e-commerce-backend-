'use strict'
const Logger = use('Logger')
const BaseExceptionHandler = use('BaseExceptionHandler')
const SQL_DUPLICATE_ENTRY_FOR_EMAIL = /.*ER_DUP_ENTRY.*email_unique.*/
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, {response}) {
    if (error.message.match(SQL_DUPLICATE_ENTRY_FOR_EMAIL)) {
      response.unauthorized({message: 'This email is already in use :('})
    } else {
      response.status(error.status).json({
        message: error.message,
        error: error.name
      })
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, {request}) {
    Logger.error('error message: ' + error.message)
    Logger.error('error name: ' + error.name)
  }
}

module.exports = ExceptionHandler
