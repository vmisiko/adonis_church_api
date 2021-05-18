'use strict'
const Member = use('App/Models/Member')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with members
 */
class MemberController {
  
  async store ({ request, response }) {
    const data = request.all();
    try {
      const member = await Member.create(data)
      return response.send({
        status: 'success',
        message: 'Member saved successfully.',
        data: member
      })
    } catch(err) {
      return response.status(err.status).send({
        status: 'Error',
        message: 'Member save error',
      })
    }


  }
  
  async show ({ params, request, response, view }) {
    const page = request.input('page')
    const limit = 10
    const members = await Member.query().paginate(page, limit)
    return response.send(members)
  }

  async showMember({ params, request, response, view }) {
    try {
    const member = await Member.find(params.id)
    if (!member) {
      return response.send({
        status: 'error',
        message: "Member not registered",
      })
    }

    return response.send({
      status: 'success',
      message: '',
      data: member
    })
    } catch(err) {
      return response.status(err.status).send({
        status: 'error',
        message: err.message,
      })
    }
  }
  
  async edit ({ params, request, response, view }) {
  }

  
}

module.exports = MemberController
