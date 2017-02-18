import mongoose from '../stores/mongoose.js'
import isEmail from 'validator/lib/isEmail'
import { Schema } from 'mongoose'
import _ from 'ramda'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 30
  },
  nickname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v, cb) => {
        cb(isEmail(v))
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  isVerified: Boolean
})

userSchema.statics.findUserByEmail = async (email) => {
  return User.findOne({ email })
}

userSchema.methods.getSafeJSON = function () {
  return _.pick(['email', 'username', 'nickname', 'isVerified'], this.toJSON())
}

const User = mongoose.model('User', userSchema)

export default User
