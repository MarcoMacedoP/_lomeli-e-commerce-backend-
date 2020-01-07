'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

const API_V1 = '/api/v1'

Route.group(() => {
  Route.post('/auth/login', 'User/AuthController.login')
  Route.post('/auth/sign-up', 'User/AuthController.signUp')
  Route.post('/auth/request-recover-password', 'User/AuthController.forgetPassword')
  Route.post('/auth/recover-password', 'User/AuthController.recoverPassword')
}).prefix(`${API_V1}/user`)

//Clients
Route.group(() => {
  Route.resource('/', 'Clients/ClientController').apiOnly()
  Route.resource('/wishlist', 'Clients/WishlistController').apiOnly().middleware(['role'])
  Route.post('/auth/sign-up', 'Clients/AuthController.signUp')
  Route.post('/auth/login', 'Clients/AuthController.login')
  Route.post('/auth/forget-password', 'Clients/AuthController.forgetPassword')
  Route.post('/auth/recover-password', 'Clients/AuthController.recoverPassword')
  Route.resource('/payment', 'Clients/PaymentController/WishlistController').apiOnly()
}).prefix(`${API_V1}/clients`)

//Products
Route.group(() => {
  Route.resource('/categories', 'Products/CategoryController').apiOnly()
  Route.resource('/', 'Products/ProductController').apiOnly().validator(new Map([
    [['products.store'], ['Products/Store']]
  ]))
}).prefix(`${API_V1}/products`)
