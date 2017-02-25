import Router from '../../utils/router'
import Crud from '../../utils/crud'
import Course from '../../models/course'
import { apiRequireAdmin } from '../../../common/authorization'

const router = new Router()
const crud = new Crud(router, Course)
crud.except('create', 'update', 'delete')
crud.create(apiRequireAdmin)
crud.update(apiRequireAdmin)
crud.delete(apiRequireAdmin)

export default router
