import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const profileSchema = new Schema({
  name: String,
  avatarUrl: String,
  signature: String,
  intro: String
})

const Profile = mongoose.model('Profile', profileSchema)

export default Profile
