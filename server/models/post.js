import mongoose from '../stores/mongoose.js'
import { Schema } from 'mongoose'

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  cover: String,
  creatorAvatarUrl: String,
  summary: String,
  tag: {
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post
