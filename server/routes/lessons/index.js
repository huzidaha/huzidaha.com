import Router from '../../utils/router'
import Crud from '../../utils/crud'
import Lesson from '../../models/lesson'
import { apiRequireAdmin } from '../../../common/authorization'

const router = new Router()
const crud = new Crud(router, Lesson)
crud.except('create', 'update', 'delete')
crud.create(apiRequireAdmin)
crud.update(apiRequireAdmin)
crud.delete(apiRequireAdmin)

export default router
