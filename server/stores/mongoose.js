import mongoose from 'mongoose'
import { MONGODB_URL } from '../config'

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL)

export default mongoose
