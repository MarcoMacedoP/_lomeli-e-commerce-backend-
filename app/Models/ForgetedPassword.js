'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const mail = require('nodemailer')
const Config = use('Config')
const JWT = use('App/Controllers/Server/Jwt')
const InvalidRecoverPasswordException = use(
  'App/Exceptions/InvalidRecoverPasswordException'
)
class ForgetedPassword extends Model {
  static message = 'If email is user we will sent an email to recover his password'
  /**
   * Generate into forgeted_passwords table
   */
  static async generate({email, type, id}) {
    const forgetedPassword = new ForgetedPassword()
    const token = await JWT.sign({
      email
    })
    forgetedPassword.fill({
      requester_id: id,
      requested_type: type,
      token,
      email
    })
    forgetedPassword.save()
    return token
  }

  static boot() {
    super.boot()

    this.addHook('afterFind', async forgetedPasswordInstance => {
      if (!forgetedPasswordInstance) {
        throw new InvalidRecoverPasswordException({reason: 'No token founded'})
      }
      const {status, token} = forgetedPasswordInstance
      if (status !== 'active')
        throw new InvalidRecoverPasswordException({reason: 'token is not active'})
      try {
        await JWT.verify(token)
        forgetedPasswordInstance.status = 'inactive'
        forgetedPasswordInstance.save()
        return forgetedPasswordInstance
      } catch (error) {
        throw new InvalidRecoverPasswordException({reason: error})
      }
    })

    this.addHook('afterCreate', async forgetedPasswordInstance => {
      //TODO: Probably separate this into another file, just for e-mails
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
      /* transport.sendMail(message, (error, info) => {
        if (error) Logger.error(`Error on send email: ${error}`)
        if (info) Logger.info(info)
      }) */
    })
  }
}

module.exports = ForgetedPassword
