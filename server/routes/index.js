import Router from '../utils/router'
import tagsRouter from './tags'
import postsRouter from './posts'

const router = new Router()

router.use('/tags', tagsRouter.routes())
router.use('/posts', postsRouter.routes())

export default router
