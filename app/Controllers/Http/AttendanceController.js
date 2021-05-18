'use strict'
const Attendance = use('App/Models/Attendance')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with attendances
 */
class AttendanceController {
 
  async store ({ request, response }) {
    const data = request.all();
    try {
      const attendance = await Attendance.create(data)
      return response.send({
        status: 'success',
        message: 'Attendance Registered Successfully !',
        data: attendance,
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

  
  async show ({ params, request, response, view }) {
    const page = request.input('page')
    const limit = 10
    const attendance = await Attendance.query().paginate(page, limit)
    return response.send(attendance);
  }
  
  
  /**
   * Render a form to update an existing attendance.
   * GET attendances/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update attendance details.
   * PUT or PATCH attendances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a attendance with id.
   * DELETE attendances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AttendanceController
