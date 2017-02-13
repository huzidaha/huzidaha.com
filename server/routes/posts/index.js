import Router from '../../utils/router'
import Crud from '../../utils/crud'
import Post from '../../models/post'
import marked from 'marked'
// import './init'

const router = new Router()
const crud = new Crud(router, Post)

crud.except('read')

crud.read(null, async (ctx, ret) => {
  const post = await ret
  const jsonPost = post.toJSON()
  if (ctx.request.query.useMarkdownContent) {
    jsonPost.markdownContent = marked(post.content)
    delete jsonPost.content
  }
  return jsonPost
})

export default router
