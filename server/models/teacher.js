import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const teacherSchema = new Schema({
  name: String,
  introdution: String
}, {
  timestamps: true
})

const Teacher = mongoose.model('Teacher', teacherSchema)

export default Teacher
