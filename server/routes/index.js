import Router from '../utils/router'
import tagsRouter from './tags'

const router = new Router()

router.use('/tags', tagsRouter.routes())

export default router
