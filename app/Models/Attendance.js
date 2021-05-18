'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attendance extends Model {
    member () {
        return this.hasOne('App/Models/Member', 'member_id', 'id')
    }
}

module.exports = Attendance
