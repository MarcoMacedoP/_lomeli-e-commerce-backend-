'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const Wishlist = use('App/Models/Clients/Wishlist')

class Client extends Model {
  static boot() {
    super.boot()

    /**A hook to create the client wishlist after user is created*/
    this.addHook('afterCreate', async client => {
      await Wishlist.create({
        client_id: client.id
      })
    })
    /**
     * A hook to remove the password value before return it to server
     */
    this.addHook('afterSave', client => {
      delete client['$attributes'].password
      return client
    })

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
    return this.hasMany('App/Models/Clients/Payment')
  }
  wishlist() {
    return this.hasOne('App/Models/Clients/Wishlist')
  }
  getTickets() {
    return this.hasMany('App/Models/Clients/Tickets')
  }
}

module.exports = Client
