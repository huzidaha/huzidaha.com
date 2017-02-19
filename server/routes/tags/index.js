import Router from '../../utils/router'
import Crud from '../../utils/crud'
import Tag from '../../models/tag'
import { apiRequireAdmin } from '../../../common/authorization'

const router = new Router()
const crud = new Crud(router, Tag)
crud.except('create', 'update', 'delete')
crud.create(apiRequireAdmin)
crud.update(apiRequireAdmin)
crud.delete(apiRequireAdmin)

export default router
