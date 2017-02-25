import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  introdution: String,
  teachers: [
    { type: ObjectId, ref: 'Teacher' }
  ],
  lessons: [
    { type: ObjectId, ref: 'Lesson' }
  ]
}, {
  timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

export default Course
