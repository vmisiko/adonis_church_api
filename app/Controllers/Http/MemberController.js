'use strict'
const Member = use('App/Models/Member')
const Helpers = use('Helpers');
const XLSX = require('xlsx')
const fs = require('fs');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with members
 */
class MemberController {
  
  async store ({ request, response }) {
    const data = request.all()
    data.uploaded = false;
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
  async storeBulk ({ request, response}) {
    const file = request.file('files', {
      size: '10mb',
    })
    
    await file.move(Helpers.tmpPath('uploads'), {
      name: 'custom-name.jpg',
      overwrite: true

    })
    if (!file.moved()) {
      return file.error()
    }

    const filePath = `uploads/${file.fileName}`
    var workbook = XLSX.readFile(Helpers.tmpPath(filePath))
    const jsonObject = []

    workbook.SheetNames.forEach( sheet => {
      let rowObject = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet]
      )
      jsonObject.push(rowObject)
    })
    jsonObject[0].forEach((obj) => {
      obj.uploaded = true
    })
    try {
      const member  = await Member.createMany(jsonObject[0])
      return response.send({
        status: 'success',
        message: 'Members added successfully',
        data: member
      })
    }
    catch(err) {
      return response.status(err.status).send({
        status: 'Error',
        message: 'Members save error.',
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

  async uploadCheck({ request, response }) {
    const member = await Member.findBy('uploaded', true)
    if (member) {
      return true
    } else  {
      return false
    }
  }
  
}

module.exports = MemberController
