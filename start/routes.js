'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')
Route.post('/register-attendance', 'AttendanceController.store')
Route.get('/attendance', 'AttendanceController.show')
Route.post('/register-member', 'MemberController.store')
Route.get('/members', 'MemberController.show')

Route.get('/search-member/:id', 'MemberController.showMember')