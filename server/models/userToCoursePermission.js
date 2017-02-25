import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const userToCoursePermissionSchema = new Schema({
  name: String
}, {
  timestamps: true
})

const UserToCoursePermission = mongoose.model('UserToCoursePermission', userToCoursePermissionSchema)

export default UserToCoursePermission
