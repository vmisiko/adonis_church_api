'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Member extends Model {
    static boot() {
        super.boot()
    
        this.addHook('afterCreate', 'MemberHook.registerAttendance')
    
      }
    attendance () {
        return this.hasMany('App/Models/Attendance', 'id', 'member_id' )
    }
}

module.exports = Member
