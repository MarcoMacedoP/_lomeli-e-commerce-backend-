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
  return {greeting: 'Hello world in JSON'}
})
//**** User *******
Route.post('/user', 'User/UserController.create')
//User - Auth
Route.post('/user/auth/login', 'User/AuthController.login')
Route.post('/user/auth/sign-up', 'User/AuthController.signUp')
Route.post('/user/auth/recover-password', 'User/AuthController.forgetPassword')
//Products
Route.resource('/products', 'ProductController').apiOnly()
