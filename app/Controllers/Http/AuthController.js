'use strict'

const User = use('App/Models/User')

class AuthController {
    async register ({ request, response }) {
        const data = request.all();
        
        try {
          const user = await User.create(data)
          console.log(user)
          return response.send({
            status: 'success',
            message: 'User Registered Successfully !',
            data: user,
          })
        } catch (error) {
          return response.status(error.status).send(
            {
              status: 'error',
              error: error.message,
              message: 'Failed. Please Try again!'
            }
          )
        }
    }

    async login ({ request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password")
        const token = await auth.withRefreshToken().attempt(email, password)
        return token;
    }
}

module.exports = AuthController
