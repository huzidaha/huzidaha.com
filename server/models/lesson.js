import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const lessonSchema = new Schema({
  name: String
}, {
  timestamps: true
})

const Lesson = mongoose.model('Lesson', lessonSchema)

export default Lesson
