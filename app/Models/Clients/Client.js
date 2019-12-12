'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Client extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async clientInstance => {
      if (clientInstance.dirty.password) {
        const password = String(clientInstance.dirty.password)
        //normalize user-password to string
        if (typeof password !== 'string') {
          clientInstance.dirty.password = String(password)
        }
        console.log(typeof clientInstance.dirty.password)
        clientInstance.password = await Hash.make(password)
      }
    })
  }
  payments() {
    return this.hasMany('App/Clients/Payment')
  }
}

module.exports = Client
