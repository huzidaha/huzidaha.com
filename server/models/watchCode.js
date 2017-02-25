import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const watchCodeSchema = new Schema({
  name: String
}, {
  timestamps: true
})

const WatchCode = mongoose.model('WatchCode', watchCodeSchema)

export default WatchCode
