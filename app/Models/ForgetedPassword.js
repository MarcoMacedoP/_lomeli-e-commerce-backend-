'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const mail = require('nodemailer')
const Config = use('Config')
const Logger = use('Logger')

class ForgetedPassword extends Model {
  static boot() {
    super.boot()

    this.addHook('afterCreate', async forgetedPasswordInstance => {
      const transport = mail.createTransport({
        host: Config.get('app.email.host'),
        port: Config.get('app.email.port'),
        auth: {
          user: Config.get('app.email.user'),
          pass: Config.get('app.email.password')
        }
      })
      const message = {
        from: 'test@example.com',
        to: forgetedPasswordInstance.email,
        subject: 'Recupera tu contraseña',
        html: `<h1>Recupera tu contraseña</h1>
                    <p>Si no solicitaste un cambio de contraseña, ignora esto. </p>`
      }
      transport.sendMail(message, (error, info) => {
        if (error) Logger.error(`Error on send email: ${error}`)
        if (info) Logger.info(info)
      })
    })
  }
}

module.exports = ForgetedPassword
