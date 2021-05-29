'use strict'

const User = use('App/Models/User')

class AuthController {
    async register ({ request, response }) {
        const data = request.all();
        data.role = 'user'
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
        const token = await auth.withRefreshToken().attempt(email, password, true)
        return token;
    }

    async edit ({ request, response, params }) {
      try {
        const data = request.all();
        const user = await User.find(params.id)
        user.merge(data)
        await user.save()
        return response.send({
          status: true,
          message: 'Role updated successfully!',
          data: user,
        })
      }
      catch (err) {
        return response.send({
          status: false,
          message: 'Something went wrong! Please try again.',
        })
      }
    }

    async show ({ params, request, response, view }) {
      const page = request.input('page')
      const limit = 10
      const users = await User.query().paginate(page, limit)
      return response.send(users);
    }

}

module.exports = AuthController
