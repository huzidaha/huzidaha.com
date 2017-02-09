import Router from '../../utils/router'
import Crud from '../../utils/crud'
import Post from '../../models/post'
import marked from 'marked'

const router = new Router()
const crud = new Crud(router, Post)
crud.except('read')

crud.read(null, async (ctx, ret) => {
  const post = await ret
  const jsonPost = post.toJSON()
  jsonPost.markdownContent = marked(post.content)
  return jsonPost
})

export default router
