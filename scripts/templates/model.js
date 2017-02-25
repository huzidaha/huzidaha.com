import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const <%REPLACE%>Schema = new Schema({
  name: string
}, {
  timestamps: true
})

const <%REPLACE|capitalize%> = mongoose.model('<%REPLACE|capitalize%>', <%REPLACE%>Schema)

export default <%REPLACE|capitalize%>
