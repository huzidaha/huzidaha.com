import Router from '../utils/router'
import tagsRouter from './tags'
import postsRouter from './posts'
import profileRouter from './profile'

const router = new Router()

router.use('/tags', tagsRouter.routes())
router.use('/posts', postsRouter.routes())
router.use('/profile', profileRouter.routes())

export default router
