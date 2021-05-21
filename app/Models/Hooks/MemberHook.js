'use strict'

const User = require("../User")

const  Attendance = use('App/Models/Attendance')

const MemberHook = exports = module.exports = {}

MemberHook.registerAttendance = async (modelInstance) => {
    const data = {
        member_id: modelInstance.id,
        temperature: modelInstance.temperature,
    }
    const attendance = await Attendance.create(data)
    console.log(attendance, "attendace created")
}
