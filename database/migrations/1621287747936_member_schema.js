'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemberSchema extends Schema {
  up () {
    this.create('members', (table) => {
      table.increments()
      table.string('name')
      table.integer('age')
      table.string('next_of_keen')
      table.string('id_number')
      table.string('phone')
      table.string('residence')
      table.string('temperature')
      table.timestamps()
    })
  }

  down () {
    this.drop('members')
  }
}

module.exports = MemberSchema
