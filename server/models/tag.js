import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const tagSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
})

const Tag = mongoose.model('Tag', tagSchema)

export default Tag
