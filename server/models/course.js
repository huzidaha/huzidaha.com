import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const courseSchema = new Schema({
  name: String
}, {
  timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

export default Course
