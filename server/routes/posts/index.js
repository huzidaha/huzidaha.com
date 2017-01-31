import Router from '../../utils/router'
import Crud from '../../utils/crud'
import Post from '../../models/post'

const router = new Router()
const crud = new Crud(router, Post)
crud.all()

export default router
