import mongoose from '../stores/mongoose.js'
import isEmail from 'validator/lib/isEmail'
import { Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minilength: 4,
    maxlength: 30
  },
  nickname: {
    type: String,
    required: true,
    minilength: 2,
    maxlength: 16
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v, cb) => {
        cb(isEmail(v))
      }
    }
  },
  isVerified: Boolean
})

const User= mongoose.model('User', userSchema)

export default User
