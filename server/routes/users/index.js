import Router from '../../utils/router'
import Crud from '../../utils/crud'
import User from '../../models/user'

const router = new Router()
const crud = new Crud(router, User)

crud.except('create')
crud.create((ctx) => {
  ctx.request.body.nickname = ctx.request.body.username
})

export default router
