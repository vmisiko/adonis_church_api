'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttendanceSchema extends Schema {
  up () {
    this.create('attendances', (table) => {
      table.increments()
      table.integer('member_id').unsigned()
      table.integer('temperature')
      table.timestamps()
    })
  }

  down () {
    this.drop('attendances')
  }
}

module.exports = AttendanceSchema
