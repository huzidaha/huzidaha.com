import Router from '../../utils/router'
import Crud from '../../utils/crud'
import Tag from '../../models/tag'

const router = new Router()
const crud = new Crud(router, Tag)
crud.all()

export default router
